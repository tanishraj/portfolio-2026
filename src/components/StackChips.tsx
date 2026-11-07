import React from 'react'

import { stack } from '@/content/home'

/** The Stack row: each area's heading, then its tools as chips. */
export function StackChips() {
  return (
    <div className="divide-y divide-line border-t border-line">
      {stack.map((group) => (
        <section className="py-7" key={group.heading}>
          <h3 className="text-[20px] font-light text-fg">{group.heading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <li
                className="rounded-full border border-line-strong/50 bg-line/35 px-3.5 py-1.5 text-[15px] leading-snug text-fg"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
