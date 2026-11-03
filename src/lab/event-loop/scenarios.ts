import type { Op } from './simulator'

export type Scenario = {
  id: string
  title: string
  question: string
  source: string
  program: Op[]
}

// Each program mirrors its source line by line. The int test runs the source
// for real and fails if the two ever disagree.
export const scenarios: Scenario[] = [
  {
    id: 'promise-vs-timeout',
    title: 'Promise vs. timeout',
    question: 'Both are “immediate”. Which one logs first?',
    source: `console.log('start')
setTimeout(() => {
  console.log('timeout')
}, 0)
Promise.resolve().then(() => {
  console.log('promise')
})
console.log('end')`,
    program: [
      { kind: 'log', text: 'start', line: 1 },
      {
        kind: 'timeout',
        label: 'timeout callback',
        line: 2,
        body: [{ kind: 'log', text: 'timeout', line: 3 }],
      },
      {
        kind: 'then',
        label: 'then callback',
        line: 5,
        body: [{ kind: 'log', text: 'promise', line: 6 }],
      },
      { kind: 'log', text: 'end', line: 8 },
    ],
  },
  {
    id: 'async-await',
    title: 'async / await',
    question: 'Where does the code after await actually run?',
    source: `async function load() {
  console.log('load: start')
  await null
  console.log('load: resumed')
}

console.log('script start')
setTimeout(() => {
  console.log('timeout')
}, 0)
load()
console.log('script end')`,
    program: [
      { kind: 'log', text: 'script start', line: 7 },
      {
        kind: 'timeout',
        label: 'timeout callback',
        line: 8,
        body: [{ kind: 'log', text: 'timeout', line: 9 }],
      },
      {
        kind: 'call',
        name: 'load',
        line: 11,
        body: [
          { kind: 'log', text: 'load: start', line: 2 },
          { kind: 'await', line: 3 },
          { kind: 'log', text: 'load: resumed', line: 4 },
        ],
      },
      { kind: 'log', text: 'script end', line: 12 },
    ],
  },
  {
    id: 'nested-microtasks',
    title: 'Nested microtasks',
    question: 'A microtask queues another one. Does a timer get in between?',
    source: `setTimeout(() => {
  console.log('timeout 1')
}, 0)
Promise.resolve().then(() => {
  console.log('promise 1')
  Promise.resolve().then(() => {
    console.log('promise 2')
  })
})
setTimeout(() => {
  console.log('timeout 2')
}, 0)`,
    program: [
      {
        kind: 'timeout',
        label: 'timeout 1 callback',
        line: 1,
        body: [{ kind: 'log', text: 'timeout 1', line: 2 }],
      },
      {
        kind: 'then',
        label: 'outer then',
        line: 4,
        body: [
          { kind: 'log', text: 'promise 1', line: 5 },
          {
            kind: 'then',
            label: 'inner then',
            line: 6,
            body: [{ kind: 'log', text: 'promise 2', line: 7 }],
          },
        ],
      },
      {
        kind: 'timeout',
        label: 'timeout 2 callback',
        line: 10,
        body: [{ kind: 'log', text: 'timeout 2', line: 11 }],
      },
    ],
  },
]
