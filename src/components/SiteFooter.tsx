import React from 'react'

import { container, label } from '@/components/styles'
import { links } from '@/content/home'

export function SiteFooter() {
  return (
    <footer className={`${container} mt-8 print:hidden`} id="contact">
      <div className="border-t border-line py-16">
        <p className={label}>Contact</p>
        <p className="mt-4 max-w-[30ch] text-2xl font-light leading-snug tracking-tight text-balance sm:text-3xl">
          If you&apos;re building something complicated and want it to feel calm, let&apos;s talk.
        </p>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <a
            className="text-lg transition-colors hover:text-accent"
            href="mailto:hire.tanishraj@gmail.com"
          >
            hire.tanishraj@gmail.com
          </a>
          <ul className="flex gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  className="transition-colors hover:text-fg"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-16 font-mono text-xs text-muted">© 2026 Tanish Raj · Abu Dhabi</p>
      </div>
    </footer>
  )
}
