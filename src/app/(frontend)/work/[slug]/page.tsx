import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { container, label } from '@/components/styles'
import { caseStudies, getCaseStudy } from '@/content/case-studies'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.summary,
    // The protected study's teaser stays out of search results.
    robots: study.locked ? { index: false, follow: false } : undefined,
  }
}

function Locked({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="max-w-[60ch]">
      <h1 className="text-4xl font-light leading-[1.1] tracking-[-0.03em] text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">{summary}</p>
      <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className={`${label} text-accent`}>Shared on request</p>
        <p className="mt-4 leading-relaxed">
          This one is about my current employer&apos;s internal tools, so I share it with a code
          rather than in public. If you&apos;re hiring and want to read it, email me and I&apos;ll
          send you one.
        </p>
        <a
          className="mt-6 inline-block text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
          href="mailto:hire.tanishraj@gmail.com?subject=Case%20study%20access"
        >
          hire.tanishraj@gmail.com
        </a>
      </div>
    </div>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const index = caseStudies.findIndex((s) => s.slug === slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <main className={`${container} pb-16 pt-12 sm:pt-20`} id="main">
      <Link className="text-sm text-muted transition-colors hover:text-fg" href="/#work">
        ← All work
      </Link>

      <p className={`${label} mt-12`}>{study.meta}</p>

      {study.locked ? (
        <div className="mt-6">
          <Locked summary={study.summary} title={study.title} />
        </div>
      ) : (
        <article className="mt-6">
          <h1 className="max-w-[22ch] text-4xl font-light leading-[1.08] tracking-[-0.03em] text-balance sm:text-6xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[40ch] text-xl font-light leading-snug text-muted text-balance sm:text-2xl">
            {study.tagline}
          </p>

          <dl className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
            {study.facts?.map((fact) => (
              <div className="min-w-0" key={fact.label}>
                <dt className={label}>{fact.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {study.link && (
            <a
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              href={study.link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {study.link.label} ↗
            </a>
          )}

          <section aria-labelledby="problem" className="mt-20">
            <h2 className={label} id="problem">
              The problem
            </h2>
            <div className="mt-6 grid max-w-[65ch] gap-5 text-lg leading-relaxed">
              {study.problem?.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="decisions" className="mt-20">
            <h2 className={label} id="decisions">
              What I did
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {study.decisions?.map((decision) => (
                <li
                  className="grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10"
                  key={decision.title}
                >
                  <h3 className="text-lg font-normal tracking-tight text-balance">
                    {decision.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{decision.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="numbers" className="mt-20">
            <h2 className={label} id="numbers">
              By the numbers
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {study.numbers?.map((n) => (
                <li className="rounded-2xl border border-line bg-surface p-6" key={n.label}>
                  <p className="text-3xl font-light tracking-tight tabular-nums">{n.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.label}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="process" className="mt-20">
            <h2 className={label} id="process">
              How I built it
            </h2>
            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed">{study.process}</p>
          </section>
        </article>
      )}

      <Link
        className="group mt-24 flex items-baseline justify-between gap-6 border-t border-line pt-8"
        href={`/work/${next.slug}`}
      >
        <span className={label}>Next</span>
        <span className="text-xl font-light tracking-tight transition-colors group-hover:text-accent">
          {next.title} →
        </span>
      </Link>
    </main>
  )
}
