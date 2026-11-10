import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { hashCode } from '@/lib/access-crypto'
import config from '@/payload.config'

const label = 'Int test: code stays put'
let payload: Payload

const storedHash = async (id: number | string) => {
  // codeHash is hidden from reads, so look it up by the hash we expect.
  const { totalDocs } = await payload.find({
    collection: 'access-codes',
    where: {
      and: [
        { id: { equals: id } },
        { codeHash: { equals: hashCode('int1-stay-code', payload.secret) } },
      ],
    },
    overrideAccess: true,
  })
  return totalDocs === 1
}

describe('access codes', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    await payload.delete({ collection: 'access-codes', where: { label: { equals: label } } })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'access-codes', where: { label: { equals: label } } })
  })

  // The admin used to show a fresh random code on every edit, and saving it
  // silently replaced the code that had already been sent to a company.
  it('keeps the original code when an existing record is saved again', async () => {
    const study =
      (await payload.find({ collection: 'case-studies', where: { slug: { equals: 'librechat' } } }))
        .docs[0] ??
      (await payload.create({
        collection: 'case-studies',
        data: { title: 'Bringing AI into private credit', slug: 'librechat' },
      }))

    const created = await payload.create({
      collection: 'access-codes',
      data: {
        label,
        code: 'int1-stay-code',
        study: study.id,
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
      },
    })
    expect(await storedHash(created.id)).toBe(true)
    // The admin can copy the code after saving.
    expect(created.code).toBe('int1-stay-code')

    const updated = await payload.update({
      collection: 'access-codes',
      id: created.id,
      data: { label, code: 'int1-new1-code' } as never,
    })
    expect(await storedHash(created.id)).toBe(true)
    expect(updated.code).toBe('int1-stay-code')
    expect((await payload.findByID({ collection: 'access-codes', id: created.id })).code).toBe(
      'int1-stay-code',
    )
  })

  it('defaults new codes to one day', async () => {
    const study = (
      await payload.find({ collection: 'case-studies', where: { slug: { equals: 'librechat' } } })
    ).docs[0]
    const created = await payload.create({
      collection: 'access-codes',
      data: { label, code: 'int1-oned-code', study: study.id } as never,
    })
    const hours = (new Date(created.expiresAt).getTime() - Date.now()) / 3_600_000
    expect(hours).toBeGreaterThan(23.9)
    expect(hours).toBeLessThanOrEqual(24)
  })
})
