'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo'
import { container } from '@/components/styles'
import { SpecMode } from '@/components/SpecMode'
import { ThemeToggle } from '@/components/ThemeToggle'

const nav = [
  { label: 'AI', href: '/#ai', always: true },
  { label: 'Work', href: '/#work', always: true },
  { label: 'Writing', href: '/#writing', always: false },
  { label: 'About', href: '/#about', always: true },
  { label: 'CV', href: '/cv', always: true },
]

// The header stays at the top of the page and gets a little smaller once the
// visitor has scrolled past the hero's first lines.
export function SiteHeader() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setCompact(window.scrollY > 48)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      className="sticky top-0 z-30 print:hidden"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* A solid backdrop behind the nav, then a strip below it that fades to
          nothing, so content scrolling underneath dissolves before it reaches
          the nav instead of being cut off by an edge. */}
      <div
        aria-hidden="true"
        className="header-backdrop pointer-events-none absolute inset-x-0 top-0 -bottom-48 bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80"
        data-visible={compact}
      />
      <div
        className={`${container} relative flex items-center justify-between transition-[padding] duration-300 motion-reduce:transition-none ${
          compact ? 'py-4' : 'py-6'
        }`}
      >
        <Link className="flex items-center gap-2.5 text-sm font-semibold tracking-tight" href="/">
          <span className={`transition-transform duration-300 ${compact ? 'scale-[0.8]' : ''}`}>
            <Logo size={28} />
          </span>
          Tanish Raj
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm text-muted sm:gap-6">
          {nav.map((item) => (
            <Link
              className={`${item.always ? '' : 'hidden sm:inline'} transition-colors hover:text-fg`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
          <SpecMode />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
