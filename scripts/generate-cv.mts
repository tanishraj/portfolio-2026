import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { cvBullets, cvEducation, cvProjects, cvSkills, cvSummary } from '../src/content/cv.ts'
import { experience } from '../src/content/home.ts'
import { person } from '../src/lib/site.ts'

const root = new URL('../', import.meta.url)
const output = fileURLToPath(new URL('public/Tanish-Raj-CV.pdf', root))
const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!
  })

const fonts = await Promise.all(
  [300, 400, 500].map(async (weight) => {
    const file = new URL(
      `node_modules/@fontsource/albert-sans/files/albert-sans-latin-${weight}-normal.woff2`,
      root,
    )
    const data = (await readFile(file)).toString('base64')
    return `@font-face { font-family: Albert; font-style: normal; font-weight: ${weight}; src: url(data:font/woff2;base64,${data}) format('woff2'); }`
  }),
)

const jobs = (items: typeof experience) =>
  items
    .map(
      (job) => `<section class="job">
        <div class="job-heading"><h3>${escape(job.company)}</h3><span class="dates">${escape(job.years.replaceAll(' — ', ' - ').replace('now', 'Present'))}</span></div>
        <p class="role">${escape(job.role)} <span> / ${escape(job.place)}</span></p>
        <ul>${(cvBullets[job.company] ?? []).map((bullet) => `<li>${escape(bullet)}</li>`).join('')}</ul>
      </section>`,
    )
    .join('')

const row = (label: string, content: string, extraClass = '') =>
  `<section class="ledger ${extraClass}"><h2>${escape(label)}</h2><div>${content}</div></section>`

const footer = (number: number) =>
  `<footer><span>${escape(person.name)} / ${escape(person.jobTitle)}</span><span>${number} / 2</span></footer>`

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escape(person.name)} - ${escape(person.jobTitle)}</title>
<style>
${fonts.join('\n')}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: Albert, sans-serif; color: #1b1915; font-size: 10.5pt; font-weight: 400; line-height: 1.42; }
.page { position: relative; width: 210mm; height: 297mm; padding: 14mm 16mm 16mm; background: #faf7f0; break-after: page; }
.page:last-child { break-after: auto; }
a { color: inherit; text-decoration: none; border-bottom: .25mm solid #d1c8b6; }
h1, h2, h3, p, ul { margin: 0; }
h1 { font-size: 34pt; font-weight: 300; letter-spacing: -1.2pt; line-height: 1.1; }
.headline { margin-top: 2mm; font-size: 14pt; font-weight: 300; }
.contact { margin-top: 4mm; display: flex; gap: 2mm 5mm; flex-wrap: wrap; font-size: 9.5pt; color: #5f5a50; }
.ledger { display: grid; grid-template-columns: 23mm minmax(0, 1fr); gap: 4mm; padding: 4mm 0; border-top: .3mm solid #e9e3d6; }
header + .ledger { margin-top: 6mm; }
h2 { align-self: start; border-left: .4mm solid #c2410c; padding-left: 2.5mm; color: #5f5a50; font-size: 10pt; line-height: 1.4; font-weight: 400; }
h3 { font-size: 12pt; font-weight: 500; line-height: 1.3; }
.job + .job { margin-top: 4mm; }
.job-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
.dates { flex-shrink: 0; font-size: 9pt; color: #5f5a50; }
.role { margin-top: .8mm; color: #1b1915; font-size: 9.8pt; }
.role span { color: #5f5a50; }
ul { padding-left: 3.5mm; margin-top: 2mm; }
li { padding-left: .6mm; }
li + li { margin-top: 1.4mm; }
li::marker { color: #c2410c; font-size: 7pt; }
.continuation { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 5mm; }
.continuation p { font-size: 17pt; font-weight: 300; }
.continuation span { color: #5f5a50; font-size: 9pt; }
.project + .project { margin-top: 3mm; }
.project h3 { font-size: 11pt; margin-bottom: 1mm; }
.skills { font-size: 10pt; }
.skills p + p { margin-top: 1mm; }
.skills strong { font-weight: 500; }
.education p + p { margin-top: 2mm; }
.education strong { font-weight: 500; }
footer { position: absolute; bottom: 9mm; left: 16mm; right: 16mm; display: flex; justify-content: space-between; border-top: .3mm solid #e9e3d6; padding-top: 2.5mm; color: #5f5a50; font-size: 8pt; }
</style></head><body>
<main>
<article class="page">
  <header>
    <h1>${escape(person.name)}</h1>
    <p class="headline">${escape(person.jobTitle)}</p>
    <div class="contact"><span>${escape(person.location)}</span><a href="tel:${person.phone.replace(/\s/g, '')}">${escape(person.phone)}</a><a href="mailto:${escape(person.email)}">${escape(person.email)}</a><a href="https://tanish.im">tanish.im</a><a href="https://www.linkedin.com/in/itsmetanishraj/">LinkedIn</a><a href="https://github.com/tanishraj">GitHub</a></div>
  </header>
  ${row('Profile', `<p>${escape(cvSummary)}</p>`)}
  ${row('Skills', cvSkills.map((skill) => `<p><strong>${escape(skill.heading)}</strong> / ${escape(skill.items)}</p>`).join(''), 'skills')}
  ${row('Experience', jobs(experience.slice(0, 3)))}
  ${footer(1)}
</article>
<article class="page">
  <header class="continuation"><p>${escape(person.name)}</p><span>Experience, projects &amp; education</span></header>
  ${row('Experience', jobs(experience.slice(3)))}
  ${row('Independent projects', cvProjects.map((project) => `<section class="project"><h3>${escape(project.title)}</h3><p>${escape(project.detail)}</p></section>`).join(''))}
  ${row('Education', cvEducation.map((item) => `<p><strong>${escape(item.title)}</strong><br>${escape(item.detail.replace('–', '-'))}</p>`).join(''), 'education')}
  ${footer(2)}
</article>
</main></body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  // Fail before publishing if text intrudes into the footer or escapes a page.
  const overflow = await page.locator('.page').evaluateAll((pages) =>
    pages.flatMap((sheet, index) => {
      const footer = sheet.querySelector('footer')!
      const lastSection = sheet.querySelector('.ledger:last-of-type')!
      return lastSection.getBoundingClientRect().bottom > footer.getBoundingClientRect().top - 12
        ? [
            `Page ${index + 1}: content ends at ${lastSection.getBoundingClientRect().bottom - sheet.getBoundingClientRect().top}px, footer starts at ${footer.getBoundingClientRect().top - sheet.getBoundingClientRect().top}px`,
          ]
        : []
    }),
  )
  if (overflow.length) throw new Error(overflow.join('\n'))
  await page.pdf({
    path: output,
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  })
  console.log(`Generated ${output}`)
} finally {
  await browser.close()
}
