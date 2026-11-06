import { ogSize, renderCard } from '@/brand/og'

export const alt = 'Tanish Raj, senior frontend engineer in Abu Dhabi'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderCard({
    eyebrow: 'Senior frontend engineer · Abu Dhabi',
    title:
      'I build fast, accessible front ends, design systems from the ground up, and the systems underneath, shipped faster with AI.',
  })
}
