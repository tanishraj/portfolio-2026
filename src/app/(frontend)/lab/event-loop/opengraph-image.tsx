import { ogSize, renderCard } from '@/brand/og'

export const alt = 'The event loop, drawn: an interactive lab by Tanish Raj'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderCard({
    eyebrow: 'Lab · Interactive',
    title: 'The event loop, drawn.',
    subtitle: 'Step through promises, timers and async/await.',
  })
}
