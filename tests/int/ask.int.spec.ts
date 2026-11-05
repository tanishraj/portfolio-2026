import { describe, expect, it } from 'vitest'

import { caseStudies } from '@/content/case-studies'
import { buildSources } from '@/lib/ask/corpus'
import { createEventParser, encodeEvent, reduceAnswer, type AskEvent } from '@/lib/ask/events'

describe('ask corpus', () => {
  const sources = buildSources()

  it('covers every case study, the About page and the CV, each linking to a real page', () => {
    const hrefs = sources.map((s) => s.href)
    for (const study of caseStudies) expect(hrefs).toContain(`/work/${study.slug}`)
    expect(hrefs).toEqual(expect.arrayContaining(['/#about', '/cv']))
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('never includes more than the public teaser of a protected study', () => {
    for (const study of caseStudies.filter((s) => s.locked)) {
      const source = sources.find((s) => s.href === `/work/${study.slug}`)!
      expect(source.text).toContain(study.summary)
      expect(source.text).toMatch(/private/)
      expect(source.text.length).toBeLessThan(600)
    }
  })

  it('is deterministic, so the prompt cache can hit', () => {
    expect(JSON.stringify(buildSources())).toBe(JSON.stringify(sources))
  })
})

describe('answer stream', () => {
  it('reassembles events split across arbitrary chunk boundaries', () => {
    const events: AskEvent[] = [
      { type: 'block' },
      { type: 'text', text: 'He built Anubhav.' },
      { type: 'done' },
    ]
    const wire = events.map(encodeEvent).join('')
    const received: AskEvent[] = []
    const feed = createEventParser((event) => received.push(event))
    for (let i = 0; i < wire.length; i += 7) feed(wire.slice(i, i + 7))
    expect(received).toEqual(events)
  })

  it('groups text and its citations into parts, without duplicate sources', () => {
    const events: AskEvent[] = [
      { type: 'block' },
      { type: 'text', text: 'Tanish is in Abu Dhabi. ' },
      { type: 'block' },
      { type: 'cite', title: 'Case study: Anubhav', href: '/work/anubhav', quote: 'seven roles' },
      { type: 'cite', title: 'Case study: Anubhav', href: '/work/anubhav', quote: 'seven roles' },
      { type: 'text', text: 'Anubhav has seven roles.' },
      { type: 'done' },
    ]
    const parts = events.reduce(reduceAnswer, [])
    expect(parts).toEqual([
      { text: 'Tanish is in Abu Dhabi. ', sources: [] },
      {
        text: 'Anubhav has seven roles.',
        sources: [{ title: 'Case study: Anubhav', href: '/work/anubhav', quote: 'seven roles' }],
      },
    ])
  })
})
