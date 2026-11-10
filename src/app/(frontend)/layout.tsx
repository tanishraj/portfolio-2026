import type { Metadata } from 'next'
import { Albert_Sans, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

import { BackToTop } from '@/components/BackToTop'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { siteUrl } from '@/lib/site'

import './globals.css'

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-albert-sans',
  display: 'swap',
})
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Tanish Raj · Senior Frontend Engineer', template: '%s · Tanish Raj' },
  description:
    'Senior frontend engineer in Abu Dhabi. Ten years of design systems and interfaces for banking, energy, EVs and legal, the backends behind them, and AI that uses both.',
  openGraph: { type: 'website', siteName: 'Tanish Raj', locale: 'en' },
  twitter: { card: 'summary_large_image' },
}

// Applies a saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${albertSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div aria-hidden="true" className="ambient print:hidden" />
        <a
          className="sr-only print:hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
          href="#main"
        >
          Skip to content
        </a>
        <div className="relative z-10">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <BackToTop />
        <SmoothScroll />
      </body>
    </html>
  )
}
