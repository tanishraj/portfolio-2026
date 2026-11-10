import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { buttonLabel, containerWide as container, label, outlineButton } from '@/components/styles'
import { EventLoopLab } from '@/lab/event-loop/EventLoopLab'

export const metadata: Metadata = {
  title: 'The event loop, drawn',
  description:
    'An interactive visualiser of the JavaScript event loop: call stack, Web APIs, microtasks and the task queue, step by step.',
}

export default function EventLoopPage() {
  return (
    <main className={`${container} pb-16 pt-12 sm:pt-20`} id="main">
      <Link className={`${outlineButton} pl-4 text-muted`} href="/">
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
      <p className={`${label} mt-12`}>Lab · Interactive</p>
      <h1 className="mt-6 max-w-[20ch] text-[40px] font-extralight leading-[1.08] tracking-[-0.03em] text-balance sm:text-[64px]">
        The event loop, drawn.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
        JavaScript runs one thing at a time, yet timers, promises and async functions seem to happen
        “later”. Step through three classic puzzles and watch where each callback waits, and why
        promises beat timers every time.
      </p>

      <EventLoopLab />

      <section aria-labelledby="how" className="mt-20 max-w-[65ch]">
        <h2 className={label} id="how">
          How it&apos;s built
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          A small TypeScript model of the event loop turns each snippet into frames. To keep it
          honest, a test runs every snippet in a real JavaScript engine and fails if the model
          prints anything in a different order. The ring is drawn with raw WebGL, no libraries: one
          shader, redrawn only while the dot moves, in the site&apos;s own colours.
        </p>
      </section>
    </main>
  )
}
