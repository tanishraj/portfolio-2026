import { readFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { siRakuten, siShell, siWellsfargo, type SimpleIcon } from 'simple-icons'

import type { BrandKey } from '@/components/BrandIcon'

// Full-colour company logos for the "Worked for" row and experience list.
// Wordmark files are inlined so their colours can be normalised: brand accents
// stay, and black or near-black ink becomes the current text colour so the mark
// reads on both themes. Heights are tuned per mark so letterforms match.

type Wordmark = {
  file: string
  /** Fills in the original that are ink, replaced by currentColor. */
  ink: string[]
  /** Rendered height in px that gives this mark the shared cap height. */
  height: number
}

type Symbol = { icon: SimpleIcon; label: string; height: number }

const wordmarks: Partial<Record<BrandKey, Wordmark>> = {
  liquidity: { file: 'liquidity.svg', ink: ['currentColor'], height: 18 },
  bsf: { file: 'bsf.svg', ink: ['#002A30', '#002a30'], height: 26 },
  cgi: { file: 'cgi.svg', ink: [], height: 24 },
  ola: { file: 'ola-electric.svg', ink: ['#000000', '#000'], height: 17 },
  thomsonreuters: { file: 'thomson-reuters.svg', ink: ['#404040'], height: 24 },
}

const symbols: Partial<Record<BrandKey, Symbol>> = {
  wellsfargo: { icon: siWellsfargo, label: 'Wells Fargo', height: 26 },
  rakuten: { icon: siRakuten, label: 'Rakuten', height: 24 },
  shell: { icon: siShell, label: 'Shell', height: 24 },
}

const cache = new Map<string, Promise<string>>()

async function loadSvg(mark: Wordmark): Promise<string> {
  const key = mark.file
  if (!cache.has(key)) {
    cache.set(
      key,
      readFile(path.join(process.cwd(), 'public/brand/logos', mark.file), 'utf8').then((raw) => {
        let svg = raw
          .replace(/<\?xml[^>]*>/g, '')
          .replace(/<!DOCTYPE[^>]*>/g, '')
          .replace(/<metadata[\s\S]*?<\/metadata>/g, '')
          .replace(/<svg([^>]*)\s(width|height)="[^"]*"/g, '<svg$1')
          .replace(/<svg([^>]*)\s(width|height)="[^"]*"/g, '<svg$1')
        for (const ink of mark.ink) {
          svg = svg.split(ink).join('currentColor')
        }
        return svg.replace(
          '<svg',
          '<svg aria-hidden="true" focusable="false" style="height:100%;width:auto;display:block"',
        )
      }),
    )
  }
  return cache.get(key)!
}

/** A company's logo in colour, sized to a shared cap height. */
export async function BrandLogo({
  name,
  label,
  scale = 1,
  showName = true,
}: {
  name: BrandKey
  label: string
  /** Multiplies the tuned heights, for smaller inline uses. */
  scale?: number
  /** For symbol marks, whether to print the company name beside the symbol. */
  showName?: boolean
}) {
  const word = wordmarks[name]
  if (word) {
    const svg = await loadSvg(word)
    return (
      <span
        aria-label={label}
        className="inline-block text-fg"
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        style={{ height: Math.round(word.height * scale) }}
      />
    )
  }

  const symbol = symbols[name]
  if (symbol) {
    const size = Math.round(symbol.height * scale)
    return (
      <span className="inline-flex items-center gap-2.5 text-fg">
        <svg
          aria-hidden={showName}
          aria-label={showName ? undefined : label}
          fill={`#${symbol.icon.hex}`}
          height={size}
          role={showName ? undefined : 'img'}
          viewBox="0 0 24 24"
          width={size}
        >
          <path d={symbol.icon.path} />
        </svg>
        {showName && <span style={{ fontSize: Math.round(17 * scale) }}>{label}</span>}
      </span>
    )
  }

  return <span className="text-fg">{label}</span>
}
