import { ogSize, renderCard } from '@/brand/og'

export const alt = 'Tanish Raj, senior frontend engineer in Abu Dhabi'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderCard({
    eyebrow: 'Senior frontend engineer · Abu Dhabi',
    title: 'I build design systems and calm interfaces for complicated products.',
  })
}
