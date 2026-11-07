import Link from 'next/link'
import React from 'react'

import { experience, experienceChapters } from '@/content/home'

type Job = (typeof experience)[number]

function Row({ job }: { job: Job }) {
  const current = job.years.includes('now')
  const roles = job.roles ?? [{ title: job.role, years: job.years }]
  const inner = (
    <>
      <span className="col-span-2 text-[17px] text-muted sm:col-span-1 sm:col-start-3 sm:row-start-1">
        {job.company}
      </span>
      {roles.map((role, i) => (
        <React.Fragment key={role.title}>
          <span
            className="whitespace-nowrap text-[17px] text-muted tabular-nums [grid-row-start:calc(var(--line)+1)] sm:col-start-1 sm:[grid-row-start:var(--line)]"
            style={{ '--line': i + 1 } as React.CSSProperties}
          >
            {role.years}
          </span>
          <span
            className={`flex items-center gap-2.5 text-[17px] [grid-row-start:calc(var(--line)+1)] sm:col-start-2 sm:[grid-row-start:var(--line)] ${i === 0 ? 'text-fg' : 'text-muted'}`}
            style={{ '--line': i + 1 } as React.CSSProperties}
          >
            <span className="relative transition-colors duration-300 group-hover:text-highlight">
              {role.title}
              {current && i === 0 && (
                <span
                  aria-label="Current role"
                  className="absolute -right-3 -top-0.5 flex size-1.5"
                  role="img"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-highlight opacity-70 motion-reduce:animate-none" />
                  <span className="relative size-1.5 rounded-full bg-highlight" />
                </span>
              )}
            </span>
          </span>
        </React.Fragment>
      ))}
    </>
  )
  const row =
    'grid grid-cols-[7.75rem_minmax(0,1fr)] gap-x-5 gap-y-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_11rem] sm:gap-y-3.5'
  return (
    <li className="border-b border-line">
      {job.study ? (
        <Link className={`group ${row}`} href={`/work/${job.study}`}>
          {inner}
        </Link>
      ) : (
        <div className={row}>{inner}</div>
      )}
    </li>
  )
}

/** The Experience row: roles grouped by country, each chapter newest first. */
export function ExperienceChapters() {
  return (
    <div className="flex flex-col gap-14">
      {experienceChapters.map((chapter) => {
        const jobs = experience.filter((job) => chapter.places.includes(job.place))
        if (!jobs.length) return null
        return (
          <section key={chapter.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line-strong pb-4">
              <h3 className="text-[26px] font-extralight tracking-[-0.02em]">{chapter.title}</h3>
            </div>
            <ol>
              {jobs.map((job) => (
                <Row job={job} key={`${job.company}-${job.years}`} />
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
