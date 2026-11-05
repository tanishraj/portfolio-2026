import Image from 'next/image'
import React from 'react'

import { StackList } from '@/components/BrandIcon'
import { SectionIndex } from '@/components/SectionIndex'
import { label } from '@/components/styles'
import type { CaseStudy } from '@/content/case-studies'

// The full write-up, shared by public case studies and unlocked protected ones.
// Sections render only when the study has content for them.

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="scroll-mt-28" id={id}>
      <h2 className={label} id={`${id}-title`}>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[68ch] gap-3">
      {items.map((item) => (
        <li className="flex gap-3 leading-relaxed text-muted" key={item.slice(0, 32)}>
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-highlight" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyBody({ study }: { study: CaseStudy }) {
  const sections = [
    study.problem?.length && { id: 'problem', label: 'The problem' },
    study.constraints?.length && { id: 'constraints', label: 'Constraints' },
    study.architecture?.length && { id: 'architecture', label: 'How it works' },
    study.decisions?.length && { id: 'decisions', label: 'Decisions' },
    study.stories?.length && { id: 'stories', label: 'Hard problems' },
    study.numbers?.length && { id: 'numbers', label: 'By the numbers' },
    study.gallery?.length && { id: 'screens', label: 'Screens' },
    study.process && { id: 'process', label: 'How I built it' },
    study.next?.length && { id: 'next', label: 'What’s next' },
  ].filter(Boolean) as { id: string; label: string }[]

  return (
    <article className="mt-6">
      <header>
        <h1 className="max-w-[18ch] text-4xl font-light leading-[1.06] tracking-[-0.035em] text-balance sm:text-[64px]">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          {study.stack && <StackList items={study.stack} />}
          {study.link && (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-highlight hover:text-highlight"
              href={study.link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit {study.link.label} ↗
            </a>
          )}
        </div>
      </header>

      <div className="mt-20 grid gap-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <SectionIndex sections={sections} />
          </div>
        </aside>

        <div className="grid min-w-0 gap-20">
          {!!study.problem?.length && (
            <Block id="problem" title="The problem">
              <div className="grid max-w-[60ch] gap-5 text-[19px] leading-[1.6]">
                {study.problem.map((paragraph, i) => (
                  <p className={i ? 'text-muted' : undefined} key={paragraph.slice(0, 24)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Block>
          )}

          {!!study.constraints?.length && (
            <Block id="constraints" title="Constraints">
              <Bullets items={study.constraints} />
            </Block>
          )}

          {!!study.architecture?.length && (
            <Block id="architecture" title="How it works">
              <Bullets items={study.architecture} />
            </Block>
          )}

          {!!study.decisions?.length && (
            <Block id="decisions" title="Decisions">
              <ul className="divide-y divide-line border-y border-line">
                {study.decisions.map((decision) => (
                  <li
                    className="grid gap-3 py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-10"
                    key={decision.title}
                  >
                    <h3 className="text-lg font-normal tracking-tight text-balance">
                      {decision.title}
                    </h3>
                    <div className="grid gap-3">
                      <p className="leading-relaxed text-muted">{decision.body}</p>
                      {decision.tradeoff && (
                        <p className="text-sm leading-relaxed">
                          <span className="font-mono text-xs uppercase tracking-[0.08em] text-highlight">
                            Trade-off ·{' '}
                          </span>
                          <span className="text-muted">{decision.tradeoff}</span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {!!study.stories?.length && (
            <Block id="stories" title="Hard problems">
              <ul className="grid gap-4 md:grid-cols-3">
                {study.stories.map((story) => (
                  <li className="rounded-2xl border border-line bg-surface p-6" key={story.title}>
                    <h3 className="text-lg font-normal tracking-tight">{story.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{story.body}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {!!study.numbers?.length && (
            <Block id="numbers" title="By the numbers">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 lg:grid-cols-4">
                {study.numbers.map((n) => (
                  <li key={n.label}>
                    <p className="text-4xl font-light tracking-tight text-highlight tabular-nums">
                      {n.value}
                    </p>
                    <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-muted">
                      {n.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {!!study.gallery?.length && (
            <Block id="screens" title="Screens">
              <div className="grid gap-10">
                {study.gallery.map((shot) => (
                  <figure key={shot.src}>
                    <div className="overflow-hidden rounded-xl border border-line bg-surface">
                      <div
                        aria-hidden="true"
                        className="flex gap-1.5 border-b border-line px-3 py-2"
                      >
                        <i className="size-2 rounded-full bg-line" />
                        <i className="size-2 rounded-full bg-line" />
                        <i className="size-2 rounded-full bg-line" />
                      </div>
                      <Image
                        alt={shot.alt}
                        className="w-full"
                        height={900}
                        sizes="(min-width: 1024px) 50rem, 100vw"
                        src={shot.src}
                        width={1440}
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          )}

          {study.process && (
            <Block id="process" title="How I built it">
              <p className="max-w-[60ch] text-[17px] leading-relaxed text-muted">{study.process}</p>
            </Block>
          )}

          {!!study.next?.length && (
            <Block id="next" title="What’s next">
              <Bullets items={study.next} />
            </Block>
          )}
        </div>
      </div>
    </article>
  )
}
