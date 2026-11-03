import Link from 'next/link'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { BrandIcon } from '@/components/BrandIcon'
import { HeroSettle } from '@/components/HeroSettle'
import { container, label } from '@/components/styles'
import { StackIcons } from '@/components/work'
import { WorkIndex } from '@/components/WorkIndex'
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
  aside,
}: {
  id: string
  title: string
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`${container} py-16 sm:py-24`}
      data-spec="section · py 96"
      id={id}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h2 className={label} id={`${id}-heading`}>
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-10">{children}</div>
    </section>
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

export default function HomePage() {
  return (
    <main id="main">
      <script
        // Escaping "<" keeps the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />

      <section
        className={`${container} grid items-center gap-14 overflow-x-clip pb-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-24`}
      >
        <div>
          <p className={`${label} rise flex items-center gap-2`}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight" />
            Senior frontend engineer · Abu Dhabi
          </p>
          <h1
            className="mt-6 max-w-[18ch] text-4xl font-light leading-[1.05] tracking-[-0.035em] text-balance sm:text-6xl"
            data-spec="display · Manrope 300 · 60/63 · −0.035em"
          >
            I build design systems and{' '}
            <span className="text-highlight" data-spec="--highlight">
              calm interfaces
            </span>{' '}
            for complicated products.
          </h1>
          <p className="rise mt-6 max-w-[48ch] text-lg leading-relaxed text-muted" style={delay(1)}>
            Ten years across banking, private credit and medical training. Right now at Liquidity
            Capital, building tools for private credit. Lately: AI and backend.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(2)}>
            <Link
              className="rounded-full bg-highlight px-5 py-2.5 text-sm font-medium text-highlight-ink transition-opacity hover:opacity-90"
              data-spec="primary · --highlight"
              href="#work"
            >
              See the work
            </Link>
            <Link
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm transition-colors hover:border-fg"
              href="/cv"
            >
              Read the CV
            </Link>
            <span className="ml-1 hidden font-mono text-[11px] text-muted lg:inline">
              Press <kbd className="rounded border border-line-strong px-1.5 py-0.5">S</kbd> to see
              how this page is built
            </span>
          </div>
        </div>
        <HeroSettle />
      </section>

      <section aria-label="Where I’ve worked" className="border-y border-line">
        <div
          className={`${container} flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:justify-between`}
        >
          <p className={label}>Where I’ve worked</p>
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-4 text-muted">
            {experience.map((job) => (
              <li
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-fg"
                key={job.company}
                title={`${job.role} · ${job.years}`}
              >
                <BrandIcon name={job.logo} size={18} />
                {job.company}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section
        aside={
          <span className="font-mono text-xs text-muted tabular-nums">
            {caseStudies.length} case studies
          </span>
        }
        id="work"
        title="Selected work"
      >
        <WorkIndex studies={caseStudies} />

        <h3 className={`${label} mt-16`}>Also built</h3>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {alsoBuilt.map((item) => (
            <li className="border-b border-line" key={item.title}>
              {item.href ? (
                <a
                  className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="transition-colors group-hover:text-highlight">
                    {item.title} <span aria-hidden="true">↗</span>
                  </span>
                  <span className="text-sm text-muted">{item.detail}</span>
                </a>
              ) : (
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted">{item.detail}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {process.env.ANTHROPIC_API_KEY && (
        <Section id="ask" title="Ask about my work">
          <AskBox />
        </Section>
      )}

      <Section id="approach" title="How I work">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-10">
          {principles.map((principle, i) => (
            <li className="border-t border-line pt-6" key={principle.title}>
              <span className="font-mono text-xs text-highlight">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-light tracking-tight text-balance">
                {principle.title}
              </h3>
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
                <p className="flex items-center gap-2.5">
                  <span className="grid w-7 shrink-0 place-items-center text-muted">
                    <BrandIcon name={job.logo} size={18} />
                  </span>
                  <span>
                    {job.company} <span className="text-muted">· {job.role}</span>
                  </span>
                </p>
                <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted sm:pl-[2.375rem]">
                  {job.note}
                </p>
              </div>
              <span className="text-sm leading-7 text-muted sm:text-right">{job.place}</span>
            </li>
          ))}
        </ol>
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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <Link
            className="group grid content-start gap-4 rounded-2xl border border-line bg-surface p-5 transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0 sm:p-6"
            href="/lab/event-loop"
          >
            <p className={`${label} text-highlight`}>Interactive · Live</p>
            <h3 className="text-2xl font-light tracking-tight">The event loop, drawn.</h3>
            <p className="text-sm leading-relaxed text-muted">
              Step through promises, timers and async/await, and watch the call stack and queues
              move. A test checks every puzzle against a real JavaScript engine, and the loop is
              drawn in raw WebGL.
            </p>
            <div className="mt-2 flex items-center justify-between gap-6">
              <StackIcons items={['typescript', 'react', 'webgl', 'vitest']} />
              <span className="text-sm text-highlight transition-transform group-hover:translate-x-0.5">
                Open the lab →
              </span>
            </div>
          </Link>
          <div className="grid content-start gap-3 rounded-2xl border border-line p-5 sm:p-6">
            <p className={label}>In the lab next</p>
            <h3 className="text-2xl font-light tracking-tight">Design tokens with rules.</h3>
            <p className="text-sm leading-relaxed text-muted">
              Stackcanvas, a token editor for a website builder. Aliases are typed, cycles and
              missing references block publishing, every property inherits on its own, and contrast
              is checked in both themes before anything goes live.
            </p>
            <StackIcons items={['nextjs', 'payload', 'mongodb', 'tailwind']} />
          </div>
        </div>
      </Section>

      <Section
        aside={
          <a
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            href="https://medium.com/@tanish_rajput"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BrandIcon name="medium" size={14} /> All on Medium <ArrowIcon />
          </a>
        }
        id="writing"
        title="Writing"
      >
        <ul className="border-t border-line">
          {writing.map((post) => (
            <li className="border-b border-line" key={post.href}>
              <a
                className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-highlight"
                href={post.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-xl font-light tracking-tight">{post.title}</span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted tabular-nums">
                  {post.date}
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
