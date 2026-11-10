// Shared by the Ask corpus and `pnpm generate:cv`. Roles come from ./home.ts.

export const cvSummary =
  'Senior frontend engineer with ten years of experience across banking, private credit and enterprise software. I build design systems, modernise legacy applications and deliver accessible, data-intensive interfaces. My recent work extends into full-stack products and AI assistants, with ownership of architecture, implementation and review.'

export const cvBullets: Record<string, string[]> = {
  'Liquidity Capital': [
    'Lead the migration of legacy private-credit modules to React and TypeScript, integrating Redux and Apollo GraphQL for financial workflows.',
    'Built a shared UI kit with brand themes, Storybook, Tailwind CSS, AG Grid Enterprise and charts; applied it across the platform rebrand.',
    'Build the firm’s LibreChat-based AI assistant, rendering design-system components inside chat with live platform data.',
    'Develop an MCP server that exposes design-system components and previews to coding agents before implementation.',
  ],
  'Banque Saudi Fransi': [
    'Built the Customer Happiness Portal and Digital Banking app using React, TypeScript, Next.js and React Native.',
    'Led the frontend rebrand across legacy banking platforms, introducing a consistent design language and reusable components.',
    'Improved page loading through code splitting and lazy loading; partnered with DevOps on CI/CD, monitoring and alerting.',
  ],
  'Wells Fargo': [
    'Modernised a legacy jQuery customer portal with React and TypeScript, separating reusable UI, API integration and business rules.',
    'Delivered lost and stolen card replacement flows with end-to-end request tracking for customer self-service.',
  ],
  'Ola Electric': [
    'Built the first Ola scooter’s reservation portal and feature pages ahead of the July 2021 reservation opening, including the payment-return flow.',
  ],
  Rakuten: [
    'Built the Rakuten Card online application in React using test-driven development, reusable form components and shared validation rules.',
  ],
  CGI: [
    'Delivered two modules within Shell’s 35-module well-digitalisation platform using Vue.js, Vuex and Kendo UI, following SonarQube quality standards.',
  ],
  'Thomson Reuters': [
    'Progressed from associate to senior in one year; built responsive sites and an award-winning internal Snippet Portal using Vue.js.',
    'Reduced page weight with shared CSS templates and image sprites; automated browser checks using Selenium WebDriver and Java.',
  ],
}

export const cvProjects = [
  {
    title: 'Anubhav',
    detail:
      'Built and deployed a medical training logbook with seven roles, revision-linked faculty approvals and stored certification PDFs. Reduced the Dean’s snapshot from 4.7 MB to 189 KB in a recorded test. Next.js, PostgreSQL, Docker.',
  },
  {
    title: 'Notivo',
    detail:
      'Built a notice monitor with queued email retries and manual review for ambiguous changes. A targeted index reduced rows read from 58,510 to 520 in the recorded lookup test. Node.js, SQLite, React.',
  },
  {
    title: 'Institutional CMS',
    detail:
      'Built a Payload CMS editorial platform with 61 page blocks, scoped editor permissions and Storybook documentation. Deployed the first client site at snmih.in.',
  },
]

export const cvSkills = [
  {
    heading: 'Frontend',
    items: 'React, TypeScript, Next.js, Vue.js, React Native, HTML, CSS, Tailwind',
  },
  {
    heading: 'Architecture',
    items: 'Design systems, Storybook, performance, accessibility (WCAG)',
  },
  {
    heading: 'Data and backend',
    items: 'GraphQL, Apollo, Redux, REST, Node.js, PostgreSQL, Payload CMS',
  },
  {
    heading: 'Quality and delivery',
    items: 'Jest, Vitest, Testing Library, Playwright, CI/CD, Docker',
  },
  {
    heading: 'AI',
    items: 'LibreChat, generative UI, MCP servers, Claude Code',
  },
]

export const cvEducation = [
  { title: 'Master of Computer Applications', detail: 'Bangalore University, 2011–2014' },
  { title: 'Bachelor of Computer Applications', detail: 'Integral University, 2008–2011' },
]
