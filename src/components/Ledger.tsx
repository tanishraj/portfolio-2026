import React from 'react'

import { label } from '@/components/styles'

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
      className="grid scroll-mt-24 gap-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
      id={id}
    >
      <h2 className={`${label} self-start pt-1.5 sm:sticky sm:top-24`} id={`${id}-heading`}>
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
