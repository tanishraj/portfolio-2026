import Link from 'next/link'
import React from 'react'

import { container, label } from '@/components/styles'

export default function NotFound() {
  return (
    <main className={`${container} pb-24 pt-24 sm:pt-36`} id="main">
      <p className={label}>404</p>
      <h1 className="mt-6 max-w-[18ch] text-4xl font-light leading-[1.08] tracking-[-0.03em] text-balance sm:text-6xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
        The link may be old, or the page may have moved. The work is still here.
      </p>
      <Link
        className="mt-10 inline-block text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
        href="/#work"
      >
        See selected work
      </Link>
    </main>
  )
}
