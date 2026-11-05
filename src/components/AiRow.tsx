import React from 'react'
import Link from 'next/link'

import { aiLede, loop, payoff } from '@/content/ai'

export function AiRow() {
  return (
    <div className="grid gap-10">
      <p className="max-w-[36rem] text-[19px] leading-[1.5] tracking-[-0.01em]">{aiLede}</p>

      <ol className="dim-siblings grid gap-x-6 gap-y-6 sm:grid-cols-5">
        {loop.map((step, i) => (
          <li
            className="relative border-t border-line-strong pt-4 before:absolute before:-top-[3px] before:left-0 before:size-1.5 before:rounded-full before:bg-highlight before:content-['']"
            key={step.title}
          >
            <span className="font-mono text-[11px] tabular-nums text-muted">0{i + 1}</span>
            <span className="mt-1 block text-[17px] leading-snug">{step.title}</span>
            <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">{step.body}</span>
          </li>
        ))}
      </ol>

      <ul className="grid gap-x-10 gap-y-5 border-t border-line pt-8 sm:grid-cols-3">
        {payoff.map((item) => {
          const inner = (
            <>
              <span className="block text-[17px] leading-snug transition-colors group-hover:text-highlight">
                {item.title}
              </span>
              <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">
                {item.body}
              </span>
            </>
          )
          return (
            <li key={item.title}>
              {item.href ? (
                <Link className="group block" href={item.href}>
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
