import React from 'react'

import { aiGroups, aiIntro, type AiIcon } from '@/content/ai'

const paths: Record<AiIcon, React.ReactNode> = {
  'design-system': (
    <>
      <rect height="7" rx="1.5" width="7" x="3.5" y="3.5" />
      <rect height="7" rx="1.5" width="7" x="13.5" y="3.5" />
      <rect height="7" rx="1.5" width="7" x="3.5" y="13.5" />
      <rect height="7" rx="1.5" strokeDasharray="2 2" width="7" x="13.5" y="13.5" />
    </>
  ),
  app: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5V16h0a2 2 0 0 1-2-2Z" />
      <path d="M8.5 10.5h2M13.5 10.5h2" />
    </>
  ),
  code: <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5l-3 14" />,
  thinking: (
    <>
      <path d="M9 18.5h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z" />
    </>
  ),
}

function Icon({ name }: { name: AiIcon }) {
  return (
    <span
      aria-hidden="true"
      className="glass-tile grid size-11 shrink-0 place-items-center rounded-xl"
    >
      <svg
        fill="none"
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        viewBox="0 0 24 24"
        width="20"
      >
        {paths[name]}
      </svg>
    </span>
  )
}

/** The AI row: an intro, then two groups of two items, each with an icon. */
export function AiRow() {
  return (
    <div>
      <p className="max-w-[46ch] pb-10 text-[22px] font-light leading-[1.5] tracking-[-0.01em]">
        {aiIntro}
      </p>
      <div className="divide-y divide-line border-t border-line">
        {aiGroups.map((group) => (
          <section className="py-10" key={group.title}>
            <h3 className="text-[26px] font-extralight leading-tight tracking-[-0.02em]">
              {group.title}
            </h3>
            <ul className="mt-8 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {group.items.map((item) => (
                <li className="flex gap-4" key={item.title}>
                  <Icon name={item.icon} />
                  <div className="min-w-0">
                    <h4 className="text-lg font-light leading-snug tracking-[-0.005em] text-fg">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
