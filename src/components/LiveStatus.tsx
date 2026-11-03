'use client'

import React, { useEffect, useState } from 'react'

const timeIn = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dubai',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// A small "someone is home" line: local time in Abu Dhabi and what I'm on now.
export function LiveStatus({ now }: { now: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(timeIn.format(new Date()))
    tick()
    const timer = setInterval(tick, 30_000)
    return () => clearInterval(timer)
  }, [])

  return (
    <p
      className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
      data-spec="status · Geist Mono 11 · +0.08em"
    >
      <span className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-highlight opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-highlight" />
        </span>
        Abu Dhabi
      </span>
      <span aria-hidden="true">·</span>
      <span className="tabular-nums" suppressHydrationWarning>
        {time ?? '--:--'} GST
      </span>
      <span aria-hidden="true">·</span>
      <span>
        Now: <span className="text-fg">{now}</span>
      </span>
    </p>
  )
}
