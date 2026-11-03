import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

export const testCode = 'e2e9-test-code'
export const revokedCode = 'e2e9-revk-code'
const labels = ['E2E test code', 'E2E revoked code']

/** Ensures the protected study exists, with one live and one revoked code. */
export async function seedAccess() {
  const payload = await getPayload({ config })
  await cleanupAccess()

  const existing = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: 'librechat' } },
    limit: 1,
  })
  const study =
    existing.docs[0] ??
    (await payload.create({
      collection: 'case-studies',
      data: { title: 'LibreChat for LiquidityOne', slug: 'librechat' },
    }))

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  await payload.create({
    collection: 'access-codes',
    data: { label: labels[0], code: testCode, study: study.id, expiresAt },
  })
  await payload.create({
    collection: 'access-codes',
    data: { label: labels[1], code: revokedCode, study: study.id, expiresAt, revoked: true },
  })
  return study
}

export async function cleanupAccess() {
  const payload = await getPayload({ config })
  const codes = await payload.find({ collection: 'access-codes', where: { label: { in: labels } } })
  const ids = codes.docs.map((doc) => doc.id)
  if (ids.length) {
    await payload.delete({ collection: 'access-events', where: { code: { in: ids } } })
    await payload.delete({ collection: 'access-codes', where: { id: { in: ids } } })
  }
  // Failed attempts from test runs share the local IP; clear them so rate limits reset.
  await payload.delete({ collection: 'access-events', where: { type: { equals: 'failed' } } })
}

/** Revokes the live test code, as an admin would from the panel. */
export async function revokeTestCode() {
  const payload = await getPayload({ config })
  await payload.update({
    collection: 'access-codes',
    where: { label: { equals: labels[0] } },
    data: { revoked: true },
  })
}
