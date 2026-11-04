import Link from 'next/link'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { BrandIcon, type BrandKey } from '@/components/BrandIcon'
import { LedgerRow } from '@/components/Ledger'
import { LiveStatus } from '@/components/LiveStatus'
import { container, label } from '@/components/styles'
import { WorkIndex } from '@/components/WorkIndex'
import { caseStudies } from '@/content/case-studies'
import { ai, alsoBuilt, experience, links, stack, writing } from '@/content/home'
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

      <header className="max-w-[640px] pb-20 pt-16 sm:pb-24 sm:pt-20">
        <p className={`${label} rise`}>Senior frontend engineer · Abu Dhabi</p>
        <h1
          className="mt-6 text-4xl font-light leading-[1.06] tracking-[-0.035em] text-balance sm:text-[46px]"
          data-spec="display · Manrope 300 · 46/49 · −0.035em"
        >
          Calm interfaces for <span className="text-highlight">complicated</span> products.
        </h1>
        <p
          className="rise mt-6 max-w-[56ch] text-[17px] leading-relaxed text-muted"
          style={delay(1)}
        >
          Ten years of frontend engineering across banking, private credit and medical training, and
          the last two spent owning the backend and the AI alongside it. Right now at{' '}
          <Company logo="liquidity" name="Liquidity Capital" />, building tools for private credit.
          Before that, <Company logo="bsf" name="Banque Saudi Fransi" /> and{' '}
          <Company logo="wellsfargo" name="Wells Fargo" />.
        </p>
        <p className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px]" style={delay(2)}>
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

      <div className="grid gap-16 pb-8 sm:gap-20">
        <LedgerRow id="now" title="Now">
          <LiveStatus now="an internal AI assistant on LibreChat" />
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted">
            Open to senior frontend, design-systems and AI-product roles in the UAE.
          </p>
        </LedgerRow>

        <LedgerRow id="work" title="Work">
          <WorkIndex studies={caseStudies} />
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {alsoBuilt.map((item) => (
              <li className="min-w-0 text-[15px]" key={item.title}>
                <a className={rowLink} href={item.href} rel="noopener noreferrer" target="_blank">
                  <span className="truncate">{item.title}</span>
                  <span className="shrink-0 truncate font-mono text-[11px] text-muted">
                    {item.detail} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </LedgerRow>

        <LedgerRow id="ai" title="AI">
          <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted">
            I treat AI as part of the stack, not a feature. Four things that shipped:
          </p>
          <ol className="dim-siblings mt-5 border-t border-line">
            {ai.map((item) => (
              <li className="border-b border-line" key={item.title}>
                <Link className="group grid gap-1.5 py-5" href={item.href}>
                  <span className="text-[17px] leading-snug tracking-[-0.01em] transition-colors group-hover:text-highlight">
                    {item.title}
                  </span>
                  <span className="max-w-[60ch] text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </LedgerRow>

        {process.env.ANTHROPIC_API_KEY && (
          <LedgerRow id="ask" title="Ask">
            <AskBox />
          </LedgerRow>
        )}

        <LedgerRow id="experience" title="Experience">
          <ol className="border-t border-line">
            {experience.map((job) => (
              <li
                className="grid gap-x-5 gap-y-1 border-b border-line py-4 text-[15px] sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-baseline"
                key={job.company}
              >
                <span className="font-mono text-[11px] text-muted tabular-nums">{job.years}</span>
                <span className="min-w-0">
                  <span className="text-fg">
                    <BrandIcon
                      className="mr-1.5 inline-block align-[-2px] text-muted"
                      name={job.logo}
                      size={15}
                    />
                    {job.company}
                  </span>
                  <span className="text-muted"> · {job.role}</span>
                </span>
                <span className="hidden text-[13px] text-muted sm:block">{job.place}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-muted">
            Role by role, with what each one taught me, on the{' '}
            <Link className="underline underline-offset-4 hover:text-fg" href="/cv">
              CV
            </Link>
            .
          </p>
        </LedgerRow>

        <LedgerRow id="stack" title="Stack">
          <div className="grid gap-7">
            {stack.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[15px]">{group.heading}</h3>
                <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted">
                  {group.items.map((item) => (
                    <li className="flex items-center gap-1.5" key={item.label}>
                      {item.logo && <BrandIcon name={item.logo} size={14} />}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </LedgerRow>

        <LedgerRow id="lab" title="Lab">
          <Link className="group block border-y border-line py-5" href="/lab/event-loop">
            <span className="flex items-baseline justify-between gap-6">
              <span className="text-[17px] leading-snug tracking-[-0.01em] transition-colors group-hover:text-highlight">
                The event loop, drawn
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-highlight">
                Interactive
              </span>
            </span>
            <span className="mt-1.5 block max-w-[60ch] text-[15px] leading-relaxed text-muted">
              Step through promises, timers and async/await. Each puzzle is checked against a real
              JavaScript engine; the loop itself is drawn in raw WebGL.
            </span>
          </Link>
        </LedgerRow>

        <LedgerRow id="writing" title="Writing">
          <ul className="dim-siblings border-t border-line">
            {writing.map((post) => (
              <li key={post.href}>
                <a
                  className={`${rowLink} text-[15px]`}
                  href={post.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{post.title}</span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted tabular-nums">
                    {post.date}
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg"
            href="https://medium.com/@tanish_rajput"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BrandIcon name="medium" size={13} /> All articles on Medium <ArrowIcon />
          </a>
        </LedgerRow>
      </div>
    </main>
  )
}
