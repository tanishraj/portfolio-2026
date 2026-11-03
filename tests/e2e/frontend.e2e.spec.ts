import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { caseStudies } from '@/content/case-studies'

const pages = [
  '/',
  '/about',
  '/cv',
  '/lab/event-loop',
  ...caseStudies.map((study) => `/work/${study.slug}`),
]

test.describe('site', () => {
  for (const path of pages) {
    for (const colorScheme of ['dark', 'light'] as const) {
      test(`${path} renders, fits a phone and passes axe (${colorScheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme })
        await page.setViewportSize({ width: 390, height: 844 })
        const response = await page.goto(path)
        expect(response?.status()).toBe(200)
        await expect(page.locator('h1')).toHaveCount(1)

        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        )
        expect(overflows).toBe(false)

        // Check contrast at rest: wait for the load fade-ins (not the scroll-linked glow).
        await page.evaluate(() =>
          Promise.all(
            document
              .getAnimations()
              .filter((animation) => animation.timeline === document.timeline)
              .map((animation) => animation.finished),
          ),
        )
        const { violations } = await new AxeBuilder({ page }).analyze()
        const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
        expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([])
      })
    }
  }

  test('protected study is hidden from search engines', async ({ page }) => {
    await page.goto('/work/librechat')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('unknown pages return 404', async ({ page }) => {
    const response = await page.goto('/work/does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('theme toggle switches and remembers the theme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.getByRole('button', { name: /light and dark/i }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('event loop lab steps through to the real console order', async ({ page }) => {
    await page.goto('/lab/event-loop')
    await page.getByRole('button', { name: 'Step', exact: true }).click()
    await expect(page.getByTestId('step-note')).toContainText('console.log prints')
    await page.keyboard.press('End')
    await expect(page.getByTestId('console')).toHaveText(/start.*end.*promise.*timeout/s)

    await page.getByRole('button', { name: 'async / await' }).click()
    await page.keyboard.press('End')
    await expect(page.getByTestId('console')).toHaveText(
      /script start.*load: start.*script end.*load: resumed.*timeout/s,
    )
  })

  test('event loop ring renders with WebGL', async ({ page }) => {
    await page.goto('/lab/event-loop')
    const hasContext = await page
      .getByTestId('loop-ring')
      .evaluate((canvas: HTMLCanvasElement) => canvas.width > 0 && !!canvas.getContext('webgl'))
    expect(hasContext).toBe(true)
  })

  test('ask endpoint rejects bad input and stays off without an API key', async ({ request }) => {
    const tooShort = await request.post('/api/ask', { data: { question: 'x' } })
    expect([400, 503]).toContain(tooShort.status())
    if (!process.env.ANTHROPIC_API_KEY) {
      const response = await request.post('/api/ask', { data: { question: 'What does he do?' } })
      expect(response.status()).toBe(503)
    }
  })
})
