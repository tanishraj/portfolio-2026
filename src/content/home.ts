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
  'The AI platform I’m building at Liquidity Capital, and three earlier products: one for a bank, one for an electric scooter launch, and one for Shell’s well engineers.'

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
  /** Every designation held, newest first, when there was more than one. */
  roles?: { title: string; years: string }[]
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
    years: '2016 — 2018',
    company: 'Thomson Reuters',
    study: 'thomson-reuters',
    logo: 'thomsonreuters',
    role: 'Associate to Senior Web Developer',
    roles: [
      { title: 'Senior Web Developer', years: '2017 — 2018' },
      { title: 'Associate Web Developer', years: '2016 — 2017' },
    ],
    place: 'Bangalore',
    note: 'Where it started: associate to senior in a year. Built an internal Snippet Portal for other developers, and received several awards for creativity and ownership.',
  },
]

/** How the Experience row groups roles: by where they were, newest first. */
export const experienceChapters: { title: string; places: string[] }[] = [
  { title: 'UAE', places: ['Abu Dhabi', 'Dubai'] },
  { title: 'India', places: ['Bangalore'] },
]

/** The Stack row: three areas, each a set of chips. */
export const stack: { heading: string; items: string[] }[] = [
  {
    heading: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Vue.js',
      'Tailwind CSS',
      'Storybook',
      'AG Grid',
      'Highcharts',
      'Redux',
      'Apollo GraphQL',
      'Performance',
      'Accessibility',
    ],
  },
  {
    heading: 'Backend & Cloud',
    items: [
      'Node.js',
      'Next.js',
      'Payload CMS',
      'MongoDB',
      'Docker',
      'Coolify',
      'Cloudflare R2',
      'Vercel',
      'VPS hosting',
    ],
  },
  {
    heading: 'AI & Tooling',
    items: [
      'MCP servers',
      'LLM integration',
      'AI-powered interfaces',
      'LibreChat',
      'Claude Code',
      'AI agents',
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

export const links = [
  { label: 'GitHub', href: 'https://github.com/tanishraj' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/itsmetanishraj/' },
  { label: 'Medium', href: 'https://medium.com/@tanish_rajput' },
]
