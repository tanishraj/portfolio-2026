import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

// Pure helpers for protected case studies: no Payload, no Next, easy to test.

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789' // no 0/o, 1/l/i

/** A readable code like `k7mq-3xrt-p9wd`, about 60 bits of entropy. */
export function generateCode(): string {
  const bytes = randomBytes(12)
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length])
  return [0, 4, 8].map((i) => chars.slice(i, i + 4).join('')).join('-')
}

export const normalizeCode = (code: string) => code.trim().toLowerCase()

/** Only this hash is stored. HMAC makes it deterministic, so a code can be looked up by it. */
export function hashCode(code: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(`code:${normalizeCode(code)}`)
    .digest('hex')
}

/** Visitor IPs are only kept as a keyed hash, enough to rate-limit. */
export function hashIp(ip: string, secret: string): string {
  return createHash('sha256').update(`${secret}:ip:${ip}`).digest('hex').slice(0, 32)
}

const sign = (payload: string, secret: string) =>
  createHmac('sha256', secret).update(`cookie:${payload}`).digest('base64url')

/** Cookie value: `<codeId>.<expiry unix seconds>.<signature>`. */
export function signAccess(codeId: string | number, expiresAt: number, secret: string): string {
  const payload = `${codeId}.${expiresAt}`
  return `${payload}.${sign(payload, secret)}`
}

export function verifyAccess(
  value: string | undefined,
  secret: string,
  now = Math.floor(Date.now() / 1000),
): { codeId: string } | null {
  if (!value) return null
  const parts = value.split('.')
  if (parts.length !== 3) return null
  const [codeId, exp, signature] = parts
  const expected = Buffer.from(sign(`${codeId}.${exp}`, secret))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null
  if (!/^\d+$/.test(exp) || Number(exp) <= now) return null
  return { codeId }
}
