import Link from 'next/link'
import React from 'react'

import type { CaseStudy } from '@/content/case-studies'

function LockIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 16 16" width="12">
      <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="10" x="3" y="7" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Row({ study }: { study: CaseStudy }) {
  return (
    <li className="grid gap-x-10 gap-y-3 py-10 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-start">
      <span aria-hidden="true" className="work-numeral" />
      <div className="flex flex-col gap-3">
        <h3 className="text-[26px] font-light leading-[1.15] tracking-[-0.02em]">{study.title}</h3>
        <p className="max-w-[52ch] text-base leading-relaxed text-muted">
          {study.blurb ?? study.summary}
        </p>
      </div>
      <Link
        className="group/link inline-flex items-center gap-2 self-start whitespace-nowrap pt-1 text-[15px] font-normal text-highlight sm:pt-[5px]"
        href={`/work/${study.slug}`}
      >
        {study.locked && <LockIcon />}
        {study.locked ? 'Request access' : 'Read the case study'}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </Link>
    </li>
  )
}

/**
 * The home page's Work row: an intro paragraph, a divider, then one numbered
 * row per study, separated by hairlines.
 */
export function WorkGrid({ studies, intro }: { studies: CaseStudy[]; intro?: string }) {
  return (
    <div>
      {intro && (
        <p className="max-w-[46ch] pb-10 text-[22px] font-light leading-[1.5] tracking-[-0.01em]">
          {intro}
        </p>
      )}
      <ol className="work-rows divide-y divide-line border-t border-line">
        {studies.map((study) => (
          <Row key={study.slug} study={study} />
        ))}
      </ol>
    </div>
  )
}
