// The answer stream between /api/ask and the Ask box: one JSON object per line.

export type AskEvent =
  | { type: 'block' }
  | { type: 'text'; text: string }
  | { type: 'cite'; title: string; href: string; quote: string }
  | { type: 'error'; message: string }
  | { type: 'done' }

export type Citation = { title: string; href: string; quote: string }
export type AnswerPart = { text: string; sources: Citation[] }

export const encodeEvent = (event: AskEvent) => `${JSON.stringify(event)}\n`

/** Splits a chunked NDJSON stream into events, keeping partial lines for later. */
export function createEventParser(onEvent: (event: AskEvent) => void) {
  let buffer = ''
  return (chunk: string) => {
    buffer += chunk
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) if (line.trim()) onEvent(JSON.parse(line) as AskEvent)
  }
}

/**
 * Folds events into answer parts. Each text block from the model is one part;
 * a cited block carries the sources it was drawn from.
 */
export function reduceAnswer(parts: AnswerPart[], event: AskEvent): AnswerPart[] {
  const last = parts.at(-1)
  switch (event.type) {
    case 'block':
      return [...parts, { text: '', sources: [] }]
    case 'text':
      if (!last) return [{ text: event.text, sources: [] }]
      return [...parts.slice(0, -1), { ...last, text: last.text + event.text }]
    case 'cite': {
      const source = { title: event.title, href: event.href, quote: event.quote }
      if (!last) return [{ text: '', sources: [source] }]
      if (last.sources.some((s) => s.href === source.href)) return parts
      return [...parts.slice(0, -1), { ...last, sources: [...last.sources, source] }]
    }
    default:
      return parts
  }
}
