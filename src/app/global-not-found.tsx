import type { Metadata } from 'next'
import { Albert_Sans, Geist_Mono } from 'next/font/google'
import React from 'react'

import { NotFoundContent } from '@/components/NotFoundContent'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

import './(frontend)/globals.css'

// The site has two root layouts (the site and the Payload admin), so an
// address that matches neither is answered here. It bypasses the layouts, so
// it brings its own fonts, theme and chrome, matching the site's.

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-albert-sans',
  display: 'swap',
})
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Page not found · Tanish Raj',
  description: 'This page doesn’t exist. The work is still here.',
  robots: { index: false },
}

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function GlobalNotFound() {
  return (
    <html
      className={`${albertSans.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div aria-hidden="true" className="ambient print:hidden" />
        <div className="relative z-10">
          <SiteHeader />
          <NotFoundContent />
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
