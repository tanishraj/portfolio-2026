import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { sideProjects, sideProjectsIntro } from '@/content/side-projects'

/**
 * The home page's "Beyond 9–5" row: an intro paragraph and a divider, like the
 * other rows, then per project a tinted tile with the site's screenshot inset,
 * the title, one line and a link to the case study. Three across on wide screens.
 */
export function SideProjects() {
  return (
    <div>
      <p className="max-w-[46ch] pb-10 text-[22px] font-light leading-[1.5] tracking-[-0.01em]">
        {sideProjectsIntro}
      </p>
      <ul className="grid gap-x-6 gap-y-12 border-t border-line pt-10 lg:grid-cols-3">
        {sideProjects.map((project) => (
          <li className="flex max-w-md flex-col" key={project.slug}>
            <div className="flex aspect-4/3 items-center justify-center border border-line-strong/50 bg-line/35 px-[10%]">
              <Image
                alt={project.alt}
                className="h-auto w-full"
                placeholder="blur"
                sizes="(min-width: 1024px) 12rem, 22rem"
                src={project.image}
              />
            </div>
            <h3 className="mt-5 text-[20px] font-light leading-snug text-fg">{project.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.blurb}</p>
            <Link
              className="group/link mt-4 inline-flex items-center gap-1.5 self-start text-[15px] font-normal text-highlight"
              href={`/work/${project.slug}`}
            >
              View case study
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
