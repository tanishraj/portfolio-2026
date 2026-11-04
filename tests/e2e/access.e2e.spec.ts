import { expect, test } from '@playwright/test'

import {
  cleanupAccess,
  revokeTestCode,
  revokedCode,
  seedAccess,
  testCode,
} from '../helpers/seedAccess'

test.describe('protected case study', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeAll(async () => {
    await seedAccess()
  })

  test.afterAll(async () => {
    await cleanupAccess()
  })

  // Each submit waits for the server action to answer, so attempts never overlap.
  const submit = async (page: import('@playwright/test').Page, code: string) => {
    await page.getByLabel('Access code').fill(code)
    await Promise.all([
      page.waitForResponse((response) => response.request().method() === 'POST'),
      page.getByRole('button', { name: 'Open', exact: true }).click(),
    ])
  }

  test('rejects a wrong code and a revoked code', async ({ page }) => {
    await page.goto('/work/librechat')
    await submit(page, 'nope-nope-nope')
    await expect(page.getByRole('status')).toHaveText(/doesn’t work/)
    await submit(page, revokedCode)
    await expect(page.getByRole('status')).toHaveText(/doesn’t work/)
  })

  test('opens with a valid code, case-insensitively, and stays open', async ({ page }) => {
    await page.goto('/work/librechat')
    await submit(page, testCode.toUpperCase())
    await expect(page.getByLabel('Access code')).toHaveCount(0)
    await expect(page.locator('h1')).toHaveText('A chat-based AI platform for private credit')

    await page.reload()
    await expect(page.getByLabel('Access code')).toHaveCount(0)

    const cookie = (await page.context().cookies()).find((c) => c.name === 'access-librechat')
    expect(cookie?.httpOnly).toBe(true)
    expect(cookie?.path).toBe('/work/librechat')
  })

  test('blocks guessing after five wrong codes', async ({ page }) => {
    await cleanupAccess()
    await seedAccess()
    await page.goto('/work/librechat')
    for (let i = 0; i < 5; i++) {
      await submit(page, `wrong-${i}`)
      await expect(page.getByRole('status')).toHaveText(/doesn’t work/)
    }
    await submit(page, testCode)
    await expect(page.getByRole('status')).toHaveText(/Too many attempts/)
  })

  test('revoking a code locks out visitors who are already in', async ({ page }) => {
    await cleanupAccess()
    await seedAccess()
    await page.goto('/work/librechat')
    await submit(page, testCode)
    await expect(page.getByLabel('Access code')).toHaveCount(0)

    await revokeTestCode()
    await page.reload()
    await expect(page.getByLabel('Access code')).toBeVisible()
  })

  test('the public API never returns protected studies or codes', async ({ request }) => {
    for (const path of ['/api/case-studies', '/api/access-codes', '/api/access-events']) {
      const response = await request.get(path)
      expect(response.status(), path).toBe(403)
    }
  })
})
