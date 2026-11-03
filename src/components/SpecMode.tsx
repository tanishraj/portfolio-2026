'use client'

import React, { useEffect, useState } from 'react'

// "Spec mode": shows how the page is built. Press S, or use the nav toggle, to
// reveal the column grid and labels on elements that carry a data-spec note.
export function SpecMode() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    document.documentElement.toggleAttribute('data-spec-mode', on)
  }, [on])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]'))
        return
      if (event.key === 's' || event.key === 'S') setOn((v) => !v)
      if (event.key === 'Escape') setOn(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        aria-label="Spec mode: show how this page is built (S)"
        aria-pressed={on}
        className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors sm:flex ${
          on ? 'border-highlight text-highlight' : 'border-line text-muted hover:text-fg'
        }`}
        onClick={() => setOn((v) => !v)}
        title="Spec mode (S)"
        type="button"
      >
        <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
          <path
            d="M1 1h10v10H1zM4 1v10M8 1v10M1 4h10M1 8h10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        Spec
      </button>
      {on && (
        <div aria-hidden="true" className="spec-grid">
          <div className="mx-auto grid h-full w-full max-w-5xl grid-cols-4 gap-4 px-5 sm:grid-cols-12 sm:px-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <span className={i >= 4 ? 'hidden sm:block' : ''} key={i} />
            ))}
          </div>
          <p className="spec-legend">Spec mode · 12 columns · gap 16 · press S or Esc to close</p>
        </div>
      )}
    </>
  )
}
