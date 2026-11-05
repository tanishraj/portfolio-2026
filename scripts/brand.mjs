// Renders the signature mark into static brand assets.
// Run with `pnpm brand` after changing src/brand/signature.ts.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const source = await fs.readFile(path.join(root, 'src/brand/signature.ts'), 'utf8')
const pick = (key) => source.match(new RegExp(`${key}: '([^']+)'`))[1]
const line = pick('line')
const crossbar = pick('crossbar')

const ink = '#e3e8ea'
const accent = '#f5b544' // the marigold highlight, as in the site's dark theme
const tile = '#0d1013'

// A dark rounded tile reads on every tab bar and home screen, light or dark.
const tileSvg = ({ size, radius, inset, stroke }) => {
  const scale = (size - inset * 2) / 32
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${tile}"/>
  <g transform="translate(${inset} ${inset}) scale(${scale})" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="${stroke}">
    <path d="${line}" stroke="${ink}"/>
    <path d="${crossbar}" stroke="${accent}"/>
  </g>
</svg>
`
}

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9">
  <path d="${line}" stroke="currentColor"/>
  <path d="${crossbar}" stroke="${accent}"/>
</svg>
`

const write = (file, data) => fs.writeFile(path.join(root, file), data)

await write('src/app/(frontend)/icon.svg', tileSvg({ size: 32, radius: 7, inset: 1, stroke: 2.6 }))
await write('public/brand/signature.svg', markSvg)
await write(
  'src/app/(frontend)/apple-icon.png',
  await sharp(Buffer.from(tileSvg({ size: 180, radius: 0, inset: 30, stroke: 2.2 })))
    .png()
    .toBuffer(),
)
await write(
  'public/brand/avatar-512.png',
  await sharp(Buffer.from(tileSvg({ size: 512, radius: 0, inset: 96, stroke: 2.1 })))
    .png()
    .toBuffer(),
)

console.log('Brand assets written.')
