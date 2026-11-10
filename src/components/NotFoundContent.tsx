import Link from 'next/link'
import React from 'react'

import { buttonLabel, container, label, outlineButton } from '@/components/styles'

/** The 404 page body, shared by unknown routes and missing case studies. */
export function NotFoundContent() {
  return (
    <main className={`${container} pb-24 pt-16 sm:pb-32 sm:pt-28`} id="main">
      <p className={label}>404</p>
      <h1 className="mt-6 max-w-[16ch] text-[40px] font-extralight leading-[1.08] tracking-[-0.03em] text-balance sm:text-[64px]">
        This page doesn’t exist.
      </h1>
      <p className="mt-6 max-w-[44ch] text-[19px] leading-[1.6] text-muted">
        The link may be old, or the page may have moved. The work is still here.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link className={`${outlineButton} pl-4 text-fg`} href="/">
          <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
            <path
              d="M13 8H3m4-4L3 8l4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
            />
          </svg>
          <span className={buttonLabel}>Home</span>
        </Link>
        <Link className={`${outlineButton} text-fg`} href="/#work">
          <span className={buttonLabel}>See selected work</span>
        </Link>
      </div>
    </main>
  )
}
