'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import { scenarios } from './scenarios'
import { simulate } from './simulator'

const lanes = [
  { key: 'stack', label: 'Stack' },
  { key: 'microtasks', label: 'Microtasks' },
  { key: 'tasks', label: 'Tasks' },
] as const

// A tiny live specimen of the lab for the home page: the real simulator's
// frames for "promise vs. timeout", looping while visible. Static under
// reduced motion.
export function LoopSpecimen() {
  const frames = useMemo(() => simulate(scenarios[0].program), [])
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setInterval> | undefined
    const observer = new IntersectionObserver(([entry]) => {
      clearInterval(timer)
      if (entry.isIntersecting)
        timer = setInterval(() => setIndex((i) => (i + 1) % frames.length), 900)
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [frames.length])

  const frame = frames[index]

  return (
    <div aria-hidden="true" className="grid gap-2 font-mono text-[10px]" ref={ref}>
      {lanes.map((lane) => {
        const items = frame[lane.key]
        return (
          <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3" key={lane.key}>
            <span className="uppercase tracking-[0.08em] text-muted">{lane.label}</span>
            <span className="flex h-6 items-center gap-1.5 overflow-hidden rounded-md border border-line px-1.5">
              {items.map((item, i) => (
                <span
                  className={`truncate rounded px-1.5 py-0.5 transition-all duration-300 starting:opacity-0 ${
                    lane.key === 'stack' && i === items.length - 1
                      ? 'bg-highlight text-highlight-ink'
                      : 'bg-accent/15 text-accent'
                  }`}
                  key={`${item}-${i}`}
                >
                  {item}
                </span>
              ))}
            </span>
          </div>
        )
      })}
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3">
        <span className="uppercase tracking-[0.08em] text-muted">Console</span>
        <span className="truncate text-fg">
          {frame.console.length ? frame.console.map((line) => `› ${line}`).join('  ') : '·'}
        </span>
      </div>
    </div>
  )
}
