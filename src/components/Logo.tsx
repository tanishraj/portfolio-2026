import React from 'react'

import { signature } from '@/brand/signature'

type Props = {
  size?: number
  className?: string
}

// Draws itself once on first paint (see .signature in globals.css).
export function Logo({ size = 24, className = '' }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={`signature ${className}`}
      fill="none"
      height={size}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox={signature.viewBox}
      width={size}
    >
      <path d={signature.line} pathLength={1} stroke="currentColor" />
      <path
        className="signature-crossbar"
        d={signature.crossbar}
        pathLength={1}
        stroke="var(--highlight)"
      />
    </svg>
  )
}
