'use client'

import React, { useEffect, useState } from 'react'

import { scrollToTop } from '@/components/SmoothScroll'

/**
 * A round button in the bottom-right corner, the same size as the header's
 * theme and menu buttons. It fades in once the first screen is behind the
 * visitor and glides back to the top.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setShown(window.scrollY > window.innerHeight * 1.2)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const onClick = (event: React.MouseEvent) => {
    scrollToTop()
    // From the keyboard, focus follows to the top so Tab carries on from there.
    if (event.detail === 0) {
      document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
    }
  }

  return (
    <button
      aria-hidden={!shown}
      aria-label="Back to top"
      className="back-to-top fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-20 grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-bg/80 text-muted backdrop-blur-md transition-[opacity,translate,color,border-color] duration-500 ease-(--ease-calm) hover:border-line-strong hover:text-fg data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-2 data-[shown=false]:opacity-0 motion-reduce:translate-y-0 motion-reduce:transition-opacity sm:right-8 sm:bottom-8 print:hidden"
      data-shown={shown}
      onClick={onClick}
      tabIndex={shown ? 0 : -1}
      type="button"
    >
      <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
        <path
          d="M8 13V3m-4 4 4-4 4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
      </svg>
    </button>
  )
}
