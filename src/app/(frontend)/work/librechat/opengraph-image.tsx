import { ogSize, renderCard } from '@/brand/og'
import { getCaseStudy } from '@/content/case-studies'

export const alt = 'Case study by Tanish Raj'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  const study = getCaseStudy('librechat')
  return renderCard({
    eyebrow: study?.locked ? 'Case study · On request' : 'Case study',
    title: study?.title ?? 'Case study',
    subtitle: study?.locked ? undefined : study?.tagline,
  })
}
