import React from 'react'

import { CopyEmail } from '@/components/CopyEmail'
import { container, ledgerCols } from '@/components/styles'
import { links } from '@/content/home'
import { cvPdfPath, person } from '@/lib/site'

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="text-muted transition-colors group-hover:text-highlight"
      fill="none"
      height="11"
      viewBox="0 0 12 12"
      width="11"
    >
      <path
        d="M3.5 8.5l5-5M4.5 3.5h4v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
      <dt className="text-[15px] text-muted">{label}</dt>
      <dd className="min-w-0 text-[17px] text-fg">{children}</dd>
    </div>
  )
}

const linkClass =
  'group inline-flex max-w-full items-center gap-2 underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-highlight hover:decoration-highlight'

/** Contact, at the foot of every page: a lead line, availability, then one row per way in. */
export function SiteFooter() {
  return (
    <footer className={`${container} mt-16 print:hidden`} id="contact">
      <div className={`grid gap-4 border-t border-line pb-16 pt-14 sm:gap-10 ${ledgerCols}`}>
        <h2 className="flex items-center gap-3 self-start text-[17px] font-normal text-muted">
          <span aria-hidden="true" className="h-[1.1em] w-px shrink-0 bg-highlight" />
          Contact
        </h2>
        <div className="min-w-0">
          <p className="max-w-[34ch] text-[22px] font-light leading-[1.5] tracking-[-0.01em] text-balance">
            Hiring for a senior frontend role, or building something complicated? Email me, I read
            everything.
          </p>
          <p className="mt-5 flex items-center gap-3 text-[15px] text-muted">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-highlight opacity-70 motion-reduce:animate-none" />
              <span className="relative size-1.5 rounded-full bg-highlight" />
            </span>
            Open to senior frontend roles in the UAE
          </p>

          <dl className="mt-10 border-t border-line">
            <Row label="Email">
              <span className="inline-flex flex-wrap items-center gap-1.5">
                <a className={linkClass} href={`mailto:${person.email}`}>
                  {person.email}
                </a>
                <CopyEmail email={person.email} variant="icon" />
              </span>
            </Row>
            {links.map((link) => (
              <Row key={link.label} label={link.label}>
                <a className={linkClass} href={link.href} rel="noopener noreferrer" target="_blank">
                  <span className="min-w-0 truncate">
                    {link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </span>
                  <ExternalIcon />
                </a>
              </Row>
            ))}
            <Row label="CV">
              <a className={linkClass} download href={cvPdfPath}>
                Download PDF
              </a>
            </Row>
            <Row label="Based in">{person.location}</Row>
          </dl>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <p>Designed with intention. Built with code and AI.</p>
      </div>
    </footer>
  )
}
