'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { container } from '@/components/styles'
import { ThemeToggle } from '@/components/ThemeToggle'

const nav = [
  { label: 'AI', href: '/#ai' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

const sectionIds = nav.map((item) => item.href.split('#')[1])

/**
 * The section being read: the last nav section whose top has passed a third of
 * the way down the screen, or Contact once the page is scrolled to the bottom.
 */
function currentSection(): string | null {
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) return sectionIds[sectionIds.length - 1]
  const line = window.innerHeight / 3
  let current: string | null = null
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= line) current = id
  }
  return current
}

// The header stays at the top of the page and gets a little smaller once the
// visitor has scrolled past the hero's first lines. On the home page the link
// for the section in view is highlighted; on a case study, Work is.
export function SiteHeader() {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const [compact, setCompact] = useState(false)
  const [section, setSection] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setCompact(window.scrollY > 48)
      setSection(onHome ? currentSection() : null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [onHome])

  const active = onHome ? section : pathname.startsWith('/work/') ? 'work' : null

  const veil =
    'pointer-events-none absolute bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80'

  return (
    // A fixed height: the bar tightens inside it, but the space it takes in the
    // page never changes. If it did, the content below would shift as the bar
    // shrank, browsers would correct the scroll position, and right at the
    // threshold the header would flip back and forth.
    <header
      className="sticky top-0 z-30 h-22 print:hidden"
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
        <div className="flex items-center gap-2.5 sm:gap-6">
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 text-[15px] font-normal text-muted sm:flex"
          >
            {nav.map((item) => {
              const current = item.href.endsWith(`#${active}`)
              return (
                <Link
                  aria-current={current ? 'location' : undefined}
                  className={`transition-colors ${current ? 'text-highlight' : 'hover:text-fg'}`}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <ThemeToggle />
          <MobileMenu active={active} items={nav} />
        </div>
      </div>
    </header>
  )
}
