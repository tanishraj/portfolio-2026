import { describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { caseStudies } from '@/content/case-studies'
import { cvBullets } from '@/content/cv'
import { experience } from '@/content/home'

const publicStudies = caseStudies.filter((study) => !study.locked)
const lockedStudies = caseStudies.filter((study) => study.locked)

describe('case studies', () => {
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
      // Employer studies only quote numbers that are public or Tanish's own measures.
      if (study.kind === 'selected') expect(study.numbers?.length, study.slug).toBeGreaterThan(0)
      expect(study.process, study.slug).toBeTruthy()
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
