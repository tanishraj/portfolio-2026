import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { BrandIcon } from '@/components/BrandIcon'
import { CopyEmail } from '@/components/CopyEmail'
import { BrandLogo } from '@/components/BrandLogo'
import { AiRow } from '@/components/AiRow'
import { LedgerRow } from '@/components/Ledger'
import { Logo } from '@/components/Logo'
import { container } from '@/components/styles'
import { StackIcons } from '@/components/work'
import { WorkGrid } from '@/components/WorkGrid'
import { selectedStudies } from '@/content/case-studies'
import { aboutSections } from '@/content/about'
import { experience, links, stack, workIntro, writing } from '@/content/home'
import { person, siteUrl } from '@/lib/site'

import photo from '../../../public/images/tanish.webp'

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
    <main className={container} id="main">
      <script
        // Escaping "<" keeps the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />

      <div className="flex min-h-[calc(100svh-76px)] flex-col">
        <header className="hero-drift flex flex-1 flex-col justify-center py-12">
          <h1 className="text-[44px] font-extralight leading-[1.08] tracking-[-0.03em] text-balance sm:text-[72px]">
            <span className="block">I build scalable interfaces,</span>
            <span className="block">
              integrate <span className="text-highlight">AI</span> into apps &amp;
            </span>
            <span className="block">work across the stack.</span>
          </h1>
          <p
            className="rise mt-10 max-w-[40rem] text-[19px] leading-[1.6] text-muted"
            style={delay(1)}
          >
            For over a decade, I&apos;ve turned complex requirements into intuitive, reliable
            interfaces across finance, energy, and mobility. From banking platforms to enterprise
            applications, my focus has always been on performance, usability, and maintainable code.
            Today, I&apos;m extending that craft into{' '}
            <span className="whitespace-nowrap">AI-powered</span> experiences at Liquidity Capital.
          </p>
          <p
            className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-base"
            style={delay(2)}
          >
            <span className="inline-flex items-center gap-1.5">
              <a
                className="text-highlight underline-offset-4 hover:underline"
                href={`mailto:${person.email}`}
              >
                {person.email}
              </a>
              <CopyEmail email={person.email} variant="icon" />
            </span>
            <Link
              className="text-muted underline-offset-4 hover:text-fg hover:underline"
              href="/cv"
            >
              Read the CV →
            </Link>
          </p>
        </header>

        <div className="pb-10">
          <LedgerRow id="worked-for" reveal={false} title="Worked for">
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {experience.map((job) => (
                <li className="flex h-6 items-center" key={`${job.company}-${job.years}`}>
                  <BrandLogo label={job.company} name={job.logo} variant="mark" />
                </li>
              ))}
            </ul>
          </LedgerRow>
        </div>
      </div>

      <div className="grid gap-20 pb-8 pt-20 sm:gap-28 sm:pt-28">
        <LedgerRow id="work" title="Work">
          <WorkGrid intro={workIntro} studies={selectedStudies} />
        </LedgerRow>

        <LedgerRow id="ai" title="AI">
          <AiRow />
        </LedgerRow>

        {process.env.ANTHROPIC_API_KEY && (
          <LedgerRow id="ask" title="Ask">
            <AskBox />
          </LedgerRow>
        )}

        <LedgerRow id="about" title="About">
          <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
            <figure className="relative w-60 max-w-full self-start">
              <Image
                alt="Tanish Raj"
                className="aspect-[4/5] w-full rounded-xl object-cover grayscale"
                placeholder="blur"
                sizes="15rem"
                src={photo}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 text-highlight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              >
                <Logo size={30} />
              </span>
            </figure>
            <div className="divide-y divide-line">
              {aboutSections.map((section, i) => (
                <section
                  className={i === 0 ? 'pb-7' : i === aboutSections.length - 1 ? 'pt-7' : 'py-7'}
                  key={section.title}
                >
                  <h3 className="text-[20px] font-light text-fg">{section.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-muted">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </LedgerRow>

        <LedgerRow id="experience" title="Experience">
          <ol className="border-t border-line">
            {experience.map((job) => {
              const inner = (
                <>
                  <span className="font-mono text-[13px] text-muted tabular-nums">{job.years}</span>
                  <span className="text-base transition-colors group-hover:text-highlight">
                    {job.role}
                  </span>
                  <span className="flex items-center">
                    <BrandLogo label={job.company} name={job.logo} scale={0.8} />
                  </span>
                </>
              )
              const row =
                'grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[8rem_16rem_minmax(0,1fr)] sm:items-center'
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
                <h3 className="text-[17px] font-normal text-fg">{group.heading}</h3>
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
              <span className="mt-8 text-[20px] font-light leading-snug tracking-[-0.01em] transition-colors group-hover:text-highlight">
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
