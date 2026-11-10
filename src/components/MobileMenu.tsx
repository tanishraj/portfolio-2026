'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CopyEmail } from '@/components/CopyEmail'
import { buttonLabel, outlineButton } from '@/components/styles'
import { cvPdfPath, person } from '@/lib/site'

type Item = { label: string; href: string }

/** How long the sheet takes to leave; matches `sheet-out` in globals.css. */
const CLOSE_MS = 420

/**
 * The phone navigation: a round button beside the theme toggle whose two lines
 * fold into a cross, opening a full-screen sheet with the site's sections set
 * large, like the Work list. Hidden from the `sm` breakpoint up, where the
 * links sit inline in the header.
 */
export function MobileMenu({ items, active }: { items: Item[]; active: string | null }) {
  const [open, setOpen] = useState(false)
  // True while the sheet plays its way out; it stays mounted until then.
  const [closing, setClosing] = useState(false)
  const pathname = usePathname()
  const button = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const close = useCallback((returnFocus = false) => {
    if (returnFocus) button.current?.focus()
    const instant =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(min-width: 640px)').matches
    if (instant) {
      setOpen(false)
      return
    }
    setClosing(true)
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, CLOSE_MS)
  }, [])

  const reopen = () => {
    window.clearTimeout(closeTimer.current)
    setClosing(false)
    setOpen(true)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // A new page always starts with the menu closed. A close already playing
  // carries on over the new page.
  const [shownFor, setShownFor] = useState(pathname)
  if (shownFor !== pathname) {
    setShownFor(pathname)
    if (!closing) setOpen(false)
  }

  const shown = open && !closing

  // While the menu is up: lock the page, trap focus, listen for Escape. This
  // ends as soon as a close starts, so a section link can scroll the page
  // while the sheet fades over it.
  useEffect(() => {
    if (!shown) return
    const root = document.documentElement
    root.dataset.menuOpen = 'true'
    // Move focus into the sheet, onto its first link.
    sheet.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close(true)
        return
      }
      if (event.key !== 'Tab' || !sheet.current || !button.current) return
      // Keep Tab inside the menu button and the sheet while it is open.
      const focusable = [
        button.current,
        ...sheet.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    // Turning a tablet or widening the window past the breakpoint closes it.
    const wide = window.matchMedia('(min-width: 640px)')
    const onWide = () => wide.matches && close()

    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      delete root.dataset.menuOpen
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [shown, close])

  return (
    <>
      <button
        aria-controls="mobile-menu"
        aria-expanded={shown}
        aria-label={shown ? 'Close menu' : 'Open menu'}
        className="menu-toggle relative grid size-10 cursor-pointer place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-line-strong sm:hidden"
        data-open={shown}
        onClick={() => (shown ? close() : reopen())}
        ref={button}
        type="button"
      >
        <span aria-hidden="true" className="menu-lines">
          <span />
          <span />
        </span>
      </button>

      <div
        aria-label="Menu"
        aria-modal="true"
        className="mobile-sheet fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain bg-bg px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-28 sm:hidden"
        data-closing={closing || undefined}
        data-open={open}
        hidden={!open}
        id="mobile-menu"
        ref={sheet}
        role="dialog"
      >
        <nav aria-label="Main">
          <ol className="border-t border-line">
            {items.map((item, i) => {
              const current = item.href.endsWith(`#${active}`)
              return (
                <li
                  className="sheet-item border-b border-line"
                  key={item.label}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <Link
                    aria-current={current ? 'location' : undefined}
                    className={`group flex items-baseline gap-5 py-5 transition-colors ${current ? 'text-highlight' : 'text-fg'}`}
                    href={item.href}
                    onClick={() => close()}
                  >
                    <span className="w-6 text-[13px] tabular-nums text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[40px] font-extralight leading-none tracking-[-0.03em]">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto self-center text-muted transition-transform duration-300 group-active:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </nav>

        <div
          className="sheet-item mt-auto pt-12"
          style={{ '--i': items.length } as React.CSSProperties}
        >
          <p className="flex items-center gap-3 text-[15px] text-muted">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-highlight opacity-70 motion-reduce:animate-none" />
              <span className="relative size-1.5 rounded-full bg-highlight" />
            </span>
            Open to senior frontend opportunities in the UAE
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <CopyEmail email={person.email} variant="button" />
            <a className={`group/cv ${outlineButton} text-fg`} download href={cvPdfPath}>
              <span className={buttonLabel}>Download CV</span>
              <svg
                aria-hidden="true"
                className="text-muted transition-transform duration-300 group-hover/cv:translate-y-0.5 group-hover/cv:text-highlight motion-reduce:transition-none"
                fill="none"
                height="14"
                viewBox="0 0 16 16"
                width="14"
              >
                <path
                  d="M8 2.25v8.5M4.5 7.25 8 10.75 11.5 7.25M2.5 13.75h11"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
