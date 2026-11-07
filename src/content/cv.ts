// CV content. It feeds the Ask corpus; the downloadable PDF in public/ was
// printed from it. Roles come from ./home.ts.

export const cvSummary =
  'Frontend engineer with ten years in banking, private credit and enterprise software. I build design systems and accessible interfaces, modernise legacy front ends, and for the last two years I’ve owned the backend as well. I work with AI agents most days and keep ownership of the architecture and the review.'

export const cvBullets: Record<string, string[]> = {
  'Liquidity Capital': [
    'Build a private credit platform in React, TypeScript, Vite, Redux and Apollo GraphQL; lead the migration of its legacy modules.',
    'Built the UI kit it runs on: Tailwind CSS 4, Storybook with a theme per brand, AG Grid Enterprise and a charts package. Carried the rebrand through it.',
    'Building the firm’s AI assistant on LibreChat; our own components render inside the chat with live platform data.',
    'Building an MCP server over the design system, so coding agents can look up components and previews before they build.',
  ],
  'Banque Saudi Fransi': [
    'Built the Customer Happiness Portal and the Digital Banking app with React, TypeScript, Next.js and React Native.',
    'Led the frontend rebrand across legacy banking platforms with one design language.',
    'Sped up pages with code splitting and lazy loading, and set up CI/CD, monitoring and alerting with DevOps.',
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
    'Associate to senior in a year. Built responsive sites in HTML, SCSS and JavaScript, and the award-winning Snippet Portal in Vue.',
    'Cut page weight with shared CSS templates and image sprites, and wrote browser automation with Selenium WebDriver in Java.',
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
    items: 'React, TypeScript, Next.js, Vue, React Native, HTML, CSS, Tailwind, AG Grid',
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
  {
    heading: 'AI',
    items: 'Claude Code and AI agents in daily work, LLM interfaces, generative UI, MCP servers',
  },
]

export const cvEducation = [
  { title: 'Master of Computer Applications', detail: 'Bangalore University, 2011–2014' },
  { title: 'Bachelor of Computer Applications', detail: 'Integral University, 2008–2011' },
]
