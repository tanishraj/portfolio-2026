'use client'

import React from 'react'

type Theme = 'light' | 'dark'

function resolvedTheme(): Theme {
  const explicit = document.documentElement.dataset.theme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeToggle() {
  const toggle = () => {
    const next: Theme = resolvedTheme() === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }

  return (
    <button
      aria-label="Switch between light and dark theme"
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
      onClick={toggle}
      type="button"
    >
      <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5Z" fill="currentColor" />
      </svg>
    </button>
  )
}
