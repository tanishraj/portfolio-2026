import { describe, expect, it } from 'vitest'

import { scenarios } from '@/lab/event-loop/scenarios'
import { simulate } from '@/lab/event-loop/simulator'

// Runs a snippet in this real JavaScript engine and records its console output.
async function runForReal(source: string): Promise<string[]> {
  const output: string[] = []
  const fakeConsole = { log: (text: string) => output.push(text) }
  new Function('console', source)(fakeConsole)
  await new Promise((resolve) => setTimeout(resolve, 20))
  return output
}

describe('event loop simulator', () => {
  for (const scenario of scenarios) {
    it(`matches real JavaScript: ${scenario.title}`, async () => {
      const frames = simulate(scenario.program)
      expect(frames.at(-1)?.console).toEqual(await runForReal(scenario.source))
    })

    it(`only points at real lines: ${scenario.title}`, () => {
      const lineCount = scenario.source.split('\n').length
      for (const frame of simulate(scenario.program)) {
        if (frame.line !== null) {
          expect(frame.line).toBeGreaterThanOrEqual(1)
          expect(frame.line).toBeLessThanOrEqual(lineCount)
        }
      }
    })
  }

  it('starts with the script on the stack and ends idle with everything drained', () => {
    const frames = simulate(scenarios[0].program)
    expect(frames[0].stack).toEqual(['script'])
    const last = frames.at(-1)!
    expect(last.phase).toBe('idle')
    expect([last.stack, last.microtasks, last.tasks, last.webApis]).toEqual([[], [], [], []])
  })

  it('never starts a task while microtasks are waiting', () => {
    for (const scenario of scenarios) {
      const frames = simulate(scenario.program)
      const taskStarts = frames.filter((frame) => frame.note.includes('takes the oldest task'))
      expect(taskStarts.length).toBeGreaterThan(0)
      for (const frame of taskStarts) expect(frame.microtasks).toEqual([])
    }
  })
})
