import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { caseStudies } from '@/content/case-studies'

const pages = ['/', '/lab/event-loop', ...caseStudies.map((study) => `/work/${study.slug}`)]

test.describe('site', () => {
  for (const path of pages) {
    for (const colorScheme of ['dark', 'light'] as const) {
      test(`${path} renders, fits a phone and passes axe (${colorScheme})`, async ({
        page,
      }, testInfo) => {
        await page.emulateMedia({ colorScheme })
        await page.addInitScript((theme) => localStorage.setItem('theme', theme), colorScheme)
        await page.setViewportSize({ width: 390, height: 844 })
        const response = await page.goto(path)
        expect(response?.status()).toBe(200)
        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme)
        await expect(page.locator('h1')).toHaveCount(1)

        if (path.startsWith('/work/') && path !== '/work/librechat') {
          await expect(page.locator('article').getByRole('heading', { level: 2 })).toHaveText([
            'At a glance',
            'The problem',
            'The constraints',
            'Engineering decisions',
            'My contribution',
            'Outcome and learnings',
          ])
          const study = caseStudies.find((study) => path === `/work/${study.slug}`)!
          const outcomeLists = page.locator('#outcomes').getByRole('list')
          // Outcomes, lessons and next steps account for every list here.
          // A restored metrics grid would introduce an additional list.
          await expect(outcomeLists).toHaveCount(
            1 + Number(!!study.lessons?.length) + Number(!!study.next?.length),
          )
          await expect(outcomeLists.first().getByRole('listitem')).toHaveText(study.outcomes ?? [])
          await expect(page.locator('article').getByText('Trade-off', { exact: true })).toHaveCount(
            0,
          )
          // Every screenshot sits in the MacBook frame.
          const shots = await page.locator('article figure img').count()
          await expect(page.locator('article .macbook-frame img')).toHaveCount(shots)
        }

        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        )
        expect(overflows).toBe(false)

        // Check contrast at rest: wait for finite load animations (not the glow or the live pulse).
        await page.evaluate(() =>
          Promise.all(
            document
              .getAnimations()
              .filter(
                (animation) =>
                  animation.timeline === document.timeline &&
                  animation.effect?.getComputedTiming().endTime !== Infinity,
              )
              .map((animation) => animation.finished),
          ),
        )
        const { violations } = await new AxeBuilder({ page }).analyze()
        const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
        expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([])

        if (path === '/work/shell-wells-digitalisation') {
          await page.screenshot({ path: testInfo.outputPath('case-study-phone.png') })
          await page.locator('#decisions').scrollIntoViewIfNeeded()
          await page.screenshot({ path: testInfo.outputPath('case-study-decisions-phone.png') })
          await page.locator('#next-study').scrollIntoViewIfNeeded()
          await page.screenshot({ path: testInfo.outputPath('case-study-closing-phone.png') })
        }
        if (path === '/work/ola-electric-reservations') {
          const previews = page.locator('.macbook-frame img')
          await expect(previews).toHaveCount(3)
          await expect(page.locator('#problem .macbook-frame')).toHaveCount(1)
          await expect(page.locator('#decisions .macbook-frame')).toHaveCount(1)
          await expect(page.locator('#ownership .macbook-frame')).toHaveCount(1)
          await expect(page.locator('figure figcaption')).toHaveCount(0)
          for (const preview of await previews.all()) {
            await preview.scrollIntoViewIfNeeded()
            const alignment = await preview.evaluate((image) => {
              const display = image.closest('.macbook-display')!.getBoundingClientRect()
              const figure = image.closest('figure')!.getBoundingClientRect()
              return { left: display.left - figure.left, right: display.right - figure.right }
            })
            expect(Math.abs(alignment.left)).toBeLessThan(1)
            expect(Math.abs(alignment.right)).toBeLessThan(1)
            await expect
              .poll(() =>
                preview.evaluate(
                  (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
                ),
              )
              .toBe(true)
          }
          await page
            .locator('.macbook-frame')
            .first()
            .screenshot({ path: testInfo.outputPath('ola-macbook-phone.png') })
        }
      })
    }
  }

  test('protected study is hidden from search engines', async ({ page }) => {
    await page.goto('/work/librechat')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('protected teaser shares the layout and supports copying the email', async ({
    page,
    context,
  }, testInfo) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/work/shell-wells-digitalisation')
    const headerStyle = await page.locator('h1').evaluate((heading) => {
      const style = getComputedStyle(heading)
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
      }
    })
    await page.goto('/work/librechat')
    const protectedHeaderStyle = await page.locator('h1').evaluate((heading) => {
      const style = getComputedStyle(heading)
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
      }
    })
    expect(protectedHeaderStyle).toEqual(headerStyle)
    await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0)

    const access = page.locator('#study-access')
    await access.getByRole('button', { name: 'Copy email address', exact: true }).click()
    await expect(access.getByRole('button', { name: 'Email copied', exact: true })).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'hire.tanishraj@gmail.com',
    )

    for (const width of [390, 640, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      const card = await access.locator('form').locator('..').boundingBox()
      const divider = await page.locator('#next-study').locator('..').boundingBox()
      expect(card).not.toBeNull()
      expect(divider).not.toBeNull()
      expect(divider!.y - card!.y - card!.height).toBeGreaterThanOrEqual(48)
      await access.scrollIntoViewIfNeeded()
      await page.screenshot({ path: testInfo.outputPath(`protected-access-${width}.png`) })
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth,
        page: document.documentElement.scrollWidth,
        elements: Array.from(document.querySelectorAll('main *'))
          .filter(
            (element) =>
              element.getBoundingClientRect().right > innerWidth ||
              element.scrollWidth > element.clientWidth + 1,
          )
          .map((element) => ({
            tag: element.tagName,
            className: element.className,
            text: element.textContent?.slice(0, 50),
          }))
          .slice(-8),
      }))
      expect(overflow.page, `${width}px: ${JSON.stringify(overflow.elements)}`).toBeLessThanOrEqual(
        overflow.viewport,
      )
    }
  })

  test('unknown pages return 404', async ({ page }) => {
    const response = await page.goto('/work/does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('removed studies return 404 and are absent from the homepage', async ({ page }) => {
    await page.goto('/')
    for (const slug of ['bsf-digital-bank', 'rakuten-card-apply', 'thomson-reuters']) {
      await expect(page.locator(`a[href="/work/${slug}"]`)).toHaveCount(0)
    }
    for (const slug of ['bsf-digital-bank', 'rakuten-card-apply', 'thomson-reuters']) {
      const response = await page.goto(`/work/${slug}`)
      expect(response?.status(), slug).toBe(404)
    }
  })

  test('case-study pages fit tablet and desktop widths', async ({ page }, testInfo) => {
    for (const width of [640, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      for (const study of caseStudies.filter((study) => !study.locked)) {
        await page.goto(`/work/${study.slug}`)
        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        )
        const overflowingElements = overflows
          ? await page.evaluate(() =>
              Array.from(document.querySelectorAll('body *'))
                .filter(
                  (element) =>
                    element.getBoundingClientRect().right > innerWidth ||
                    element.scrollWidth > element.clientWidth + 1,
                )
                .map((element) => ({
                  tag: element.tagName,
                  className: element.className,
                  text: element.textContent?.slice(0, 60),
                }))
                .slice(-15),
            )
          : []
        expect(
          overflows,
          `${study.slug} at ${width}px: ${JSON.stringify(overflowingElements)}`,
        ).toBe(false)
        if (width === 1280 && study.slug === 'shell-wells-digitalisation') {
          await page.locator('#next-study').scrollIntoViewIfNeeded()
          await page.screenshot({ path: testInfo.outputPath('next-study-divider-desktop.png') })
        }
        if (width === 1280 && study.slug === 'ola-electric-reservations') {
          const preview = page.locator('.macbook-frame').first()
          await preview.scrollIntoViewIfNeeded()
          await page
            .locator('figure')
            .first()
            .screenshot({ path: testInfo.outputPath('ola-macbook-desktop.png') })
          await page
            .locator('#problem')
            .screenshot({ path: testInfo.outputPath('ola-problem-desktop.png') })
        }
      }
    }
  })

  test('light by default, even when the OS prefers dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/)
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)
    expect(bg).toBe('rgb(250, 247, 240)')
  })

  test('theme toggle switches and remembers the theme', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /light and dark/i }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.getByRole('button', { name: /light and dark/i }).click()
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
