import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { CaseStudyBody } from '@/components/CaseStudyBody'
import { NextStudy } from '@/components/NextStudy'
import { container, label } from '@/components/styles'
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
    <main className={`${container} pb-16 pt-12 sm:pt-20`} id="main">
      <Link className="text-sm text-muted transition-colors hover:text-fg" href="/#work">
        ← All work
      </Link>
      <p className={`${label} mt-12`}>{study.meta}</p>
      <CaseStudyBody study={study} />
      <NextStudy slug={slug} />
    </main>
  )
}
