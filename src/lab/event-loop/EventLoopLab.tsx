'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { LoopRing } from './LoopRing'
import { scenarios } from './scenarios'
import { simulate, type Phase } from './simulator'

const STEP_MS = 1100
const label = 'font-mono text-xs uppercase tracking-[0.08em] text-muted'

const phaseName: Record<Phase, string> = {
  task: 'Running a task',
  microtask: 'Draining microtasks',
  render: 'Render opportunity',
  idle: 'Idle',
}

function Lane({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <section aria-label={title} className="min-w-0 rounded-2xl border border-line bg-surface p-4">
      <h3 className={label}>{title}</h3>
      <ul className="mt-3 flex min-h-16 flex-col-reverse sm:min-h-24 justify-end gap-1.5">
        {items.map((item, i) => (
          <li
            className={`truncate rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-300 ease-calm starting:-translate-y-1 starting:opacity-0 ${
              accent && i === items.length - 1
                ? 'border-accent/60 text-fg'
                : 'border-line text-muted'
            }`}
            key={`${item}-${i}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function EventLoopLab() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const scenario = scenarios.find((s) => s.id === scenarioId)!
  const frames = useMemo(() => simulate(scenario.program), [scenario])
  const frame = frames[index]
  const last = frames.length - 1
  const lines = scenario.source.split('\n')

  const go = useCallback((next: number) => setIndex(Math.max(0, Math.min(last, next))), [last])

  const choose = (id: string) => {
    setScenarioId(id)
    setIndex(0)
    setPlaying(false)
  }

  // Playback simply stops at the last frame; no state change needed.
  const running = playing && index < last

  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => setIndex((i) => i + 1), STEP_MS)
    return () => clearTimeout(timer)
  }, [running, index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea, select')) return
      if (event.key === 'ArrowRight') go(index + 1)
      else if (event.key === 'ArrowLeft') go(index - 1)
      else if (event.key === 'Home') go(0)
      else if (event.key === 'End') go(last)
      else return
      setPlaying(false)
      event.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, last])

  const button =
    'rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-current'

  return (
    <div className="mt-12 grid gap-4">
      <div aria-label="Puzzle" className="flex flex-wrap gap-2" role="group">
        {scenarios.map((s) => (
          <button
            aria-pressed={s.id === scenarioId}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              s.id === scenarioId
                ? 'border-accent text-fg'
                : 'border-line text-muted hover:border-line-strong hover:text-fg'
            }`}
            key={s.id}
            onClick={() => choose(s.id)}
            type="button"
          >
            {s.title}
          </button>
        ))}
      </div>
      <p className="text-lg font-light text-muted">{scenario.question}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <section
          aria-label="Code"
          className="min-w-0 rounded-2xl border border-line bg-surface py-4"
        >
          <pre className="overflow-x-auto font-mono text-[13px] leading-6">
            {lines.map((text, i) => {
              const current = frame.line === i + 1
              return (
                <div
                  aria-current={current ? 'step' : undefined}
                  className={`flex border-l-2 pr-4 transition-colors duration-300 ${
                    current ? 'border-accent bg-accent/10 text-fg' : 'border-transparent text-muted'
                  }`}
                  key={i}
                >
                  <span className="w-10 shrink-0 select-none pr-3 text-right opacity-50">
                    {i + 1}
                  </span>
                  <code>{text || ' '}</code>
                </div>
              )
            })}
          </pre>
        </section>

        <section
          aria-label="Event loop"
          className="relative grid aspect-square min-w-0 place-items-center rounded-2xl border border-line bg-surface"
        >
          <LoopRing phase={frame.phase} />
          <span className={`${label} absolute left-1/2 top-[8%] -translate-x-1/2`}>Task</span>
          <span className={`${label} absolute bottom-[18%] right-[6%]`}>Microtasks</span>
          <span className={`${label} absolute bottom-[18%] left-[6%]`}>Render</span>
          <p className="relative text-center text-sm">
            <span className="block text-accent">{phaseName[frame.phase]}</span>
            <span className="font-mono text-xs text-muted tabular-nums">
              step {index + 1} / {frames.length}
            </span>
          </p>
        </section>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className="min-h-12 max-w-[60ch] leading-relaxed"
          data-testid="step-note"
        >
          {frame.note}
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            className={button}
            disabled={index === 0}
            onClick={() => {
              setPlaying(false)
              go(index - 1)
            }}
            type="button"
          >
            Back
          </button>
          <button
            className={`${button} min-w-20 border-fg bg-fg text-bg hover:text-bg hover:opacity-90`}
            onClick={() => {
              if (index >= last) go(0)
              setPlaying(!running)
            }}
            type="button"
          >
            {running ? 'Pause' : index >= last ? 'Replay' : 'Play'}
          </button>
          <button
            className={button}
            disabled={index >= last}
            onClick={() => {
              setPlaying(false)
              go(index + 1)
            }}
            type="button"
          >
            Step
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <Lane accent items={frame.stack} title="Call stack" />
        <Lane items={frame.webApis} title="Web APIs" />
        <Lane accent items={frame.microtasks} title="Microtasks" />
        <Lane accent items={frame.tasks} title="Task queue" />
        <section
          aria-label="Console"
          className="col-span-2 min-w-0 rounded-2xl border border-line bg-bg p-4 lg:col-span-1"
        >
          <h3 className={label}>Console</h3>
          <ol className="mt-3 grid gap-1 font-mono text-xs" data-testid="console">
            {frame.console.map((line, i) => (
              <li className="transition-all duration-300 starting:opacity-0" key={`${line}-${i}`}>
                <span className="text-accent">›</span> {line}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="text-sm text-muted">
        Keyboard: ← and → step, Home and End jump to the start or the end.
      </p>
    </div>
  )
}
