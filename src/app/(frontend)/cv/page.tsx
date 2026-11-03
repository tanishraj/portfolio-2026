import type { Metadata } from 'next'
import React from 'react'

import { container, label } from '@/components/styles'
import { cvBullets, cvEducation, cvProjects, cvSkills, cvSummary } from '@/content/cv'
import { experience, links } from '@/content/home'
import { cvPdfPath, person } from '@/lib/site'

export const metadata: Metadata = {
  title: 'CV',
  description:
    'CV of Tanish Raj, senior frontend engineer in Abu Dhabi: React, TypeScript, design systems and system design.',
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={`${label} border-b border-line pb-3 print:pb-1.5 print:text-[9px]`}>
      {children}
    </h2>
  )
}

export default function CvPage() {
  return (
    <main
      className={`${container} pb-16 pt-12 sm:pt-20 print:max-w-none print:p-0 print:text-[10.5px]`}
      id="main"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between print:flex-row print:items-end">
        <div>
          <h1 className="text-4xl font-light tracking-[-0.03em] sm:text-5xl print:text-[28px]">
            {person.name}
          </h1>
          <p className="mt-2 text-lg text-muted print:mt-1 print:text-[13px]">
            {person.jobTitle} · {person.location}
          </p>
        </div>
        <a
          className="self-start rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent sm:self-auto print:hidden"
          download
          href={cvPdfPath}
        >
          Download PDF
        </a>
        <ul className="hidden text-right text-muted print:block">
          <li>{person.email}</li>
          <li>tanish.im</li>
          <li>linkedin.com/in/itsmetanishraj · github.com/tanishraj</li>
        </ul>
      </div>

      <p className="mt-10 max-w-[70ch] text-lg leading-relaxed print:mt-4 print:max-w-none print:text-[11px]">
        {cvSummary}
      </p>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted print:hidden">
        <li>
          <a className="hover:text-fg" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </li>
        {links.map((link) => (
          <li key={link.label}>
            <a className="hover:text-fg" href={link.href} rel="noopener noreferrer" target="_blank">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <section className="mt-14 print:mt-4">
        <Heading>Experience</Heading>
        <ol>
          {experience.map((job) => (
            <li
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[9rem_minmax(0,1fr)] print:grid-cols-[6.5rem_minmax(0,1fr)] print:gap-y-1 print:break-inside-avoid print:py-2"
              key={job.company}
            >
              <div className="font-mono text-xs leading-6 text-muted tabular-nums print:text-[9px] print:leading-5">
                <p>{job.years}</p>
                <p>{job.place}</p>
              </div>
              <div className="min-w-0">
                <p className="font-medium">
                  {job.company} <span className="font-normal text-muted">· {job.role}</span>
                </p>
                <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed text-muted print:mt-0.5 print:gap-0 print:text-[9.5px] print:leading-snug">
                  {cvBullets[job.company]?.map((bullet) => (
                    <li className="flex gap-2" key={bullet}>
                      <span aria-hidden="true" className="text-accent">
                        ·
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 print:mt-4 print:break-inside-avoid">
        <Heading>Independent work · in production</Heading>
        <ul className="divide-y divide-line">
          {cvProjects.map((project) => (
            <li
              className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] print:grid-cols-[6.5rem_minmax(0,1fr)] print:py-2"
              key={project.title}
            >
              <p className="font-medium">{project.title}</p>
              <p className="text-sm leading-relaxed text-muted print:text-[10px] print:leading-snug">
                {project.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 grid gap-14 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] print:mt-4 print:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] print:gap-8">
        <section className="print:break-inside-avoid">
          <Heading>Skills</Heading>
          <dl className="mt-4 grid gap-3 text-sm print:mt-2 print:gap-1 print:text-[10px]">
            {cvSkills.map((group) => (
              <div
                className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] print:grid-cols-[6.5rem_minmax(0,1fr)]"
                key={group.heading}
              >
                <dt className="font-medium">{group.heading}</dt>
                <dd className="text-muted">{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="print:break-inside-avoid">
          <Heading>Education</Heading>
          <ul className="mt-4 grid gap-3 text-sm print:mt-2 print:gap-1 print:text-[10px]">
            {cvEducation.map((item) => (
              <li key={item.title}>
                <p className="font-medium">{item.title}</p>
                <p className="text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
