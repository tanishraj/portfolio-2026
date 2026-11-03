// A small model of the browser event loop. A program is a list of ops that
// mirrors a real snippet line by line; simulate() turns it into frames.
// tests/int/event-loop.int.spec.ts runs each real snippet in Node and checks
// the simulator prints the same console output, in the same order.

export type Op =
  | { kind: 'log'; text: string; line: number }
  | { kind: 'timeout'; label: string; line: number; body: Op[] }
  | { kind: 'then'; label: string; line: number; body: Op[] }
  | { kind: 'call'; name: string; line: number; body: Op[] }
  | { kind: 'await'; line: number }

export type Phase = 'task' | 'microtask' | 'render' | 'idle'

export type Frame = {
  stack: string[]
  webApis: string[]
  microtasks: string[]
  tasks: string[]
  console: string[]
  phase: Phase
  line: number | null
  note: string
}

type Job = { label: string; body: Op[]; line: number; frame: string; fn?: string }

export function simulate(program: Op[]): Frame[] {
  const frames: Frame[] = []
  const stack: string[] = []
  const webApis: string[] = []
  const microtasks: Job[] = []
  const tasks: Job[] = []
  const output: string[] = []
  let phase: Phase = 'task'

  const snap = (note: string, line: number | null) => {
    frames.push({
      stack: [...stack],
      webApis: [...webApis],
      microtasks: microtasks.map((job) => job.label),
      tasks: tasks.map((job) => job.label),
      console: [...output],
      phase,
      line,
      note,
    })
  }

  // Runs ops on the current stack. Inside an async function, `await` queues
  // the rest of the body as a microtask and returns early.
  const run = (ops: Op[], fn?: string) => {
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i]
      switch (op.kind) {
        case 'log':
          output.push(op.text)
          snap(`console.log prints “${op.text}”.`, op.line)
          break
        case 'timeout':
          webApis.push(op.label)
          snap('setTimeout hands the callback to the browser’s timer and moves on.', op.line)
          webApis.splice(webApis.indexOf(op.label), 1)
          tasks.push({ label: op.label, body: op.body, line: op.line, frame: op.label })
          snap(
            'The 0 ms timer is done, but its callback can’t run yet: it waits in the task queue.',
            op.line,
          )
          break
        case 'then':
          microtasks.push({ label: op.label, body: op.body, line: op.line, frame: op.label })
          snap(
            'The promise is already resolved, so .then queues its callback as a microtask.',
            op.line,
          )
          break
        case 'call':
          stack.push(`${op.name}()`)
          snap(`Calling ${op.name}() pushes it onto the call stack.`, op.line)
          run(op.body, op.name)
          stack.pop()
          snap(`${op.name}() returns, so it leaves the stack.`, op.line)
          break
        case 'await': {
          const name = fn ?? 'function'
          microtasks.push({
            label: `${name}() resumes`,
            body: ops.slice(i + 1),
            line: op.line,
            frame: `${name}() (resumed)`,
            fn: name,
          })
          snap(
            `await pauses ${name}(). The rest of it is queued as a microtask, and control goes back to the caller.`,
            op.line,
          )
          return
        }
      }
    }
  }

  const runJob = (job: Job, kind: 'task' | 'microtask') => {
    phase = kind
    stack.push(job.frame)
    snap(
      kind === 'task'
        ? `The stack is empty, so the event loop takes the oldest task: ${job.label}.`
        : `Before anything else, the loop runs the oldest microtask: ${job.label}.`,
      job.line,
    )
    run(job.body, job.fn)
    stack.pop()
    snap(`${job.label} is done. The call stack is empty again.`, null)
  }

  const drainMicrotasks = () => {
    while (microtasks.length) runJob(microtasks.shift()!, 'microtask')
  }

  stack.push('script')
  snap('The whole script runs first, as one task.', null)
  run(program)
  stack.pop()
  snap('The script has finished. The call stack is empty.', null)

  drainMicrotasks()
  while (tasks.length) {
    phase = 'render'
    snap('Microtasks are drained. The browser may paint now, before the next task.', null)
    runJob(tasks.shift()!, 'task')
    drainMicrotasks()
  }

  phase = 'idle'
  snap('Nothing is left to run. The loop waits for new work.', null)
  return frames
}
