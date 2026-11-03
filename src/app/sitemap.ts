import type { MetadataRoute } from 'next'

import { caseStudies } from '@/content/case-studies'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/cv', '/lab/event-loop']
  const studies = caseStudies.filter((study) => !study.locked).map((study) => `/work/${study.slug}`)
  return [...pages, ...studies].map((path) => ({ url: `${siteUrl}${path}` }))
}
