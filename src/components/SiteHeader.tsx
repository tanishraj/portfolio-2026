'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo'
import { container } from '@/components/styles'
import { ThemeToggle } from '@/components/ThemeToggle'

const nav = [
  { label: 'AI', href: '/#ai', always: true },
  { label: 'Work', href: '/#work', always: true },
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

  const veil =
    'pointer-events-none absolute bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80'

  return (
    <header
      className="sticky top-0 z-30 print:hidden"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* A tint behind the nav that reaches well below it and fades to nothing,
          so content scrolling underneath dissolves instead of being cut off. */}
      <div
        aria-hidden="true"
        className={`header-veil header-fade ${veil} inset-x-0 top-0 -bottom-12`}
        data-visible={compact}
      />
      <div
        className={`${container} relative flex items-center justify-between gap-4 transition-[padding] duration-300 motion-reduce:transition-none ${
          compact ? 'py-4' : 'py-6'
        }`}
      >
        <Link
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[15px] font-normal sm:text-[17px]"
          href="/"
        >
          <span className={`transition-transform duration-300 ${compact ? 'scale-[0.8]' : ''}`}>
            <Logo size={28} />
          </span>
          Tanish Raj
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-3.5 text-sm font-normal text-muted sm:gap-6 sm:text-[15px]"
        >
          {nav.map((item) => (
            <Link
              className={`${item.always ? '' : 'hidden sm:inline'} transition-colors hover:text-fg`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
