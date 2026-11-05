// The AI row on the home page: how I work with models day to day, how they
// sit inside the product, and the habits that keep the output trustworthy.

export const aiLede =
  'I build with models every day. The part I care about is where they get the final say, and where they don’t.'

export const loop = [
  {
    title: 'Brief',
    body: 'Before any code, a short brief. Who it’s for, what done looks like, what it must never do.',
  },
  {
    title: 'Rules',
    body: 'Design tokens, lint and a CLAUDE.md the agent reads first. The rules live in the repo, not in my head.',
  },
  {
    title: 'Build',
    body: 'Claude Code does most of the typing. I steer in small steps and keep every change readable.',
  },
  {
    title: 'Review',
    body: 'I read every diff as if it came from a new hire. Anything I can’t explain doesn’t merge.',
  },
  {
    title: 'Prove',
    body: 'Tests run the real thing. The event-loop lab on this site is checked against a real JavaScript engine on every push.',
  },
]

export const productLede =
  'At Liquidity Capital the assistant answers inside our platform, with our own components. The model never draws a chart. It picks a tool, the tool returns typed data from our APIs, and our component renders it. If a number is missing, the answer says so.'

// Illustrative, not the production file. The shape is the point.
export const productSnippet: { text: string; strong?: boolean }[] = [
  { text: '// The model chooses. The platform' },
  { text: '// supplies the numbers. We render.' },
  { text: 'const tools = {' },
  { text: '  exposureBySector: {' },
  { text: '    input: z.object({ fund: z.string() }),' },
  { text: '    run: (args) => platform.exposure(args),' },
  { text: '    render: (rows) => <Exposure rows={rows} />,', strong: true },
  { text: '  },' },
  { text: '} satisfies ToolRegistry' },
]

export const practices = [
  {
    title: 'Decision records, trade-off included',
    body: 'Six for Anubhav. The agent reads them before it touches the code, so it knows why things are the way they are.',
  },
  {
    title: 'A generated inventory of the codebase',
    body: 'Components, routes and tokens listed by a script and checked by a test. The context the agent starts from is never stale.',
  },
  {
    title: 'Skills for repeat work',
    body: 'Payload collections, migrations, PDF export. Written once as a skill, so the output matches the house style every time.',
  },
  {
    title: 'One idea per change',
    body: 'I don’t accept a forty-file diff. I ask for the next step, read it, and then ask for the one after.',
  },
  {
    title: 'Citations or silence',
    body: 'The question box on this site answers only from the site and links every fact. If it can’t find it, it says so.',
  },
  {
    title: 'Measure, don’t trust',
    body: 'Lighthouse and axe run in CI, in both themes. A model saying it looks good doesn’t count.',
  },
]
