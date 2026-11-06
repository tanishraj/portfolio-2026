// Home page content. Static until step 2 moves it into Payload collections.
// Case studies live in ./case-studies.ts.
import type { BrandKey } from '@/components/BrandIcon'

export const alsoBuilt: { title: string; detail: string; href: string }[] = [
  {
    title: 'Blueprint UI kit',
    detail: 'on npm',
    href: 'https://tanishraj.github.io/ui-kit',
  },
  {
    title: 'Barebones UI',
    detail: '40 components',
    href: 'https://tanishraj.github.io/barebones-ui',
  },
  {
    title: 'CodeCraft Pro',
    detail: 'Monaco in the browser',
    href: 'https://my-js-editor.vercel.app',
  },
]

/** The paragraph above the Work grid. */
export const workIntro =
  'Four projects worth your time: the AI platform I’m building at Liquidity Capital, and three products I designed, built and run myself, all in production with real users.'

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

export const experience: {
  years: string
  company: string
  study?: string
  logo: BrandKey
  role: string
  place: string
  note: string
}[] = [
  {
    years: '2024 — now',
    company: 'Liquidity Capital',
    study: 'librechat',
    logo: 'liquidity',
    role: 'Senior Frontend Engineer',
    place: 'Abu Dhabi',
    note: 'A private credit platform: its design system and UI kit, a legacy migration to React and TypeScript, the rebrand, and the AI assistant on LibreChat.',
  },
  {
    years: '2022 — 2024',
    company: 'Banque Saudi Fransi',
    study: 'bsf-digital-bank',
    logo: 'bsf',
    role: 'Senior Frontend Engineer',
    place: 'Dubai',
    note: 'Digital banking on web and mobile. Led the frontend rebrand across legacy platforms and worked on performance and CI/CD.',
  },
  {
    years: '2021 — 2022',
    company: 'Wells Fargo',
    study: 'wells-fargo-card-replacement',
    logo: 'wellsfargo',
    role: 'Senior Frontend Engineer',
    place: 'Bangalore',
    note: 'Moved a legacy jQuery customer portal to React and TypeScript, including lost and stolen card flows.',
  },
  {
    years: 'Mar — Jul 2021',
    company: 'Ola Electric',
    study: 'ola-electric-reservations',
    logo: 'ola',
    role: 'Senior Frontend Engineer',
    place: 'Bangalore',
    note: 'Four months building the reservation portal and feature pages ahead of the first scooter launch.',
  },
  {
    years: '2020 — 2021',
    company: 'Rakuten',
    study: 'rakuten-card-apply',
    logo: 'rakuten',
    role: 'Frontend Engineer',
    place: 'Bangalore',
    note: 'The Rakuten Card online application, in React, built test-first.',
  },
  {
    years: '2019 — 2020',
    company: 'CGI',
    study: 'shell-wells-digitalisation',
    logo: 'cgi',
    role: 'Frontend Engineer I',
    place: 'Bangalore',
    note: 'Two modules of a 35-module Vue platform for Shell’s well engineers.',
  },
  {
    years: '2015 — 2018',
    company: 'Thomson Reuters',
    study: 'thomson-reuters',
    logo: 'thomsonreuters',
    role: 'Trainee to Senior Web Developer',
    place: 'Bangalore',
    note: 'Where it started: trainee to senior in three years. Built an internal Snippet Portal for other developers, and received several awards for creativity and ownership.',
  },
]

/** The three things the site has to sell, in the order a hiring manager reads them. */
export const stack: { heading: string; items: { label: string; logo?: BrandKey }[] }[] = [
  {
    heading: 'Frontend (ten years)',
    items: [
      { label: 'React', logo: 'react' },
      { label: 'TypeScript', logo: 'typescript' },
      { label: 'Next.js', logo: 'nextjs' },
      { label: 'Design systems' },
      { label: 'Storybook', logo: 'storybook' },
      { label: 'Tailwind', logo: 'tailwind' },
      { label: 'AG Grid' },
      { label: 'Accessibility' },
      { label: 'Performance' },
    ],
  },
  {
    heading: 'Backend (the last two years, in production)',
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
    heading: 'AI (most days)',
    items: [
      { label: 'Claude API', logo: 'anthropic' },
      { label: 'LibreChat', logo: 'librechat' },
      { label: 'Claude Code and agents' },
      { label: 'RAG and citations' },
      { label: 'MCP servers' },
      { label: 'Agent-ready codebases' },
    ],
  },
]

/** How I use AI, as things that shipped rather than tools I have heard of. */
export const ai: { title: string; body: string; href: string; needsAsk?: boolean }[] = [
  {
    title: 'An AI assistant on LibreChat',
    body: 'For our private credit platform at Liquidity Capital. Built on the open-source chat platform, with our own design system.',
    href: '/work/librechat',
  },
  {
    title: 'Generative UI with our own components',
    body: 'The assistant answers with our components rendered inside the chat, filled with live data. A question about a portfolio gets the chart itself.',
    href: '/work/librechat',
  },
  {
    title: 'Numbers come from the platform',
    body: 'The model decides what to show. The platform decides what the numbers are. If a value is missing, the answer says so.',
    href: '/work/librechat',
  },
  {
    title: 'Ten days to production',
    body: 'Anubhav, with Claude Code as pair programmer. I wrote the brief and six decision records, and reviewed every change.',
    href: '/work/anubhav',
  },
  {
    title: 'Rules for the agent',
    body: 'Each codebase carries its own instructions and a generated inventory of its parts, checked by tests, so an agent starts with the right context.',
    href: '/work/institutional-cms',
  },
  {
    title: 'The question box on this page',
    body: 'Ask it anything about my work. It answers only from this site, links to the page each fact came from, and refuses the rest.',
    href: '/#ask',
    needsAsk: true,
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
