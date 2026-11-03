import Link from 'next/link'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { container, label } from '@/components/styles'
import { caseStudies } from '@/content/case-studies'
import { alsoBuilt, experience, links, principles, skills, writing } from '@/content/home'
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
  knowsAbout: ['React', 'TypeScript', 'Design systems', 'System design', 'Next.js'],
}

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className={`${container} py-16 sm:py-20`} id={id}>
      <h2 className={label} id={`${id}-heading`}>
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

function LockIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
      <rect height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2" width="8" x="2" y="5.25" />
      <path d="M4 5.25V3.5a2 2 0 0 1 4 0v1.75" stroke="currentColor" strokeWidth="1.2" />
    </svg>
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

type LabItem = { status: string; title: string; body: string; href?: string }

const lab: LabItem[] = [
  {
    status: 'Interactive',
    title: 'The event loop, drawn.',
    body: 'Step through promises, timers and async/await, and watch the call stack, microtasks and task queue in real time. Checked against a real JavaScript engine; the loop itself is drawn in WebGL.',
    href: '/lab/event-loop',
  },
  {
    status: 'Private build',
    title: 'Design tokens with rules.',
    body: 'Stackcanvas, a token editor for a website builder. Aliases are typed, cycles and missing references are caught before publishing, every property inherits on its own, and contrast is checked per block. Demo video coming.',
  },
]

function LabCard({ item }: { item: LabItem }) {
  const card = 'block h-full rounded-2xl border border-line bg-surface p-6 sm:p-8'
  const inner = (
    <>
      <p className={`${label} text-accent`}>{item.status}</p>
      <h3 className="mt-4 text-2xl font-light tracking-tight">{item.title}</h3>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">{item.body}</p>
      {item.href && <span className="mt-6 inline-block text-sm text-accent">Open the lab →</span>}
    </>
  )
  if (!item.href) return <div className={card}>{inner}</div>
  return (
    <Link
      className={`${card} transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0`}
      href={item.href}
    >
      {inner}
    </Link>
  )
}

export default function HomePage() {
  return (
    <main id="main">
      <script
        // Escaping "<" keeps the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />
      <section className={`${container} pb-16 pt-24 sm:pb-20 sm:pt-36`}>
        <p className={`${label} rise flex items-center gap-2`}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          Senior frontend engineer · Abu Dhabi
        </p>
        <h1 className="mt-6 max-w-[20ch] text-4xl font-light leading-[1.08] tracking-[-0.03em] text-balance sm:text-6xl">
          I build design systems and calm interfaces for complicated products.
        </h1>
        <p className="rise mt-6 max-w-[52ch] text-lg leading-relaxed text-muted" style={delay(2)}>
          Banking, credit, and medical training, for almost ten years. Right now I&apos;m at
          Liquidity Capital, building tools for private credit. Lately: AI and backend.
        </p>
      </section>

      <Section id="work" title="Selected work">
        <ul className="grid gap-3 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <li className="rise" key={study.slug} style={delay(i + 3)}>
              <Link
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0 sm:p-8"
                href={`/work/${study.slug}`}
              >
                <p className={`${label} flex items-center justify-between gap-3`}>
                  <span>{study.meta}</span>
                  {study.locked && (
                    <span className="flex items-center gap-1 text-accent">
                      <LockIcon />
                      On request
                    </span>
                  )}
                </p>
                <h3 className="mt-12 text-2xl font-light tracking-tight">{study.title}</h3>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
                  {study.summary}
                </p>
                <span className="mt-auto pt-8 text-sm text-accent">Read the case study →</span>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className={`${label} mt-16`}>Also built</h3>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {alsoBuilt.map((item) => (
            <li
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
              key={item.title}
            >
              <span>{item.title}</span>
              <span className="text-sm text-muted">{item.detail}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Shown only when the site has an Anthropic API key. */}
      {process.env.ANTHROPIC_API_KEY && (
        <Section id="ask" title="Ask about my work">
          <AskBox />
        </Section>
      )}

      <Section id="approach" title="How I work">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((principle) => (
            <li key={principle.title}>
              <h3 className="text-lg font-normal tracking-tight text-balance">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="border-t border-line">
          {experience.map((job) => (
            <li
              className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[9rem_minmax(0,1fr)_auto]"
              key={job.company}
            >
              <span className="font-mono text-xs leading-7 text-muted tabular-nums">
                {job.years}
              </span>
              <div className="min-w-0">
                <p>
                  {job.company} <span className="text-muted">· {job.role}</span>
                </p>
                <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted">{job.note}</p>
              </div>
              <span className="text-sm leading-7 text-muted sm:text-right">{job.place}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">
          Alongside my job, I build healthtech products that are in production: Anubhav, Notivo and
          snmih.in.
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {skills.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold">{group.heading}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="lab" title="Lab">
        <ul className="grid gap-3 md:grid-cols-2">
          {lab.map((item) => (
            <li key={item.title}>
              <LabCard item={item} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="writing" title="Writing">
        <ul className="border-t border-line">
          {writing.map((post) => (
            <li className="border-b border-line" key={post.href}>
              <a
                className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-accent"
                href={post.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{post.title}</span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted tabular-nums">
                  {post.date}
                  <ArrowIcon />
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
          All articles on Medium <ArrowIcon />
        </a>
      </Section>
    </main>
  )
}
