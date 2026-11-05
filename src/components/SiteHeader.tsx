'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo'
import { container } from '@/components/styles'
import { SpecMode } from '@/components/SpecMode'
import { ThemeToggle } from '@/components/ThemeToggle'

const nav = [
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
      className={`sticky top-0 z-30 border-b transition-[background-color,border-color,backdrop-filter] duration-300 print:hidden ${
        compact
          ? 'border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'border-transparent bg-transparent'
      }`}
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div
        className={`${container} flex items-center justify-between transition-[padding] duration-300 ${
          compact ? 'py-3' : 'py-6'
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
