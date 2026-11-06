import React from 'react'

import { ledgerCols } from '@/components/styles'

// The home page's structure: a narrow label column that stays pinned while
// the content column scrolls. On phones the label sits above its content.
export function LedgerRow({
  id,
  title,
  children,
  reveal = true,
}: {
  id: string
  title: string
  children: React.ReactNode
  /** Rows already on screen at load shouldn't animate in. */
  reveal?: boolean
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`grid scroll-mt-28 gap-4 ${ledgerCols} sm:gap-10`}
      id={id}
    >
      <h2
        className="flex items-center gap-3 self-start text-[17px] font-normal text-muted sm:sticky sm:top-28"
        id={`${id}-heading`}
      >
        <span aria-hidden="true" className="h-[1.1em] w-px shrink-0 bg-highlight" />
        {title}
      </h2>
      <div className={reveal ? 'reveal min-w-0' : 'min-w-0'}>{children}</div>
    </section>
  )
}
