import { describe, expect, it } from 'vitest'

import { generateCode, hashCode, hashIp, signAccess, verifyAccess } from '@/lib/access-crypto'

const secret = 'test-secret'
const now = 1_800_000_000

describe('access codes', () => {
  it('generates readable codes without look-alike characters', () => {
    for (let i = 0; i < 50; i++)
      expect(generateCode()).toMatch(/^[a-hjkmnp-z2-9]{4}(-[a-hjkmnp-z2-9]{4}){2}$/)
  })

  it('hashes codes the same regardless of case and spacing', () => {
    expect(hashCode('  AbCd-1234 ', secret)).toBe(hashCode('abcd-1234', secret))
    expect(hashCode('abcd-1234', secret)).not.toBe(hashCode('abcd-1235', secret))
    expect(hashCode('abcd-1234', secret)).not.toBe(hashCode('abcd-1234', 'other-secret'))
  })

  it('never stores the raw IP', () => {
    expect(hashIp('203.0.113.7', secret)).not.toContain('203.0.113.7')
  })
})

describe('access cookie', () => {
  it('round-trips a valid cookie', () => {
    expect(verifyAccess(signAccess(42, now + 60, secret), secret, now)).toEqual({ codeId: '42' })
  })

  it('rejects expired, tampered, foreign and malformed cookies', () => {
    const value = signAccess(42, now + 60, secret)
    expect(verifyAccess(signAccess(42, now - 1, secret), secret, now)).toBeNull()
    expect(verifyAccess(value.replace(/^42/, '43'), secret, now)).toBeNull()
    expect(verifyAccess(value.replace(/\.\d+\./, `.${now + 9999}.`), secret, now)).toBeNull()
    expect(verifyAccess(value, 'other-secret', now)).toBeNull()
    expect(verifyAccess('nonsense', secret, now)).toBeNull()
    expect(verifyAccess(undefined, secret, now)).toBeNull()
  })
})
