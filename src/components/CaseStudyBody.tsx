import Image from 'next/image'
import React from 'react'

import { StackList } from '@/components/BrandIcon'
import { LedgerRow } from '@/components/Ledger'
import { MacBookFrame } from '@/components/MacBookFrame'
import { buttonLabel, ledgerCols, outlineButton } from '@/components/styles'
import type { CaseStudy } from '@/content/case-studies'

// The full write-up, shared by public case studies and unlocked protected ones.
// It uses the home page's ledger: a large title, the summary set into the
// content column, then one row per section with its label pinned on the left.
// Supporting detail is grouped into the same five sections for every study.

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[64ch] gap-3.5">
      {items.map((item) => (
        <li className="flex gap-3.5 text-[17px] leading-relaxed text-muted" key={item.slice(0, 32)}>
          <span
            aria-hidden="true"
            className="mt-[calc(0.8em-0.5px)] h-0.5 w-3 shrink-0 bg-highlight"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Titled entries separated by hairlines, like the About row's sections. */
function Entries({ children }: { children: React.ReactNode }) {
  return <ul className="divide-y divide-line">{children}</ul>
}

function Entry({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="py-7 first:pt-0 last:pb-0">
      <h3 className="text-[20px] font-light leading-snug text-fg text-balance">{title}</h3>
      <div className="mt-3 grid max-w-[60ch] gap-3">{children}</div>
    </li>
  )
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <h3 className="text-[20px] font-light leading-snug text-fg text-balance">{title}</h3>
      {children}
    </div>
  )
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0 text-muted transition-colors group-hover:text-highlight"
      fill="none"
      height="11"
      viewBox="0 0 12 12"
      width="11"
    >
      <path
        d="M3.5 8.5l5-5M4.5 3.5h4v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function StudyImages({ images }: { images: NonNullable<CaseStudy['gallery']> }) {
  if (!images.length) return null

  return (
    <div className="grid gap-12">
      {images.map((shot) => (
        <figure key={shot.src}>
          <MacBookFrame>
            <Image
              alt={shot.alt}
              className="block h-auto w-full"
              height={900}
              sizes="(min-width: 1184px) 792px, (min-width: 640px) calc(100vw - 392px), calc(100vw - 48px)"
              src={shot.src}
              width={1440}
            />
          </MacBookFrame>
          {shot.caption && (
            <figcaption className="mt-3 text-[15px] text-muted">{shot.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

export function CaseStudyHeader({ study }: { study: Pick<CaseStudy, 'title' | 'summary'> }) {
  return (
    <header>
      <h1 className="max-w-[20ch] text-[40px] font-extralight leading-[1.08] tracking-[-0.03em] text-balance sm:text-[64px]">
        {study.title}
      </h1>
      <div className={`mt-10 grid gap-4 sm:mt-14 sm:gap-10 ${ledgerCols}`}>
        <span aria-hidden="true" className="hidden sm:block" />
        <p className="max-w-[46ch] text-[22px] font-light leading-[1.5] tracking-[-0.01em]">
          {study.summary}
        </p>
      </div>
    </header>
  )
}

export function CaseStudyBody({ study }: { study: CaseStudy }) {
  const images = study.gallery ?? []
  const problemImages = images.filter((image) => image.placement === 'problem')
  const decisionImages = images.filter((image) => image.placement === 'decisions')
  const contributionImages = images.filter(
    (image) => !image.placement || image.placement === 'contribution',
  )
  const hasEngineering =
    !!study.process ||
    !!study.architecture?.length ||
    !!study.decisions?.length ||
    !!decisionImages.length
  const hasContribution =
    !!study.ownership?.length || !!study.stories?.length || !!contributionImages.length
  const hasOutcomes = !!study.outcomes?.length || !!study.lessons?.length || !!study.next?.length
  const hasOverview = !!study.facts?.length || !!study.stack?.length || !!study.link

  return (
    <article className="mt-6">
      <CaseStudyHeader study={study} />

      <div className="mt-16 grid gap-16 sm:mt-24 sm:gap-24">
        {hasOverview && (
          <LedgerRow id="overview" title="At a glance">
            {!!study.facts?.length && (
              <dl className="grid gap-x-8 gap-y-6 border-t border-line pt-6 lg:grid-cols-2">
                {study.facts.map((fact) => (
                  <div className="grid content-start gap-1.5" key={fact.label}>
                    <dt className="text-[15px] text-muted">{fact.label}</dt>
                    <dd className="min-w-0 text-[17px] leading-relaxed text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {(!!study.stack?.length || study.link) && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                {study.stack && <StackList items={study.stack} />}
                {study.link && (
                  <a
                    className={`group ${outlineButton} text-fg`}
                    href={study.link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className={buttonLabel}>Visit {study.link.label}</span>
                    <ExternalIcon />
                  </a>
                )}
              </div>
            )}
          </LedgerRow>
        )}

        {!!study.problem?.length && (
          <LedgerRow id="problem" title="The problem">
            <div className="grid gap-10">
              <div className="grid max-w-[62ch] gap-5 text-[18px] leading-[1.7]">
                {study.problem.map((paragraph, i) => (
                  <p className={i ? 'text-muted' : 'text-fg'} key={paragraph.slice(0, 24)}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <StudyImages images={problemImages} />
            </div>
          </LedgerRow>
        )}

        {!!study.constraints?.length && (
          <LedgerRow id="constraints" title="The constraints">
            <Bullets items={study.constraints} />
          </LedgerRow>
        )}

        {hasEngineering && (
          <LedgerRow id="decisions" title="Engineering decisions">
            <div className="grid gap-10">
              {study.process && (
                <Detail title="Approach and validation">
                  <p className="max-w-[62ch] text-[17px] leading-relaxed text-muted">
                    {study.process}
                  </p>
                </Detail>
              )}
              {!!study.architecture?.length && (
                <Detail title="System design">
                  <Bullets items={study.architecture} />
                </Detail>
              )}
              {!!study.decisions?.length && (
                <Entries>
                  {study.decisions.map((decision) => (
                    <Entry key={decision.title} title={decision.title}>
                      <p className="text-[17px] leading-relaxed text-muted">
                        {decision.body}
                        {decision.tradeoff ? ` ${decision.tradeoff}` : ''}
                      </p>
                    </Entry>
                  ))}
                </Entries>
              )}
              <StudyImages images={decisionImages} />
            </div>
          </LedgerRow>
        )}

        {hasContribution && (
          <LedgerRow id="ownership" title="My contribution">
            <div className="grid gap-10">
              {!!study.ownership?.length && <Bullets items={study.ownership} />}
              {!!study.stories?.length && (
                <Entries>
                  {study.stories.map((story) => (
                    <Entry key={story.title} title={story.title}>
                      <p className="text-[17px] leading-relaxed text-muted">{story.body}</p>
                    </Entry>
                  ))}
                </Entries>
              )}
              <StudyImages images={contributionImages} />
            </div>
          </LedgerRow>
        )}

        {hasOutcomes && (
          <LedgerRow id="outcomes" title="Outcome and learnings">
            <div className="grid gap-10">
              {!!study.outcomes?.length && <Bullets items={study.outcomes} />}
              {!!study.lessons?.length && (
                <Detail title="What I learned">
                  <Bullets items={study.lessons} />
                </Detail>
              )}
              {!!study.next?.length && (
                <Detail title="What I would improve next">
                  <Bullets items={study.next} />
                </Detail>
              )}
            </div>
          </LedgerRow>
        )}
      </div>

      <div
        className={`mt-12 grid gap-4 border-t border-line py-12 sm:mt-16 sm:gap-10 sm:py-16 ${ledgerCols}`}
        id="case-study-closing"
      >
        <div className="min-w-0 sm:col-start-2">
          <p className="max-w-[32ch] text-[24px] font-light leading-snug tracking-[-0.02em] text-fg sm:text-[28px]">
            Thank you for taking the time to read.
          </p>
          <p className="mt-3 max-w-[54ch] text-[17px] leading-relaxed text-muted">
            I’d be happy to share more about the decisions, challenges, and lessons behind this
            project.
          </p>
          <a className={`group/talk mt-6 ${outlineButton} text-fg`} href="#contact">
            <span className={buttonLabel}>Get in touch</span>
            <svg
              aria-hidden="true"
              className="text-muted transition-transform duration-300 group-hover/talk:translate-y-0.5 group-hover/talk:text-highlight motion-reduce:transition-none"
              fill="none"
              height="14"
              viewBox="0 0 16 16"
              width="14"
            >
              <path
                d="M8 2.25v11.5M4.5 10.25 8 13.75l3.5-3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
