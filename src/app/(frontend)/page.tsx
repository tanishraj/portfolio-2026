import Image from 'next/image'
import React from 'react'

import { AskBox } from '@/components/AskBox'
import { CopyEmail } from '@/components/CopyEmail'
import { ExperienceChapters } from '@/components/ExperienceChapters'
import { SideProjects } from '@/components/SideProjects'
import { StackChips } from '@/components/StackChips'
import { BrandLogo } from '@/components/BrandLogo'
import { AiRow } from '@/components/AiRow'
import { LedgerRow } from '@/components/Ledger'
import { Logo } from '@/components/Logo'
import { buttonLabel, container, outlineButton } from '@/components/styles'
import { WorkGrid } from '@/components/WorkGrid'
import { workStudies } from '@/content/case-studies'
import { aboutSections } from '@/content/about'
import { experience, links, workIntro } from '@/content/home'
import { cvPdfPath, person, siteUrl } from '@/lib/site'

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
            For over a decade, I&apos;ve built enterprise web applications across finance, energy,
            and mobility. I enjoy solving challenging problems, creating scalable interfaces, and
            writing code that stands the test of time. Today, I&apos;m taking that experience beyond
            the frontend, building across the stack and integrating AI into modern applications.
          </p>
          <p
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={delay(2)}
          >
            <CopyEmail email={person.email} variant="button" />
            <a
              className={`group/cv ${outlineButton} text-fg`}
              download
              href={cvPdfPath}
            >
              <span className={buttonLabel}>Download CV</span>
              <svg
                aria-hidden="true"
                className="text-muted transition-transform duration-300 group-hover/cv:translate-y-0.5 group-hover/cv:text-highlight motion-reduce:transition-none"
                fill="none"
                height="14"
                viewBox="0 0 16 16"
                width="14"
              >
                <path
                  d="M8 2v8.5M4.5 7 8 10.5 11.5 7M2.5 13.5h11"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                />
              </svg>
            </a>
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
        <LedgerRow id="ai" title="Engineering with AI">
          <AiRow />
        </LedgerRow>

        <LedgerRow id="work" title="Work">
          <WorkGrid intro={workIntro} studies={workStudies} />
        </LedgerRow>

        {process.env.ANTHROPIC_API_KEY && (
          <LedgerRow id="ask" title="Ask">
            <AskBox />
          </LedgerRow>
        )}

        <LedgerRow id="about" title="About">
          <div className="grid gap-10 xl:grid-cols-[318px_26rem] xl:gap-12">
            <figure className="relative aspect-4/5 w-60 max-w-full self-start overflow-hidden xl:w-full">
              <Image
                alt="Tanish Raj"
                className="object-cover object-top"
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 318px, 15rem"
                src={photo}
              />
              {/* The brand mark in its light-theme colours (ink line, orange crossbar),
                  whatever the site theme, since the photo itself never changes. */}
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 text-[#1b1915] [--highlight:#c2410c]"
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

        <LedgerRow id="beyond" title="Beyond 9–5">
          <SideProjects />
        </LedgerRow>

        <LedgerRow id="experience" title="Experience">
          <ExperienceChapters />
        </LedgerRow>

        <LedgerRow id="stack" title="Stack">
          <StackChips />
        </LedgerRow>
      </div>
    </main>
  )
}
