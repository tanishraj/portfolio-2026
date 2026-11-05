import React from 'react'
import Link from 'next/link'

import { aiLede, loop, practices, productLede, productSnippet } from '@/content/ai'

import { label } from './styles'

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-8">
      <h3 className={label}>{title}</h3>
      {children}
    </div>
  )
}

export function AiRow() {
  return (
    <div className="grid gap-14">
      <p className="max-w-[34rem] text-[19px] leading-[1.5] tracking-[-0.01em]">{aiLede}</p>

      <Part title="Day to day">
        <ol className="dim-siblings mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-5">
          {loop.map((step, i) => (
            <li
              className="relative border-t border-line-strong pt-5 before:absolute before:-top-[3px] before:left-0 before:size-1.5 before:rounded-full before:bg-highlight before:content-['']"
              key={step.title}
            >
              <span className="font-mono text-[11px] tabular-nums text-muted">0{i + 1}</span>
              <span className="mt-1 block text-[17px] leading-snug">{step.title}</span>
              <span className="mt-2 block text-[15px] leading-relaxed text-muted">{step.body}</span>
            </li>
          ))}
        </ol>
      </Part>

      <Part title="In the product">
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <div>
            <p className="text-[17px] leading-relaxed text-muted">{productLede}</p>
            <Link
              className="mt-5 inline-block text-[15px] underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-highlight"
              href="/work/librechat"
            >
              The case study, on request
            </Link>
          </div>
          <pre
            aria-label="How a tool result becomes a component, in outline"
            className="min-w-0 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-[13px] leading-6 text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            role="region"
            tabIndex={0}
          >
            {productSnippet.map((line, i) => (
              <span className={`block ${line.strong ? 'text-fg' : ''}`} key={i}>
                {line.text || ' '}
              </span>
            ))}
          </pre>
        </div>
      </Part>

      <Part title="Keeping it honest">
        <ol className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {practices.map((item, i) => (
            <li className="grid grid-cols-[2rem_minmax(0,1fr)]" key={item.title}>
              <span className="pt-0.5 font-mono text-xs tabular-nums text-highlight">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="block text-[17px] leading-snug">{item.title}</span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">
                  {item.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Part>
    </div>
  )
}
