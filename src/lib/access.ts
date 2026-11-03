import 'server-only'

import { cookies, headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { hashCode, hashIp, signAccess, verifyAccess } from '@/lib/access-crypto'
import type { CaseStudy } from '@/content/case-studies'

const COOKIE_DAYS = 7
const MAX_FAILURES = 5
const FAILURE_WINDOW_MS = 15 * 60 * 1000

const cookieName = (slug: string) => `access-${slug}`

async function visitor() {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  return { ip, userAgent: (h.get('user-agent') ?? '').slice(0, 200) }
}

export type UnlockResult = { ok: true } | { ok: false; error: string }

/** Checks a code for a study; on success sets the access cookie. */
export async function unlock(slug: string, rawCode: string): Promise<UnlockResult> {
  const payload = await getPayload({ config })
  const { ip, userAgent } = await visitor()
  const ipHash = hashIp(ip, payload.secret)

  const recentFailures = await payload.count({
    collection: 'access-events',
    where: {
      type: { equals: 'failed' },
      ipHash: { equals: ipHash },
      createdAt: { greater_than: new Date(Date.now() - FAILURE_WINDOW_MS).toISOString() },
    },
  })
  if (recentFailures.totalDocs >= MAX_FAILURES) {
    return { ok: false, error: 'Too many attempts. Try again in 15 minutes.' }
  }

  const code = rawCode.trim()
  const { docs } = code
    ? await payload.find({
        collection: 'access-codes',
        where: { codeHash: { equals: hashCode(code, payload.secret) } },
        depth: 1,
        limit: 1,
      })
    : { docs: [] }
  const match = docs[0]
  const study = match && typeof match.study === 'object' ? match.study : null
  const usable =
    match &&
    !match.revoked &&
    new Date(match.expiresAt).getTime() > Date.now() &&
    study?.slug === slug

  if (!usable) {
    await payload.create({
      collection: 'access-events',
      data: { type: 'failed', study: slug, ipHash, userAgent },
    })
    return { ok: false, error: 'That code doesn’t work. Check it, or ask me for a new one.' }
  }

  const expiresAt = Math.min(
    Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000,
    new Date(match.expiresAt).getTime(),
  )
  const jar = await cookies()
  jar.set(cookieName(slug), signAccess(match.id, Math.floor(expiresAt / 1000), payload.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: `/work/${slug}`,
    expires: new Date(expiresAt),
  })
  return { ok: true }
}

/**
 * Returns the protected study if the visitor's cookie is valid and its code is
 * still live. Checked on every request, so revoking a code takes effect at once.
 */
export async function getUnlockedStudy(slug: string): Promise<CaseStudy | null> {
  const payload = await getPayload({ config })
  const access = verifyAccess((await cookies()).get(cookieName(slug))?.value, payload.secret)
  if (!access) return null

  const code = await payload
    .findByID({ collection: 'access-codes', id: access.codeId, depth: 1 })
    .catch(() => null)
  const study = code && typeof code.study === 'object' ? code.study : null
  if (
    !code ||
    code.revoked ||
    new Date(code.expiresAt).getTime() <= Date.now() ||
    study?.slug !== slug
  ) {
    return null
  }

  const { ip, userAgent } = await visitor()
  await payload.create({
    collection: 'access-events',
    data: {
      type: 'view',
      code: code.id,
      study: slug,
      ipHash: hashIp(ip, payload.secret),
      userAgent,
    },
  })
  await payload.update({
    collection: 'access-codes',
    id: code.id,
    data: { lastUsedAt: new Date().toISOString() },
  })

  return {
    slug: study.slug,
    title: study.title,
    summary: '',
    meta: '',
    tagline: study.tagline ?? undefined,
    facts: study.facts?.map(({ label, value }) => ({ label, value })),
    problem: study.problem?.map(({ paragraph }) => paragraph),
    decisions: study.decisions?.map(({ title, body }) => ({ title, body })),
    numbers: study.stats?.map(({ value, label }) => ({ value, label })),
    process: study.process ?? undefined,
  }
}
