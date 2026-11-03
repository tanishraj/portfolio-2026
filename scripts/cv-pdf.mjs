// Prints the /cv page to public/Tanish-Raj-CV.pdf.
// Needs the site running: `pnpm dev`, then `pnpm cv` (or pass a base URL).
// Set CHROMIUM_PATH to use a specific Chromium build.
import path from 'node:path'
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:3000'
const out = path.resolve(import.meta.dirname, '../public/Tanish-Raj-CV.pdf')

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
)
const page = await browser.newPage()
await page.emulateMedia({ media: 'print', colorScheme: 'light' })
await page.goto(`${base}/cv`, { waitUntil: 'networkidle' })
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true })
await browser.close()

console.log(`CV written to ${path.relative(process.cwd(), out)}`)
