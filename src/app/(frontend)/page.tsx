import Link from 'next/link'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { BrandIcon, isWordmark, type BrandKey } from '@/components/BrandIcon'
import { BrandLogo } from '@/components/BrandLogo'
import { LedgerRow } from '@/components/Ledger'
import { LiveStatus } from '@/components/LiveStatus'
import { container, label } from '@/components/styles'
import { StackIcons } from '@/components/work'
import { selectedStudies } from '@/content/case-studies'
import { ai, experience, links, stack, writing } from '@/content/home'
import { person, siteUrl } from '@/lib/site'

// Structured data so search engines know who this site is about.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.jobTitle,
  email: `mailto:${person.email}`,
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
  worksFor: { '@type': 'Organization', name: 'Liquidity Capital' },
  sameAs: links.map((link) => link.href),
  knowsAbout: [
    'React',
    'TypeScript',
    'Next.js',
    'Design systems',
    'Node.js',
    'PostgreSQL',
    'LLM applications',
  ],
}

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties

/** A company name with its small mark, for use inside sentences. */
function Company({ name, logo }: { name: string; logo: BrandKey }) {
  if (isWordmark(logo)) {
    return <BrandIcon className="mx-0.5 align-[-2px] text-fg" name={logo} size={14} title />
  }
  return (
    <span className="whitespace-nowrap text-fg">
      <BrandIcon className="mr-1.5 inline-block align-[-2px]" name={logo} size={15} />
      {name}
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
      <path
        d="M3.5 8.5l5-5M4.5 3.5h4v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

const rowLink =
  'group flex items-baseline justify-between gap-6 border-b border-line py-3.5 transition-colors hover:text-highlight'

export default function HomePage() {
  return (
    <main className={container} id="main">
      <script
        // Escaping "<" keeps the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />

      <header className="pb-24 pt-20 sm:pt-28">
        <p className={`${label} rise`}>Senior frontend engineer · Abu Dhabi</p>
        <h1
          className="mt-8 max-w-[20ch] text-[40px] font-light leading-[1.06] tracking-[-0.035em] text-balance sm:text-[64px]"
          data-spec="display · Manrope 300 · 64/68 · −0.035em"
        >
          I build <span className="text-highlight">calm</span> interfaces for complicated products.
        </h1>
        <p
          className="rise mt-10 max-w-[36rem] text-[19px] leading-[1.6] text-muted"
          style={delay(1)}
        >
          Ten years of building front ends, mostly for banks. Today I&apos;m at{' '}
          <Company logo="liquidity" name="Liquidity Capital" /> in Abu Dhabi, where I built the
          design system for a private credit platform and now mostly work on its AI assistant.
          Evenings go to software for a medical college in Bihar, which is how I ended up running
          the backend too.
        </p>
        <p className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-base" style={delay(2)}>
          <a
            className="text-highlight underline-offset-4 hover:underline"
            href={`mailto:${person.email}`}
          >
            {person.email}
          </a>
          <Link className="text-muted underline-offset-4 hover:text-fg hover:underline" href="/cv">
            Read the CV →
          </Link>
        </p>
      </header>

      <div className="grid gap-20 pb-8 sm:gap-28">
        <LedgerRow id="worked-for" title="Worked for">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
            {experience.map((job) => (
              <li className="flex h-8 items-center" key={`${job.company}-${job.years}`}>
                <BrandLogo label={job.company} name={job.logo} />
              </li>
            ))}
          </ul>
        </LedgerRow>

        <LedgerRow id="now" title="Now">
          <LiveStatus now="an internal AI assistant on LibreChat" />
          <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">
            I&apos;m looking for a senior frontend or design systems role in the UAE. Ideally
            somewhere the AI work is real.
          </p>
        </LedgerRow>

        <LedgerRow id="work" title="Work">
          <ul className="grid gap-4 sm:grid-cols-2">
            {selectedStudies.map((study) => (
              <li key={study.slug}>
                <Link
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0"
                  href={`/work/${study.slug}`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {study.meta.split(' · ').slice(0, 2).join(' · ')}
                    {study.locked && <span className="text-highlight"> · on request</span>}
                  </span>
                  <span className="mt-8 text-[22px] leading-snug tracking-[-0.015em] transition-colors group-hover:text-highlight">
                    {study.title}
                  </span>
                  <span className="mt-2 text-base leading-relaxed text-muted">{study.summary}</span>
                  <span className="mt-auto pt-6">
                    <StackIcons items={study.stack?.slice(0, 5)} size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Earlier work, one study per employer, is linked from{' '}
            <a className="underline underline-offset-4 hover:text-fg" href="#experience">
              experience
            </a>
            .
          </p>
        </LedgerRow>

        <LedgerRow id="ai" title="AI">
          <p className="max-w-[34rem] text-[19px] leading-[1.5] tracking-[-0.01em]">
            I build with models every day, and I&apos;m careful about where they get the final say.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
            {ai
              .filter((item) => !item.needsAsk || process.env.ANTHROPIC_API_KEY)
              .map((item) => (
                <li key={item.title}>
                  <Link className="group block" href={item.href}>
                    <span className="block text-[17px] leading-snug transition-colors group-hover:text-highlight">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block text-base leading-relaxed text-muted">
                      {item.body}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </LedgerRow>

        {process.env.ANTHROPIC_API_KEY && (
          <LedgerRow id="ask" title="Ask">
            <AskBox />
          </LedgerRow>
        )}

        <LedgerRow id="experience" title="Experience">
          <ol className="border-t border-line">
            {experience.map((job) => {
              const inner = (
                <>
                  <span className="font-mono text-[11px] text-muted tabular-nums">{job.years}</span>
                  <span className="min-w-0">
                    <span className="inline-flex items-center align-middle transition-colors group-hover:text-highlight">
                      <BrandLogo label={job.company} name={job.logo} scale={0.8} />
                    </span>
                    <span className="ml-2 text-muted">· {job.role}</span>
                  </span>
                </>
              )
              const row =
                'grid gap-x-5 gap-y-1 py-4 text-base sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline'
              return (
                <li className="border-b border-line" key={`${job.company}-${job.years}`}>
                  {job.study ? (
                    <Link className={`group ${row}`} href={`/work/${job.study}`}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={row}>{inner}</div>
                  )}
                </li>
              )
            })}
          </ol>
          <p className="mt-4 text-sm text-muted">
            Each role opens its case study. The one-page version is the{' '}
            <Link className="underline underline-offset-4 hover:text-fg" href="/cv">
              CV
            </Link>
            .
          </p>
        </LedgerRow>

        <LedgerRow id="stack" title="Stack">
          <div className="grid gap-10 border-t border-line pt-8 sm:grid-cols-3 sm:gap-8">
            {stack.map((group) => (
              <div key={group.heading}>
                <h3 className="text-base">{group.heading}</h3>
                <ul className="mt-4 grid gap-2 text-base text-muted">
                  {group.items.map((item) => (
                    <li className="flex items-center gap-2" key={item.label}>
                      {item.logo ? (
                        <BrandIcon name={item.logo} size={14} />
                      ) : (
                        <span aria-hidden="true" className="inline-block w-3.5 text-center">
                          ·
                        </span>
                      )}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </LedgerRow>

        <LedgerRow id="writing" title="Lab and writing">
          <div className="grid gap-4 lg:grid-cols-2">
            <Link
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0"
              href="/lab/event-loop"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-highlight">
                Interactive
              </span>
              <span className="mt-8 text-[22px] leading-snug tracking-[-0.015em] transition-colors group-hover:text-highlight">
                The event loop, drawn
              </span>
              <span className="mt-2 text-base leading-relaxed text-muted">
                Step through promises, timers and async/await and watch the queues move. Every
                puzzle is checked against a real JavaScript engine, so it can&apos;t lie to you.
              </span>
              <span className="mt-auto pt-6">
                <StackIcons items={['typescript', 'react', 'webgl', 'vitest']} size={14} />
              </span>
            </Link>
            <div className="rounded-2xl border border-line p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                Writing, on Medium
              </span>
              <ul className="mt-5 grid gap-3">
                {writing.map((post) => (
                  <li key={post.href}>
                    <a
                      className="group flex items-baseline justify-between gap-4 text-base transition-colors hover:text-highlight"
                      href={post.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{post.title}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted tabular-nums">
                        {post.date}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                href="https://medium.com/@tanish_rajput"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BrandIcon name="medium" size={13} /> All articles <ArrowIcon />
              </a>
            </div>
          </div>
        </LedgerRow>
      </div>
    </main>
  )
}
