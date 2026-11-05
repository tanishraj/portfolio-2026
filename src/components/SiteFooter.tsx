import React from 'react'

import { CopyEmail } from '@/components/CopyEmail'
import { container, label } from '@/components/styles'
import { links } from '@/content/home'

export function SiteFooter() {
  return (
    <footer className={`${container} mt-16 print:hidden`} id="contact">
      <div className="border-t border-line py-14">
        <p className={label}>Contact</p>
        <p className="mt-4 max-w-[34ch] text-xl font-light leading-snug tracking-tight text-balance sm:text-2xl">
          Hiring for a senior frontend role, or building something complicated? Email me, I read
          everything.
        </p>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="text-lg transition-colors hover:text-highlight"
              href="mailto:hire.tanishraj@gmail.com"
            >
              hire.tanishraj@gmail.com
            </a>
            <CopyEmail email="hire.tanishraj@gmail.com" />
          </div>
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
      </div>
    </footer>
  )
}
