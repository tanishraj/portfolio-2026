import { ogSize, renderCard } from '@/brand/og'
import { getCaseStudy } from '@/content/case-studies'

export const alt = 'Case study by Tanish Raj'
export const size = ogSize
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)
  return renderCard({
    eyebrow: study?.locked ? 'Case study · On request' : 'Case study',
    title: study?.title ?? 'Case study',
    subtitle: study?.locked ? undefined : study?.tagline,
  })
}
