'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

let active: Lenis | null = null

/** Back to the top of the page: a glide when smooth scrolling is on, else a jump. */
export function scrollToTop() {
  if (active) active.scrollTo(0)
  else window.scrollTo({ top: 0 })
}

/**
 * Smooth, inertia scrolling for mouse wheels and trackpads (Lenis). Touch and
 * keyboard scrolling stay native, and nothing changes when the visitor prefers
 * reduced motion.
 *
 * Links to a section on the current page glide there instead of jumping,
 * stopping short by the section's scroll-margin so it clears the header. The
 * logo glides back to the top of the home page. The skip link keeps its native
 * jump so keyboard focus moves into the page.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true, lerp: 0.104, stopInertiaOnNavigate: true })
    active = lenis

    // Capture phase, so this runs before Next's <Link> and can take the click.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest('a')
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
      if (url.hash === '#main') return

      if (url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
        if (!target) return
        event.preventDefault()
        lenis.scrollTo(target)
        history.pushState(null, '', url.hash)
      } else {
        event.preventDefault()
        lenis.scrollTo(0)
        history.pushState(null, '', url.pathname)
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      lenis.destroy()
      active = null
    }
  }, [])

  return null
}
