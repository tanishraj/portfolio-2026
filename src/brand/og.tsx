import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import React from 'react'

import { signature } from '@/brand/signature'

export const ogSize = { width: 1200, height: 630 }

const fontDir = join(process.cwd(), 'node_modules/@fontsource')
const fonts = Promise.all([
  readFile(join(fontDir, 'manrope/files/manrope-latin-300-normal.woff')),
  readFile(join(fontDir, 'manrope/files/manrope-latin-400-normal.woff')),
  readFile(join(fontDir, 'geist-mono/files/geist-mono-latin-400-normal.woff')),
])

// Dark preview card in the site's own palette: eyebrow, title, one line, signature.
export async function renderCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  const [light, regular, mono] = await fonts

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#0d1013',
        backgroundImage:
          'radial-gradient(circle at 85% 0%, rgba(134,207,193,0.16), rgba(13,16,19,0) 55%)',
        color: '#e3e8ea',
        fontFamily: 'Manrope',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg fill="none" height="56" viewBox={signature.viewBox} width="56">
          <path
            d={signature.line}
            stroke="#e3e8ea"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path d={signature.crossbar} stroke="#f5b544" strokeLinecap="round" strokeWidth="2" />
        </svg>
        <span style={{ fontSize: 28, fontWeight: 400 }}>Tanish Raj</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span
          style={{
            fontFamily: 'Geist Mono',
            fontSize: 22,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#86cfc1',
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            fontSize: title.length > 40 ? 64 : 76,
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 30, fontWeight: 300, color: '#8a959b', maxWidth: 900 }}>
            {subtitle}
          </span>
        )}
      </div>

      <span style={{ fontFamily: 'Geist Mono', fontSize: 20, color: '#8a959b' }}>tanish.im</span>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Manrope', data: light, weight: 300, style: 'normal' },
        { name: 'Manrope', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  )
}
