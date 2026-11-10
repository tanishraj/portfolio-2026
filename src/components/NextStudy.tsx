import Link from 'next/link'
import React from 'react'

import { LedgerRow } from '@/components/Ledger'
import { caseStudies } from '@/content/case-studies'

/** The last row of a case study: the next one in the list, styled like a Work entry. */
export function NextStudy({ slug }: { slug: string }) {
  const index = caseStudies.findIndex((s) => s.slug === slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <div className="border-t border-line pt-12 sm:pt-16">
      <LedgerRow id="next-study" title="Next case study" reveal={false}>
        <Link className="group block" href={`/work/${next.slug}`}>
          <span className="block text-[26px] font-light leading-[1.15] tracking-[-0.02em] text-fg">
            {next.title}
          </span>
          <span className="mt-3 block max-w-[52ch] text-base leading-relaxed text-muted">
            {next.blurb ?? next.summary}
          </span>
          <span className="mt-5 inline-flex items-center gap-2 text-[15px] text-highlight">
            {next.locked ? 'Request access' : 'Read case study'}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </span>
        </Link>
      </LedgerRow>
    </div>
  )
}
