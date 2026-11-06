import Link from 'next/link'
import React from 'react'

import type { CaseStudy } from '@/content/case-studies'

import { StackIcons } from './work'

// Work as plain rows: a small context line, the title, one sentence, and the
// stack as small marks. Screenshots live on the case-study pages.
export function WorkIndex({ studies }: { studies: CaseStudy[] }) {
  return (
    <ol className="dim-siblings border-t border-line">
      {studies.map((study) => (
        <li className="border-b border-line" key={study.slug}>
          <Link
            className="group grid gap-x-6 gap-y-1.5 py-6 sm:grid-cols-[minmax(0,1fr)_auto]"
            href={`/work/${study.slug}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {study.meta}
              {study.locked && <span className="text-highlight"> · on request</span>}
            </span>
            <span className="row-start-2 text-[20px] font-light leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-highlight">
              {study.title}
            </span>
            <span className="row-start-3 max-w-[58ch] text-base leading-relaxed text-muted">
              {study.summary}
            </span>
            <span className="row-start-4 pt-1 sm:col-start-2 sm:row-start-2 sm:pt-2">
              <StackIcons items={study.stack?.slice(0, 5)} size={14} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
