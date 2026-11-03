import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo'
import { container } from '@/components/styles'
import { ThemeToggle } from '@/components/ThemeToggle'

const nav = [
  { label: 'Work', href: '/#work', always: true },
  { label: 'About', href: '/about', always: true },
  { label: 'CV', href: '/cv', always: true },
  { label: 'Writing', href: '/#writing', always: false },
  { label: 'Contact', href: '#contact', always: false },
]

export function SiteHeader() {
  return (
    <header className={`${container} flex items-center justify-between py-6 print:hidden`}>
      <Link className="flex items-center gap-2.5 text-sm font-semibold tracking-tight" href="/">
        <Logo size={28} />
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
        <ThemeToggle />
      </nav>
    </header>
  )
}
