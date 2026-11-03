import type { Metadata } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { siteUrl } from '@/lib/site'

import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Tanish Raj · Senior Frontend Engineer', template: '%s · Tanish Raj' },
  description:
    'Senior frontend engineer in Abu Dhabi. Design systems and calm interfaces for banking, credit, and medical training.',
  openGraph: { type: 'website', siteName: 'Tanish Raj', locale: 'en' },
  twitter: { card: 'summary_large_image' },
}

// Applies a saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${manrope.variable} ${geistMono.variable}`}
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
      </body>
    </html>
  )
}
