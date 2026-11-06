'use client'

import React, { useState } from 'react'

export function CopyEmail({
  email,
  variant = 'pill',
}: {
  email: string
  variant?: 'pill' | 'icon'
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  if (variant === 'icon') {
    return (
      <button
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        className="inline-flex size-7 cursor-pointer items-center justify-center text-muted transition-colors hover:text-highlight"
        onClick={copy}
        title="Copy email"
        type="button"
      >
        {copied ? (
          <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
            <path
              d="M3 8.5l3 3 7-7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        ) : (
          <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
            <rect
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.3"
              width="9"
              x="5.5"
              y="5.5"
            />
            <path
              d="M10.5 5.5v-2a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        )}
        <span aria-live="polite" className="sr-only">
          {copied ? 'Copied' : ''}
        </span>
      </button>
    )
  }

  return (
    <button
      className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-highlight hover:text-highlight"
      onClick={copy}
      type="button"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}
