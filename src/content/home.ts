// Home page content. Static until step 2 moves it into Payload collections.
// Case studies live in ./case-studies.ts.
import type { BrandKey } from '@/components/BrandIcon'

export const alsoBuilt: { title: string; detail: string; href?: string }[] = [
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
  { title: 'Wells Fargo', detail: 'jQuery to React and TypeScript, card-loss flows' },
  { title: 'Banque Saudi Fransi', detail: 'Digital banking on web and mobile, frontend rebrand' },
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
    note: 'Private-credit platforms. A design system, a legacy migration to React and TypeScript, and an internal AI assistant.',
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

export const skills = [
  {
    heading: 'Every day',
    items: ['React', 'TypeScript', 'Design systems', 'Storybook', 'System design'],
  },
  {
    heading: 'Shipped with',
    items: [
      'Next.js',
      'Vue',
      'React Native',
      'GraphQL and Apollo',
      'Redux Toolkit',
      'Jest, Vitest, RTL',
      'Accessibility',
      'Web performance',
    ],
  },
  {
    heading: 'Learning now',
    items: ['Payload CMS', 'PostgreSQL', 'AI-assisted development', 'LLM interfaces'],
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
