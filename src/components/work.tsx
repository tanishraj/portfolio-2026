import Image from 'next/image'
import React from 'react'

import { BrandIcon, brandLabel, type BrandKey } from '@/components/BrandIcon'
import type { CaseStudy } from '@/content/case-studies'

// Small building blocks shared by every home layout.

/** Screenshot in a quiet browser frame; a hatched panel for protected work. */
export function StudyCover({
  study,
  priority = false,
  className = '',
}: {
  study: CaseStudy
  priority?: boolean
  className?: string
}) {
  if (!study.cover) {
    return (
      <div
        className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl border border-line bg-[repeating-linear-gradient(135deg,var(--surface)_0_10px,var(--surface-raised)_10px_20px)] ${className}`}
      >
        <span className="flex flex-col items-center gap-3 text-muted">
          <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
            <rect
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              width="14"
              x="5"
              y="10.5"
            />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-[0.08em]">Shared with a code</span>
        </span>
      </div>
    )
  }
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface ${className}`}>
      <div aria-hidden="true" className="flex gap-1.5 border-b border-line px-3 py-2">
        <i className="size-2 rounded-full bg-line" />
        <i className="size-2 rounded-full bg-line" />
        <i className="size-2 rounded-full bg-line" />
      </div>
      <Image
        alt={study.cover.alt}
        className="aspect-[16/10] w-full object-cover object-top"
        height={900}
        priority={priority}
        sizes="(min-width: 1024px) 40rem, 100vw"
        src={study.cover.src}
        width={1440}
      />
    </div>
  )
}

/** Two or three headline facts, with the first in the highlight colour. */
export function GlanceChips({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          className={`rounded-full border px-3 py-1 font-mono text-xs tabular-nums ${
            i === 0 ? 'border-highlight/50 text-highlight' : 'border-line text-muted'
          }`}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Stack as a compact row of brand marks; names show on hover and to screen readers. */
export function StackIcons({ items, size = 16 }: { items?: BrandKey[]; size?: number }) {
  if (!items?.length) return null
  return (
    <ul aria-label="Built with" className="flex flex-wrap items-center gap-3 text-muted">
      {items.map((key) => (
        <li className="transition-colors hover:text-fg" key={key} title={brandLabel(key)}>
          <BrandIcon name={key} size={size} title />
        </li>
      ))}
    </ul>
  )
}
