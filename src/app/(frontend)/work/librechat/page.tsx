import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { StackList } from '@/components/BrandIcon'
import { Bullets, CaseStudyBody, CaseStudyHeader } from '@/components/CaseStudyBody'
import { CopyEmail } from '@/components/CopyEmail'
import { LedgerRow } from '@/components/Ledger'
import { NextStudy } from '@/components/NextStudy'
import { buttonLabel, container, label, outlineButton } from '@/components/styles'
import { getCaseStudy } from '@/content/case-studies'
import { getUnlockedStudy } from '@/lib/access'
import { person } from '@/lib/site'

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
    <main className={`${container} pt-12 sm:pt-20`} id="main">
      <Link className={`${outlineButton} pl-4 text-muted`} href="/#work">
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M13 8H3m4-4L3 8l4 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </svg>
        <span className={buttonLabel}>All work</span>
      </Link>
      <p className={`${label} mt-12`}>{teaser.meta}</p>

      {study ? (
        <CaseStudyBody study={study} />
      ) : (
        <article className="mt-6 pb-12 sm:pb-16">
          <CaseStudyHeader study={teaser} />
          <div className="mt-16 grid gap-16 sm:mt-24 sm:gap-24">
            <LedgerRow id="overview" title="At a glance" reveal={false}>
              <dl className="grid gap-x-8 gap-y-6 border-t border-line pt-6 lg:grid-cols-2">
                {[
                  { label: 'Company', value: teaser.company },
                  { label: 'My role', value: teaser.role },
                  { label: 'Timeline', value: teaser.period },
                ].map((fact) => (
                  <div className="grid content-start gap-1.5" key={fact.label}>
                    <dt className="text-[15px] text-muted">{fact.label}</dt>
                    <dd className="min-w-0 text-[17px] leading-relaxed text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {teaser.stack && (
                <div className="mt-8">
                  <StackList items={teaser.stack} />
                </div>
              )}
            </LedgerRow>

            {!!teaser.publicPoints?.length && (
              <LedgerRow id="project-context" title="About the project">
                <Bullets items={teaser.publicPoints} />
              </LedgerRow>
            )}

            <LedgerRow id="study-access" title="Access this case study" reveal={false}>
              <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
                <p className="text-[17px] leading-relaxed">
                  This case study covers my current employer&apos;s internal tools and is shared
                  privately. Enter your access code below, or contact me to request one.
                </p>
                <p className="mt-5 flex flex-wrap items-center gap-1.5 text-[17px]">
                  <span className="min-w-0 break-all">{person.email}</span>
                  <CopyEmail email={person.email} variant="icon" />
                </p>
                <UnlockForm />
              </div>
            </LedgerRow>
          </div>
        </article>
      )}

      <NextStudy slug={SLUG} />
    </main>
  )
}
