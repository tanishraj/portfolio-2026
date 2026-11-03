import Link from 'next/link'
import React from 'react'

import { label } from '@/components/styles'
import { caseStudies } from '@/content/case-studies'

export function NextStudy({ slug }: { slug: string }) {
  const index = caseStudies.findIndex((s) => s.slug === slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <Link
      className="group mt-24 flex items-baseline justify-between gap-6 border-t border-line pt-8"
      href={`/work/${next.slug}`}
    >
      <span className={label}>Next</span>
      <span className="text-xl font-light tracking-tight transition-colors group-hover:text-accent">
        {next.title} →
      </span>
    </Link>
  )
}
