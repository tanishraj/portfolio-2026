import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { container, label } from '@/components/styles'

import photo from '../../../../public/images/tanish.webp'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Tanish Raj is a senior frontend engineer in Abu Dhabi, building design systems and calm interfaces for banking, credit and medical training.',
}

export default function AboutPage() {
  return (
    <main className={`${container} pb-16 pt-12 sm:pt-20`} id="main">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
        <div className="min-w-0">
          <p className={label}>About</p>
          <h1 className="mt-6 max-w-[18ch] text-4xl font-light leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            Hi, I&apos;m Tanish.
          </h1>
          <div className="mt-8 grid max-w-[60ch] gap-5 text-lg leading-relaxed">
            <p>
              I&apos;m a senior frontend engineer in Abu Dhabi. I started at Thomson Reuters in
              Bangalore in 2016, and since then I&apos;ve built interfaces for enterprise software,
              banks and, now, a private-credit firm.
            </p>
            <p className="text-muted">
              The work I enjoy most has strict rules and messy data: a banking flow that has to be
              right, a legacy app nobody wants to touch, a regulator&apos;s website that changes its
              mind. I like making that kind of thing feel calm for the person using it.
            </p>
            <p className="text-muted">
              Outside my job, I build software for a medical college: a logbook for postgraduate
              residents, a monitor for regulator notices, and the college&apos;s public website. All
              three are in production.
            </p>
          </div>

          <section aria-labelledby="ai" className="mt-16 max-w-[60ch]">
            <h2 className={label} id="ai">
              How I use AI
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              I build with AI agents every day, mostly Claude Code. I write the product brief, the
              design rules and the architecture decisions; agents do a lot of the typing; I review
              every change against those rules. It lets one person ship what used to need a team,
              without giving up ownership of how it works.
            </p>
          </section>

          <section aria-labelledby="facts" className="mt-16">
            <h2 className={label} id="facts">
              In short
            </h2>
            <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt className="text-muted">Based in</dt>
              <dd>Abu Dhabi, UAE</dd>
              <dt className="text-muted">Experience</dt>
              <dd>Almost ten years, six companies</dd>
              <dt className="text-muted">Best at</dt>
              <dd>React, TypeScript, design systems, system design</dd>
              <dt className="text-muted">Education</dt>
              <dd>MCA, Bangalore University</dd>
            </dl>
            <Link
              className="mt-8 inline-block text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              href="/cv"
            >
              Read the full CV
            </Link>
          </section>
        </div>

        <div className="min-w-0 md:pt-16">
          <Image
            alt="Portrait of Tanish Raj"
            className="aspect-[4/5] w-full max-w-sm rounded-2xl border border-line object-cover"
            placeholder="blur"
            priority
            sizes="(min-width: 768px) 24rem, 100vw"
            src={photo}
          />
        </div>
      </div>
    </main>
  )
}
