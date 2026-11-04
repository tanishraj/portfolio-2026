import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { CaseStudyBody } from '@/components/CaseStudyBody'
import { NextStudy } from '@/components/NextStudy'
import { container, label } from '@/components/styles'
import { getCaseStudy } from '@/content/case-studies'
import { getUnlockedStudy } from '@/lib/access'

import { UnlockForm } from './UnlockForm'

const SLUG = 'librechat'
const teaser = getCaseStudy(SLUG)!

export const metadata: Metadata = {
  title: teaser.title,
  description: teaser.summary,
  robots: { index: false, follow: false },
}

export default async function ProtectedStudyPage() {
  const study = await getUnlockedStudy(SLUG)

  return (
    <main className={`${container} pb-16 pt-12 sm:pt-20`} id="main">
      <Link className="text-sm text-muted transition-colors hover:text-fg" href="/#work">
        ← All work
      </Link>
      <p className={`${label} mt-12`}>{teaser.meta}</p>

      {study ? (
        <CaseStudyBody study={study} />
      ) : (
        <div className="mt-6 max-w-[60ch]">
          <h1 className="text-4xl font-light leading-[1.1] tracking-[-0.03em] text-balance sm:text-5xl">
            {teaser.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{teaser.summary}</p>
          {teaser.publicPoints && (
            <ul className="mt-10 grid gap-4 border-t border-line pt-8">
              {teaser.publicPoints.map((point) => (
                <li className="flex gap-3 leading-relaxed text-muted" key={point.slice(0, 24)}>
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-highlight" />
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className={`${label} text-accent`}>Shared on request</p>
            <p className="mt-4 leading-relaxed">
              This one covers my current employer&apos;s internal tools, so I share it with a code
              instead of in public. If you have a code, enter it below. If you&apos;re hiring and
              would like one, email{' '}
              <a
                className="text-accent underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                href="mailto:hire.tanishraj@gmail.com?subject=Case%20study%20access"
              >
                hire.tanishraj@gmail.com
              </a>
              .
            </p>
            <UnlockForm />
          </div>
        </div>
      )}

      <NextStudy slug={SLUG} />
    </main>
  )
}
