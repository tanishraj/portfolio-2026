import Link from 'next/link'
import React from 'react'

import type { CaseStudy } from '@/content/case-studies'

import { StackIcons } from './work'

// Large, simple project titles with their key fact and stack. Screenshots live
// on the case-study pages; the home page stays content-first.
export function WorkIndex({ studies }: { studies: CaseStudy[] }) {
  return (
    <ol className="dim-siblings border-t border-line">
      {studies.map((study) => (
        <li className="border-b border-line" key={study.slug}>
          <Link
            className="group grid gap-x-8 gap-y-4 py-7 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center"
            data-spec="row · py 28 · title 36/40 light"
            href={`/work/${study.slug}`}
          >
            <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.08em] text-muted">
              {study.meta}
            </span>
            <span className="min-w-0">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-3xl font-light tracking-[-0.03em] transition-colors duration-300 group-hover:text-highlight sm:text-4xl">
                {study.title}
                {study.locked && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-highlight">
                    On request
                  </span>
                )}
              </span>
              <span className="mt-2 block max-w-[60ch] text-sm leading-relaxed text-muted">
                {study.summary}
              </span>
            </span>
            <span className="flex flex-col gap-3 sm:items-end">
              {study.glance?.[0] && (
                <span className="font-mono text-sm tabular-nums">{study.glance[0]}</span>
              )}
              <StackIcons items={study.stack?.slice(0, 5)} size={15} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
