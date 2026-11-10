import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { CaseStudyBody } from '@/components/CaseStudyBody'
import { NextStudy } from '@/components/NextStudy'
import { buttonLabel, container, label, outlineButton } from '@/components/styles'
import { caseStudies, getCaseStudy } from '@/content/case-studies'

// Protected studies have their own dynamic route (see ../librechat).
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.filter((study) => !study.locked).map((study) => ({ slug: study.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  return { title: study.title, description: study.summary }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study || study.locked) notFound()

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
      <p className={`${label} mt-12`}>{study.meta}</p>
      <CaseStudyBody study={study} />
      <NextStudy slug={slug} />
    </main>
  )
}
