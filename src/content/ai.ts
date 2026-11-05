// The AI row on the home page: how I use models day to day and what it buys.

export const aiLede =
  'Most of my day runs through Claude Code. I write the brief and the rules, the agent does the typing, and I review everything before it ships. One engineer now covers frontend, backend and tests at the pace a small team used to. Anubhav went from brief to production in ten days this way.'

export const loop = [
  { title: 'Brief', body: 'What it’s for, what done looks like.' },
  { title: 'Rules', body: 'Tokens, lint, CLAUDE.md in the repo.' },
  { title: 'Build', body: 'The agent types, in small steps.' },
  { title: 'Review', body: 'Every diff, as if from a new hire.' },
  { title: 'Prove', body: 'Tests in CI, in both themes.' },
]

export const payoff = [
  {
    title: 'Frontend',
    body: 'Components, states and motion built from a brief, inside the design tokens.',
  },
  {
    title: 'Backend',
    body: 'Payload collections, migrations and APIs drafted by the agent, proven by tests.',
  },
  {
    title: 'In the product',
    body: 'At Liquidity the assistant answers with our own components and live numbers.',
    href: '/work/librechat',
  },
]
