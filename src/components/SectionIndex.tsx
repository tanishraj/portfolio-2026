'use client'

import React, { useEffect, useState } from 'react'

// A pinned list of section links; the one in view is marked as current.
export function SectionIndex({ sections }: { sections: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="Sections">
      <ul className="grid gap-3">
        {sections.map(({ id, label }) => {
          const on = current === id
          return (
            <li key={id}>
              <a
                aria-current={on ? 'true' : undefined}
                className={`group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                  on ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
                href={`#${id}`}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    on
                      ? 'w-14 bg-highlight'
                      : 'w-6 bg-line-strong group-hover:w-10 group-hover:bg-fg'
                  }`}
                />
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
