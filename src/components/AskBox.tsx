'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { createEventParser, reduceAnswer, type AnswerPart } from '@/lib/ask/events'

const suggestions = [
  'What has he built for medical colleges?',
  'How does he use AI in his work?',
  'What’s his experience with design systems?',
]

type Status = 'idle' | 'asking' | 'done' | 'error'

export function AskBox() {
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState('')
  const [parts, setParts] = useState<AnswerPart[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const abortRef = useRef<AbortController | null>(null)

  const ask = async (text: string) => {
    const q = text.trim()
    if (q.length < 3 || status === 'asking') return
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setAsked(q)
    setParts([])
    setError('')
    setStatus('asking')

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error ?? 'Something went wrong. Try again.')
      }

      let failed = ''
      const feed = createEventParser((event) => {
        if (event.type === 'error') failed = event.message
        setParts((current) => reduceAnswer(current, event))
      })
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        feed(value)
      }
      if (failed) {
        setError(failed)
        setStatus('error')
      } else {
        setStatus('done')
      }
    } catch (err) {
      if (controller.signal.aborted) return
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
      setStatus('error')
    }
  }

  const sources = [
    ...new Map(parts.flatMap((part) => part.sources).map((s) => [s.href, s])).values(),
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          void ask(question)
        }}
      >
        <label className="sr-only" htmlFor="ask-question">
          Your question
        </label>
        <input
          className="min-w-0 flex-1 rounded-full border border-line-strong bg-bg px-5 py-3 placeholder:text-muted focus:border-accent"
          id="ask-question"
          maxLength={300}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask anything about my work…"
          value={question}
        />
        <button
          className="rounded-full bg-highlight px-6 py-3 text-sm font-medium text-highlight-ink transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={status === 'asking' || question.trim().length < 3}
          type="submit"
        >
          {status === 'asking' ? 'Thinking…' : 'Ask'}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg disabled:opacity-50"
            disabled={status === 'asking'}
            key={suggestion}
            onClick={() => {
              setQuestion(suggestion)
              void ask(suggestion)
            }}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {status !== 'idle' && (
        <div
          aria-busy={status === 'asking'}
          aria-live="polite"
          className="mt-8 border-t border-line pt-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{asked}</p>
          <div className="mt-4 max-w-[65ch] leading-relaxed" data-testid="ask-answer">
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                {part.text}
                {part.sources.map((source) => (
                  <Link
                    className="mx-0.5 inline-block rounded-full border border-line px-2 align-[1px] font-mono text-[10px] text-accent no-underline transition-colors hover:border-accent"
                    href={source.href}
                    key={source.href}
                    title={`“${source.quote.trim()}”`}
                  >
                    {source.title.replace(/^Case study: /, '')}
                  </Link>
                ))}
              </React.Fragment>
            ))}
            {status === 'asking' && parts.every((part) => !part.text) && (
              <span className="text-muted">Reading my case studies…</span>
            )}
          </div>
          {error && (
            <p className="mt-4 text-sm text-accent" role="alert">
              {error}
            </p>
          )}
          {status === 'done' && sources.length > 0 && (
            <p className="mt-6 text-sm text-muted">
              Sources:{' '}
              {sources.map((source, index) => (
                <React.Fragment key={source.href}>
                  {index > 0 && ' · '}
                  <Link
                    className="underline decoration-line-strong underline-offset-4 hover:text-fg"
                    href={source.href}
                  >
                    {source.title}
                  </Link>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Answers come only from this site and cite their sources. Questions are logged so I can
        improve them. Powered by Claude.
      </p>
    </div>
  )
}
