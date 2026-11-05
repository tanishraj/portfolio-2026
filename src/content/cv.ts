// CV content. The /cv page renders it, and `pnpm cv` prints that page to PDF,
// so the site and the CV can't drift apart. Roles come from ./home.ts.

export const cvSummary =
  'Frontend engineer with ten years in banking, private credit and enterprise software. I build design systems and accessible interfaces, modernise legacy front ends, and for the last two years I’ve owned the backend as well. I work with AI agents most days and keep ownership of the architecture and the review.'

export const cvBullets: Record<string, string[]> = {
  'Liquidity Capital': [
    'Build finance-domain platforms with React, TypeScript, Vite, Redux, Apollo Client and GraphQL.',
    'Lead the migration of legacy frontend modules to a maintainable React and TypeScript architecture.',
    'Built a reusable design system and component patterns, and contributed to the rebrand across UI foundations.',
    'Building the firm’s AI assistant on LibreChat, with our design-system components rendered inside the chat with live platform data.',
  ],
  'Banque Saudi Fransi': [
    'Built digital banking web and mobile apps, including the Customer Happiness Portal and the Digital Banking app, with React, TypeScript, Next.js and React Native.',
    'Led the frontend rebrand across legacy banking platforms with one design language.',
    'Improved performance with code splitting, lazy loading and render optimisation, and set up CI/CD, monitoring and alerting with DevOps.',
  ],
  'Wells Fargo': [
    'Moved a legacy jQuery application to a React and TypeScript customer portal.',
    'Built lost and stolen card replacement flows with end-to-end request tracking.',
  ],
  'Ola Electric': [
    'Built the reservation portal and feature pages for the first Ola scooter ahead of the July 2021 launch, which took more than 100,000 reservations in 24 hours.',
  ],
  Rakuten: [
    'Built the Rakuten Card online application in React, test-first, from reusable form parts and one shared set of validation rules.',
  ],
  CGI: [
    'Built two modules of a 35-module Vue, Vuex and Kendo UI platform for Shell’s well engineers, each replacing a manual process, to SonarQube quality standards.',
  ],
  'Thomson Reuters': [
    'Built responsive interfaces with HTML, SCSS and JavaScript, and the Snippet Portal, an internal tool for other developers.',
    'Received several awards for creativity, problem-solving, ownership and delivery.',
  ],
}

export const cvProjects = [
  {
    title: 'Anubhav',
    detail:
      'E-logbook for postgraduate medical residents, built to NMC PGMER-2023. Seven roles, tamper-evident monthly sign-off and certified PDFs, ~275 end-to-end checks. Next.js 16, Postgres, Docker.',
  },
  {
    title: 'Notivo',
    detail:
      'Monitors the National Medical Commission’s notices and emails new ones exactly once, despite an unreliable source. Node, SQLite, React.',
  },
  {
    title: 'Institutional CMS',
    detail:
      'Editorial platform on Payload, copied once per client: 61 blocks, 84 Storybook stories, fail-closed permissions. First client: snmih.in.',
  },
]

export const cvSkills = [
  {
    heading: 'Frontend',
    items: 'React, TypeScript, Next.js, Vue, React Native, HTML, CSS, Tailwind',
  },
  {
    heading: 'Architecture',
    items:
      'Design systems, Storybook, micro frontends, system design, performance, accessibility (WCAG)',
  },
  {
    heading: 'Data and backend',
    items: 'GraphQL, Apollo, Redux Toolkit, REST, Payload CMS, PostgreSQL, Prisma, Node',
  },
  {
    heading: 'Quality and delivery',
    items: 'Jest, Vitest, Testing Library, Playwright, CI/CD, Docker, code review, mentoring',
  },
  { heading: 'AI', items: 'Claude Code and AI agents in daily work, LLM interfaces' },
]

export const cvEducation = [
  { title: 'Master of Computer Applications', detail: 'Bangalore University, 2011–2014' },
  { title: 'Bachelor of Computer Applications', detail: 'Integral University, 2008–2011' },
]
