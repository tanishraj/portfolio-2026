import React from 'react'

import { label } from '@/components/styles'
import type { CaseStudy } from '@/content/case-studies'

// The full write-up, shared by public case studies and unlocked protected ones.
export function CaseStudyBody({ study }: { study: CaseStudy }) {
  return (
    <article className="mt-6">
      <h1 className="max-w-[22ch] text-4xl font-light leading-[1.08] tracking-[-0.03em] text-balance sm:text-6xl">
        {study.title}
      </h1>
      {study.tagline && (
        <p className="mt-6 max-w-[40ch] text-xl font-light leading-snug text-muted text-balance sm:text-2xl">
          {study.tagline}
        </p>
      )}

      {!!study.facts?.length && (
        <dl className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          {study.facts.map((fact) => (
            <div className="min-w-0" key={fact.label}>
              <dt className={label}>{fact.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

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

      {!!study.problem?.length && (
        <section aria-labelledby="problem" className="mt-20">
          <h2 className={label} id="problem">
            The problem
          </h2>
          <div className="mt-6 grid max-w-[65ch] gap-5 text-lg leading-relaxed">
            {study.problem.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {!!study.decisions?.length && (
        <section aria-labelledby="decisions" className="mt-20">
          <h2 className={label} id="decisions">
            What I did
          </h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {study.decisions.map((decision) => (
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
      )}

      {!!study.numbers?.length && (
        <section aria-labelledby="numbers" className="mt-20">
          <h2 className={label} id="numbers">
            By the numbers
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {study.numbers.map((n) => (
              <li className="rounded-2xl border border-line bg-surface p-6" key={n.label}>
                <p className="text-3xl font-light tracking-tight tabular-nums">{n.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{n.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {study.process && (
        <section aria-labelledby="process" className="mt-20">
          <h2 className={label} id="process">
            How I built it
          </h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed">{study.process}</p>
        </section>
      )}
    </article>
  )
}
