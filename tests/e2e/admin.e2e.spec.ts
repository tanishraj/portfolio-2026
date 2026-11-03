import { expect, Page, test } from '@playwright/test'

import { login } from '../helpers/login'
import { cleanupTestUser, seedTestUser, testUser } from '../helpers/seedUser'

// The admin keeps a live connection open in dev, so "load" may never fire.
const ready = { waitUntil: 'domcontentloaded' } as const

test.describe('Admin panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()
    page = await (await browser.newContext()).newPage()
    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('shows the dashboard', async () => {
    await page.goto('/admin', ready)
    // The first admin load can include a cold dev compile.
    await expect(page.getByRole('heading', { name: 'Collections' })).toBeVisible({
      timeout: 15_000,
    })
  })

  test('lists users', async () => {
    await page.goto('/admin/collections/users', ready)
    await expect(page.getByRole('heading', { level: 1, name: 'Users' })).toBeVisible()
  })

  test('opens the create-user form', async () => {
    await page.goto('/admin/collections/users/create', ready)
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })
})
