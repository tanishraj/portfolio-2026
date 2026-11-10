import { describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { caseStudies, selectedStudies, workStudies } from '@/content/case-studies'
import { cvBullets } from '@/content/cv'
import { experience } from '@/content/home'
import { sideProjects } from '@/content/side-projects'

const publicStudies = caseStudies.filter((study) => !study.locked)
const lockedStudies = caseStudies.filter((study) => study.locked)

describe('case studies', () => {
  // Four employment projects (Work) and three independent projects (Beyond 9–5).
  it('are the seven featured on the home page', () => {
    expect(caseStudies.map((study) => study.slug).sort()).toEqual(
      [
        'anubhav',
        'institutional-cms',
        'librechat',
        'notivo',
        'ola-electric-reservations',
        'shell-wells-digitalisation',
        'wells-fargo-card-replacement',
      ].sort(),
    )
  })

  it('matches the homepage selection with three personal and four employment studies', () => {
    const featured = [
      ...workStudies.map((study) => study.slug),
      ...sideProjects.map((study) => study.slug),
    ]
    expect(featured).toHaveLength(7)
    expect(new Set(featured).size).toBe(7)
    expect(caseStudies.map((study) => study.slug).sort()).toEqual(featured.sort())
    expect(selectedStudies).toHaveLength(3)
    expect(caseStudies.filter((study) => study.kind === 'employer')).toHaveLength(4)
    for (const job of experience.filter((job) => job.study)) {
      expect(featured, job.company).toContain(job.study)
    }
  })

  it('have unique slugs', () => {
    const slugs = caseStudies.map((study) => study.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  // The protected study's body belongs in Payload, never in this public repo.
  it('keep protected studies to a title and summary', () => {
    for (const study of lockedStudies) {
      const allowed = [
        'company',
        'blurb',
        'glance',
        'kind',
        'locked',
        'logo',
        'meta',
        'period',
        'publicPoints',
        'role',
        'slug',
        'stack',
        'summary',
        'tagline',
        'title',
      ]
      for (const key of Object.keys(study)) expect(allowed, key).toContain(key)
    }
  })

  it('give every public study each section the page renders', () => {
    for (const study of publicStudies) {
      expect(study.tagline, study.slug).toBeTruthy()
      expect(study.facts?.length, study.slug).toBeGreaterThan(0)
      expect(study.problem?.length, study.slug).toBeGreaterThan(0)
      expect(study.decisions?.length, study.slug).toBeGreaterThan(0)
      expect(study.constraints?.length, study.slug).toBeGreaterThan(0)
      expect(study.ownership?.length, study.slug).toBeGreaterThan(0)
      expect(study.outcomes?.length, study.slug).toBeGreaterThan(0)
      expect(study.lessons?.length, study.slug).toBeGreaterThan(0)
      expect(
        study.facts?.map((fact) => fact.label),
        study.slug,
      ).toEqual(['Company', 'My role', 'Product', 'Contribution', 'Timeline'])
      expect(study.process, study.slug).toBeTruthy()
    }
  })
})

describe('Work section', () => {
  it('lists four studies, all real, with a line for each tile', () => {
    expect(workStudies).toHaveLength(4)
    for (const study of workStudies) {
      expect(study, 'missing study').toBeTruthy()
      expect(study.blurb ?? study.summary, study.slug).toBeTruthy()
    }
  })
})

describe('CV', () => {
  it('has bullets for every role on the site', () => {
    for (const job of experience) {
      expect(cvBullets[job.company]?.length, job.company).toBeGreaterThan(0)
    }
  })
})

describe('search engines', () => {
  it('never list protected studies in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url)
    for (const study of lockedStudies) {
      expect(urls.some((url) => url.endsWith(`/work/${study.slug}`))).toBe(false)
    }
  })

  it('are asked not to crawl protected studies or the admin', () => {
    const rules = robots().rules
    const disallow = (Array.isArray(rules) ? rules[0] : rules).disallow
    expect(disallow).toContain('/admin')
    for (const study of lockedStudies) expect(disallow).toContain(`/work/${study.slug}`)
  })
})
