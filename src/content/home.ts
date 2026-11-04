// Home page content. Static until step 2 moves it into Payload collections.
// Case studies live in ./case-studies.ts.
import type { BrandKey } from '@/components/BrandIcon'

export const alsoBuilt: { title: string; detail: string; href: string }[] = [
  {
    title: 'Blueprint UI kit',
    detail: 'React components on npm as @tanishraj/ui-kit',
    href: 'https://tanishraj.github.io/ui-kit',
  },
  {
    title: 'Barebones UI',
    detail: '40 accessible React components, Tailwind v4',
    href: 'https://tanishraj.github.io/barebones-ui',
  },
  {
    title: 'CodeCraft Pro',
    detail: 'A JavaScript editor in the browser, on Monaco',
    href: 'https://my-js-editor.vercel.app',
  },
]

export const principles = [
  {
    title: 'I go after the odd problems.',
    body: 'The legacy module nobody wants to touch. The flow that only breaks in production. Those are the ones I ask for, because that is where the real work is.',
  },
  {
    title: 'I think in systems.',
    body: 'Tokens, components and patterns that make the tenth screen faster to build than the first. A good system is the reason a team can move quickly without making a mess.',
  },
  {
    title: 'Fast first, then polished.',
    body: 'I ship early to learn what matters, then sweat the details: spacing, focus states, loading, and the small timings that make an interface feel calm.',
  },
]

export const experience = [
  {
    years: '2024 — now',
    company: 'Liquidity Capital',
    logo: 'liquidity' as BrandKey,
    role: 'Senior Frontend Engineer',
    place: 'Abu Dhabi',
    note: 'Private-credit platforms: a design system, a legacy migration to React and TypeScript, and an internal AI assistant on LibreChat.',
  },
  {
    years: '2022 — 2024',
    company: 'Banque Saudi Fransi',
    logo: 'bsf' as BrandKey,
    role: 'Senior Frontend Engineer',
    place: 'Dubai',
    note: 'Digital banking on web and mobile. Led the frontend rebrand across legacy platforms and worked on performance and CI/CD.',
  },
  {
    years: '2021 — 2022',
    company: 'Wells Fargo',
    logo: 'wellsfargo' as BrandKey,
    role: 'Frontend Engineer II',
    place: 'Bangalore',
    note: 'Moved a legacy jQuery customer portal to React and TypeScript, including lost and stolen card flows.',
  },
  {
    years: '2020 — 2021',
    company: 'Rakuten',
    logo: 'rakuten' as BrandKey,
    role: 'Frontend Engineer I',
    place: 'Bangalore',
    note: 'Responsive React components, built test-first, and a lot of code review.',
  },
  {
    years: '2019 — 2020',
    company: 'CGI',
    logo: 'cgi' as BrandKey,
    role: 'Frontend Engineer I',
    place: 'Bangalore',
    note: 'Enterprise Vue applications for the oil and gas industry.',
  },
  {
    years: '2016 — 2018',
    company: 'Thomson Reuters',
    logo: 'thomsonreuters' as BrandKey,
    role: 'Associate Frontend Engineer',
    place: 'Bangalore',
    note: 'Where it started. Built an internal Snippet Portal for other developers, and received several awards for creativity and ownership.',
  },
]

/** The three things the site has to sell, in the order a hiring manager reads them. */
export const stack: { heading: string; items: { label: string; logo?: BrandKey }[] }[] = [
  {
    heading: 'Frontend, ten years',
    items: [
      { label: 'React', logo: 'react' },
      { label: 'TypeScript', logo: 'typescript' },
      { label: 'Next.js', logo: 'nextjs' },
      { label: 'Design systems' },
      { label: 'Storybook', logo: 'storybook' },
      { label: 'Tailwind', logo: 'tailwind' },
      { label: 'Accessibility' },
      { label: 'Performance' },
    ],
  },
  {
    heading: 'Backend, in production',
    items: [
      { label: 'Node', logo: 'node' },
      { label: 'PostgreSQL', logo: 'postgres' },
      { label: 'Prisma', logo: 'prisma' },
      { label: 'Payload CMS', logo: 'payload' },
      { label: 'SQLite', logo: 'sqlite' },
      { label: 'GraphQL', logo: 'graphql' },
      { label: 'Docker', logo: 'docker' },
      { label: 'CI/CD', logo: 'githubactions' },
    ],
  },
  {
    heading: 'AI, every day',
    items: [
      { label: 'Claude API', logo: 'anthropic' },
      { label: 'LibreChat', logo: 'librechat' },
      { label: 'Claude Code and agents' },
      { label: 'RAG and citations' },
      { label: 'Agent-ready codebases' },
    ],
  },
]

/** How I use AI, as things that shipped rather than tools I have heard of. */
export const ai = [
  {
    title: 'An internal AI assistant for a private-credit firm',
    body: 'At Liquidity Capital I am taking LibreChat, the open-source chat platform, from a stock deployment to an assistant the firm can actually use. Shared with a code.',
    href: '/work/librechat',
  },
  {
    title: 'A production app in ten days, with an agent as pair programmer',
    body: 'Anubhav went from first commit to a medical college’s production server in ten days with Claude Code. I wrote the brief, the design system and six decision records; the agent typed; I reviewed every change against them.',
    href: '/work/anubhav',
  },
  {
    title: 'Answers with receipts, on this site',
    body: 'The “Ask about my work” box streams answers from the Claude API over this site’s own content, with a citation chip on every claim, prompt caching on the corpus, and rate limits in Postgres.',
    href: '/#ask',
  },
  {
    title: 'Codebases agents can work in',
    body: 'My CMS platform keeps a generated inventory of every block and a set of project skills for agents, checked by tests after every change, so an agent gets correct context instead of guessing.',
    href: '/work/institutional-cms',
  },
]

export const writing = [
  {
    title: 'TypeScript Generics',
    date: 'Mar 2026',
    href: 'https://medium.com/@tanish_rajput/typescript-generics-095668cf190e',
  },
  {
    title: '‘this’ in JavaScript',
    date: 'Feb 2024',
    href: 'https://medium.com/@tanish_rajput/this-in-javascript-edba94741d9d',
  },
  {
    title: 'CSS Specificity',
    date: 'Jan 2024',
    href: 'https://medium.com/@tanish_rajput/css-specificity-6499f2b7e27b',
  },
  {
    title: 'Tilde (~) vs Caret (^) in package.json',
    date: 'Jan 2024',
    href: 'https://medium.com/@tanish_rajput/tilde-vs-caret-in-package-json-a73e02033bfc',
  },
]

export const links = [
  { label: 'GitHub', href: 'https://github.com/tanishraj' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/itsmetanishraj/' },
  { label: 'Medium', href: 'https://medium.com/@tanish_rajput' },
]
