import React from 'react'

import { ledgerCols } from '@/components/styles'

// The home page's structure: a narrow label column that stays pinned while
// the content column scrolls. On phones the label sits above its content.
export function LedgerRow({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`grid scroll-mt-24 gap-4 ${ledgerCols} sm:gap-10`}
      id={id}
    >
      <h2
        className="self-start text-[19px] font-light tracking-[-0.01em] sm:sticky sm:top-24"
        id={`${id}-heading`}
      >
        <span aria-hidden="true" className="mb-3 block h-px w-7 bg-highlight" />
        {title}
      </h2>
      <div className="reveal min-w-0">{children}</div>
    </section>
  )
}
