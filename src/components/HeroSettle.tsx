'use client'

import React, { useEffect, useState } from 'react'

// The hero's one moment: fragments of the kind of UI I build arrive scattered
// ("complicated") and settle into an aligned grid ("calm"). Hovering stirs them
// up again. With reduced motion they simply sit in the grid.

type Fragment = { key: string; chaos: string; node: React.ReactNode }

const pill = 'rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em]'

const fragments: Fragment[] = [
  {
    key: 'approve',
    chaos: 'translate(-38%, -46%) rotate(-14deg)',
    node: (
      <span className="rounded-full bg-highlight px-4 py-2 text-xs font-medium text-highlight-ink">
        Approve month
      </span>
    ),
  },
  {
    key: 'signed',
    chaos: 'translate(52%, -30%) rotate(18deg)',
    node: <span className={`${pill} border-accent/60 text-accent`}>✓ Signed · MR-2611</span>,
  },
  {
    key: 'field',
    chaos: 'translate(40%, 60%) rotate(-22deg)',
    node: (
      <span className="grid w-full gap-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
          Case ref
        </span>
        <span className="rounded-md border border-line-strong px-2 py-1.5 font-mono text-[11px]">
          IPD-20418
        </span>
      </span>
    ),
  },
  {
    key: 'notice',
    chaos: 'translate(-60%, 34%) rotate(9deg)',
    node: (
      <span className="grid gap-0.5 text-left">
        <span className="flex items-center gap-1.5 text-[11px]">
          <i className="size-1.5 rounded-full bg-highlight" /> New NMC notice
        </span>
        <span className="font-mono text-[9px] text-muted">emailed once · 07:21</span>
      </span>
    ),
  },
  {
    key: 'await',
    chaos: 'translate(10%, -70%) rotate(-28deg)',
    node: (
      <code className="font-mono text-[11px]">
        <span className="text-accent">await</span> null
      </code>
    ),
  },
  {
    key: 'bars',
    chaos: 'translate(70%, 18%) rotate(24deg)',
    node: (
      <span aria-hidden="true" className="flex h-8 items-end gap-1">
        {[40, 70, 55, 90, 65].map((h, i) => (
          <i
            className={`w-2 rounded-sm ${i === 3 ? 'bg-highlight' : 'bg-line-strong'}`}
            key={i}
            style={{ height: `${h}%` }}
          />
        ))}
      </span>
    ),
  },
  {
    key: 'toggle',
    chaos: 'translate(-70%, -6%) rotate(-32deg)',
    node: (
      <span className="flex items-center gap-2 text-[11px]">
        <span className="relative h-4 w-7 rounded-full bg-accent/70">
          <i className="absolute right-0.5 top-0.5 size-3 rounded-full bg-bg" />
        </span>
        Dark mode
      </span>
    ),
  },
  {
    key: 'token',
    chaos: 'translate(-20%, 72%) rotate(16deg)',
    node: (
      <span className="flex items-center gap-2 font-mono text-[10px] whitespace-nowrap">
        <i className="size-3 shrink-0 rounded-sm bg-highlight" /> --accent
      </span>
    ),
  },
  {
    key: 'status',
    chaos: 'translate(30%, 8%) rotate(-8deg)',
    node: (
      <span className="grid gap-0.5 font-mono text-[10px] text-muted">
        <span className="line-through">4.7 MB</span>
        <span className="text-highlight">189 KB</span>
      </span>
    ),
  },
]

export function HeroSettle() {
  const [calm, setCalm] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => setCalm(true), reduce ? 0 : 450)
    return () => clearTimeout(timer)
  }, [])

  return (
    <figure
      className="group relative mx-auto w-full max-w-md"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setCalm(false)}
      onPointerLeave={() => setCalm(true)}
    >
      <div
        aria-hidden="true"
        className="grid aspect-square grid-cols-3 gap-3 rounded-3xl border border-line bg-surface/70 p-4 backdrop-blur-sm sm:gap-4 sm:p-5"
        data-spec="3 × 3 grid · gap 16 · radius 24"
      >
        {fragments.map((fragment, i) => (
          <div
            className="settle grid place-items-center rounded-2xl border border-line bg-bg/80 p-2 text-center shadow-[0_1px_0_0_var(--line)]"
            key={fragment.key}
            style={{
              transform: calm ? 'none' : fragment.chaos,
              transitionDelay: calm ? `${i * 60}ms` : '0ms',
            }}
          >
            {fragment.node}
          </div>
        ))}
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        <span className={calm ? '' : 'text-highlight'}>Complicated</span>
        <span aria-hidden="true">→</span>
        <span className={calm ? 'text-highlight' : ''}>Calm</span>
        <span className="hidden normal-case tracking-normal opacity-70 sm:inline">
          · hover to undo
        </span>
      </figcaption>
    </figure>
  )
}
