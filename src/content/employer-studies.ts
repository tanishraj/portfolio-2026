// Case studies from employment, newest first. Written at the level of decisions
// and architecture: no internal data, no screenshots. Numbers are either public
// (with the source noted in the research files) or Tanish's own measures.

import type { CaseStudy } from './case-studies'

export const employerStudies: CaseStudy[] = [
  {
    kind: 'employer',
    slug: 'bsf-digital-bank',
    title: 'Rebranding a bank’s legacy platforms without rewriting them',
    summary:
      'The Customer Happiness Portal, the React Native banking app, and a rebrand carried across legacy platforms at Banque Saudi Fransi.',
    meta: 'Banking · Riyadh and Dubai',
    company: 'Banque Saudi Fransi',
    logo: 'bsf',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2022 — Jun 2024',
    stack: ['react', 'nextjs', 'typescript', 'chakra', 'githubactions'],
    glance: ['3 platforms, 1 design language', '15% faster pages', 'Web + React Native'],
    tagline: 'A new identity landing on old code, while the new app was still being built.',
    facts: [
      { label: 'Role', value: 'Senior frontend engineer; led the rebrand work' },
      { label: 'When', value: 'October 2022 to June 2024' },
      { label: 'Products', value: 'Customer Happiness Portal, BSF Mobile, legacy web' },
      { label: 'Built with', value: 'React, Next.js, TypeScript, Chakra UI, React Native' },
    ],
    problem: [
      'Banque Saudi Fransi was doing two hard things at once: rebuilding its digital bank, with a new mobile app that shipped in May 2024, and preparing a full rebrand to “BSF”, announced that June. Underneath both sat years of legacy web platforms that customers and staff used every day.',
      'I worked on three fronts. The Customer Happiness Portal, which support staff use to resolve customers’ problems. The mobile banking app, in React Native. And the rebrand itself, which meant making the old platforms look and behave like the new ones without rewriting them.',
    ],
    constraints: [
      'A bank’s release process. Every change goes through security review and staged environments, so the work had to come in small, reversible steps.',
      'The rebrand couldn’t wait for the legacy platforms to be rebuilt.',
      'Designs arrived pixel-perfect and were checked pixel-perfect.',
    ],
    architecture: [
      'Customer-facing web on Next.js with TypeScript and Chakra UI, because Chakra’s theme object let one set of brand tokens drive every component.',
      'The mobile app in React Native, sharing tokens and naming with the web.',
      'The rebrand as a theme layer over the legacy platforms: tokens first, then component by component.',
      'Monitoring and alerting wired into the CI/CD pipeline with the DevOps team.',
    ],
    decisions: [
      {
        title: 'Rebrand through tokens',
        body: 'Every legacy platform got the new identity as a theme layer: colours, type, spacing and radii as tokens over existing components. It landed on time without a rewrite nobody had budget for.',
        tradeoff:
          'Some old components could only get close to the new look. I kept a list of those for the rebuild instead of forcing them.',
      },
      {
        title: 'Make design review cheap',
        body: 'Pixel-perfect handoff was slowing both sides down. Shared tokens and a component inventory that matched the design files meant designers could check against named parts instead of measuring screenshots.',
      },
      {
        title: 'Use the rebuild to get faster',
        body: 'Moving pages to Next.js gave me code splitting and server rendering for free, and I used the move to cut what each page loaded. By my measure, pages were about 15% faster afterwards.',
      },
      {
        title: 'Alerts in the pipeline',
        body: 'Releases got monitoring and alerting as part of the pipeline rather than as an afterthought, so a bad release showed up in minutes instead of in customer complaints. By the team’s measure, reliability improved by about 20%.',
      },
    ],
    numbers: [
      { value: '3', label: 'platforms carrying one design language' },
      { value: '15%', label: 'faster pages after the rebuild, by my measure' },
      { value: '20%', label: 'better reliability with pipeline monitoring, by the team’s measure' },
    ],
    process:
      'Bank work taught me to ship in small reversible steps and to design the review process itself. Shared tokens, a named component inventory and monitoring in the pipeline did more for speed than any clever code.',
  },
  {
    kind: 'employer',
    slug: 'wells-fargo-card-replacement',
    title: 'Replacing a lost card online',
    summary:
      'The self-service flow that lets Wells Fargo customers replace a lost or stolen card online, and knows when to hand them to a person instead.',
    meta: 'Banking · Bangalore',
    company: 'Wells Fargo',
    logo: 'wellsfargo',
    role: 'Frontend Engineer II',
    period: 'Jul 2021 — Sep 2022',
    stack: ['react', 'reduxsaga', 'typescript', 'testinglibrary', 'jest'],
    glance: ['Single contributor', 'jQuery → React', 'Tested with RTL'],
    tagline: 'One engineer, one flow that millions of people might need on a bad day.',
    facts: [
      { label: 'Role', value: 'Single contributor on the module' },
      { label: 'When', value: 'July 2021 to September 2022' },
      { label: 'Scope', value: 'Online card replacement, lost and stolen flows' },
      { label: 'Built with', value: 'React, TypeScript, Redux Saga, React Testing Library' },
    ],
    problem: [
      'When a card is lost or stolen, the customer is already having a bad day. Wells Fargo lets them report it and order a replacement online: a new number, expiry and security code, delivery in five to seven days, digital wallets updated automatically. After in-branch instant issuing ended in late 2020, this flow became the main path.',
      'I owned the front end of that module and moved it from a legacy jQuery application into the React and TypeScript portal. The hard part isn’t the happy path. It’s knowing exactly when a case can’t be completed online, such as suspected fraud, and getting the customer to the right person with the right information instead of a dead end.',
    ],
    constraints: [
      'One engineer on the module, so the architecture had to be simple enough to hold in one head and tested well enough to change safely.',
      'A regulated flow. Every state, message and handoff was reviewed by risk and compliance.',
      'The new React portal had to run alongside the jQuery pages it was replacing.',
    ],
    architecture: [
      'React with TypeScript, with Redux Saga handling the multi-step request: report, verify, choose delivery, confirm, with retries and cancellation in sagas rather than in components.',
      'Business rules kept out of the UI layer, so eligibility and handoff logic could be tested on their own.',
      'React Testing Library tests that follow the screens a customer sees, including every “you need to call us” branch.',
    ],
    decisions: [
      {
        title: 'Sagas for the long-running flow',
        body: 'Card replacement is a sequence of requests with branches, timeouts and the chance the customer goes back a step. Modelling it as sagas kept that logic in one place and made the branches testable.',
        tradeoff: 'More ceremony than hooks for a small flow. This flow wasn’t small.',
      },
      {
        title: 'The handoff is a feature',
        body: 'Cases that can’t finish online get a clear reason, the right number to call, and the reference the agent will need. A customer who has to call shouldn’t have to start over.',
      },
      {
        title: 'Tests that read like a spec',
        body: 'Tests followed what a customer sees rather than internal state, so refactors didn’t break them and reviewers could read them as the specification.',
      },
    ],
    process:
      'This is where I learnt to own something end to end: the architecture, the edge cases, the tests and the conversations with risk and compliance. It’s also where I became careful about failure paths, which shows in everything I’ve built since.',
  },
  {
    kind: 'employer',
    slug: 'ola-electric-reservations',
    title: 'The reservation app for Ola’s first scooter',
    summary:
      'Four months in 2021 building the pre-booking portal and feature pages for Ola Electric’s first scooter, ahead of a launch that took 100,000 reservations in a day.',
    meta: 'Consumer · Bangalore',
    company: 'Ola Electric',
    logo: 'ola',
    role: 'Frontend Engineer',
    period: 'Mar — Jul 2021',
    stack: ['react', 'mui', 'javascript'],
    glance: ['100k reservations in 24 h', '₹499 refundable', '4-step flow'],
    tagline: 'Four months to build a flow the whole country would try on the same evening.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on the reservation portal and site' },
      { label: 'When', value: 'March to July 2021, straight after Rakuten and before Wells Fargo' },
      { label: 'Scope', value: 'Pre-booking portal, feature and FutureFactory pages' },
      { label: 'Built with', value: 'React, Material UI' },
    ],
    problem: [
      'Ola Electric opened reservations for its first scooter on the evening of 15 July 2021: a refundable ₹499 to hold a place. The company reported more than 100,000 reservations in the first 24 hours. The flow was short. Phone number and captcha, a one-time code, payment, confirmation.',
      'I joined for the months before launch to build that portal and the feature pages around it. A short flow that a huge number of people hit at the same moment is a different problem from a long flow used by a few people a day. Every step has to be fast, forgiving of flaky phone networks, and impossible to get stuck in.',
    ],
    constraints: [
      'A fixed public launch date, with marketing already running.',
      'Peak traffic packed into the first hours, far beyond anything the site had seen.',
      'Most users on phones, many on slow connections, paying through several different providers.',
    ],
    architecture: [
      'A React single-page app for the reservation flow, on Material UI so it could be themed to the brand quickly.',
      'Each step as its own route, so a refresh or a dropped connection brought the user back to the right step, not the start.',
      'Polyfills and device detection for older Android browsers, which were a large share of the audience.',
      'Feature and factory pages kept separate from the booking app, so a heavy image or a last-minute copy change couldn’t slow the one path that mattered.',
    ],
    decisions: [
      {
        title: 'One route per step',
        body: 'Phone, code, payment and confirmation each got a route. Users could refresh, go back, or lose signal and come back without losing their place.',
      },
      {
        title: 'Keep the booking app small',
        body: 'It loaded only what the booking needed. The product story lived on other pages.',
      },
      {
        title: 'Build for the worst phone in the queue',
        body: 'The audience was the whole country, not a design agency’s laptop.',
      },
    ],
    numbers: [
      { value: '100,000+', label: 'reservations in the first 24 hours, as reported by Ola' },
      { value: '₹499', label: 'refundable reservation, paid through four kinds of provider' },
      { value: '4 months', label: 'from joining to launch' },
    ],
    process:
      'Four months with an immovable date. The lesson that stayed with me: when the launch moment is the product, cut everything that isn’t on the path and make the path survive bad networks.',
  },
  {
    kind: 'employer',
    slug: 'rakuten-card-apply',
    title: 'The Rakuten Card application form',
    summary:
      'The online application for Rakuten Card, Japan’s largest card by shopping transaction value, built in React from Rakuten’s Bangalore centre.',
    meta: 'Banking · Bangalore',
    company: 'Rakuten',
    logo: 'rakuten',
    role: 'Frontend Engineer I',
    period: 'Aug 2020 — Mar 2021',
    stack: ['react', 'javascript', 'jest', 'testinglibrary'],
    glance: ['20M+ cardholders', 'React, test-first', 'Reusable form parts'],
    tagline: 'A long form that has to feel short.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on the Credit Cards Apply module' },
      { label: 'When', value: 'August 2020 to March 2021' },
      { label: 'Product', value: 'Rakuten Card online application' },
      { label: 'Built with', value: 'React, a central store, Jest and React Testing Library' },
    ],
    problem: [
      'Rakuten Card had more than twenty million cardholders in 2020. Its application is fully online: personal, employment and financial details, then a review that is partly done by people, a decision in a few days, and a card in the post.',
      'The application form is the first thing a would-be customer touches. It’s long, regulated and mostly filled in on a phone. The work was to make it fast and forgiving, and to build it from parts the next form could reuse.',
    ],
    constraints: [
      'A regulated financial form. Every field, validation message and consent was reviewed.',
      'Built in Bangalore for a Japanese product, so requirements came through product owners and had to be understood precisely first.',
      'The review after submission was partly manual, so the form had to collect clean data the first time.',
    ],
    architecture: [
      'React, with the whole application held in a central store, so a multi-page form could be resumed, reviewed and corrected without losing anything.',
      'Field, section and step components built for reuse across other forms in the banking app.',
      'Validation rules defined once and shared between the fields and the review step.',
    ],
    decisions: [
      {
        title: 'State outside the pages',
        body: 'Keeping the application in a store rather than in page components meant users could move between steps and fix answers, and the review page came from the same data.',
      },
      {
        title: 'A small library of form parts, built test-first',
        body: 'Fields, sections and steps were built as a library with their tests written first, so the next banking form started from parts that were already proven and reviewed.',
      },
      {
        title: 'Understand before building',
        body: 'Most of the risk was in misreading a requirement that came through two languages and a product owner. Time spent with the owners up front cost days and saved weeks.',
      },
    ],
    numbers: [
      { value: '20M+', label: 'Rakuten Card holders in 2020, public figure' },
      { value: '1', label: 'set of validation rules, shared by the fields and the review step' },
    ],
    process:
      'My first banking product, built for users I’d never meet, in a language I don’t speak. It made me careful about requirements and fond of test-first components.',
  },
  {
    kind: 'employer',
    slug: 'shell-wells-digitalisation',
    title: 'Two modules of a platform for Shell’s well engineers',
    summary:
      'Two modules of a 35-module platform CGI built for Shell’s well engineers, replacing manual, error-prone processes with Vue.',
    meta: 'Energy · Bangalore',
    company: 'CGI, for Shell',
    logo: 'shell',
    role: 'Frontend Engineer I',
    period: 'Jan 2019 — Aug 2020',
    stack: ['vue', 'kendo', 'sass', 'javascript'],
    glance: ['35 modules, 2 mine', 'Manual → automated', 'Vue + Kendo UI'],
    tagline: 'Spreadsheets and email, replaced one module at a time.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on two of the platform’s modules' },
      { label: 'When', value: 'January 2019 to August 2020' },
      { label: 'Client', value: 'Shell, through CGI’s subsurface and wells portfolio' },
      { label: 'Built with', value: 'Vue, Vuex, Kendo UI, SCSS' },
    ],
    problem: [
      'Well engineering runs on a long chain of planning, approvals and reports, and a lot of it was still done by hand in spreadsheets and email. Manual steps are slow, and in this domain a transcription error is expensive. CGI has supplied application services for Shell’s subsurface and wells portfolio since 2013, and this platform was part of that work.',
      'The platform was started from scratch in Vue and planned as 35 modules, each replacing one manual process. I built two of them: taking a process that lived in people’s inboxes and turning it into a guided flow with validation, so the data was right the first time.',
    ],
    constraints: [
      'Users were engineers: dense data, many fields, no patience for anything slow.',
      'A new codebase shared by many teams, so conventions mattered more than cleverness.',
    ],
    architecture: [
      'Vue with Vuex for state, Kendo UI for the data-heavy grids and forms engineers live in, and SCSS, on a shared front-end architecture used across the 35 modules.',
      'Reusable components contributed back to the platform library so later modules could build on them, written to SonarQube’s quality rules.',
    ],
    decisions: [
      {
        title: 'Guided flows instead of long forms',
        body: 'Breaking each manual process into a guided sequence with validation at every step produced clean data and removed the back-and-forth that used to happen by email.',
      },
      {
        title: 'Build the library, not just the feature',
        body: 'Anything used twice went into the shared library. With 35 modules in flight, that was the most useful thing one engineer could do.',
      },
      {
        title: 'Fix performance before it spreads',
        body: 'The first versions were slow with real data volumes. Profiling and fixing the render and data-handling issues before more modules copied the pattern saved every team that came after.',
      },
    ],
    numbers: [
      { value: '35', label: 'modules planned for the platform' },
      { value: '2', label: 'modules I built, each replacing a manual process' },
    ],
    process:
      'My first greenfield platform and my first enterprise domain. On a big shared codebase, the reusable library and the conventions are the product, and performance problems are cheapest to fix before anyone copies them.',
  },
  {
    kind: 'employer',
    slug: 'thomson-reuters',
    title: 'Templates, sprites and the first single-page apps',
    summary:
      'Three years at Thomson Reuters’ Bangalore technology centre, from CSS templates and page-weight work to single-page apps in Vue and React, and an internal tool that won awards.',
    meta: 'Enterprise · Bangalore',
    company: 'Thomson Reuters',
    logo: 'thomsonreuters',
    role: 'Associate Frontend Engineer',
    period: 'Jan 2016 — Dec 2018',
    stack: ['html5', 'css', 'javascript', 'vue', 'react', 'reactrouter'],
    glance: ['Site-wide CSS templates', 'Sprites for page weight', 'Awards for Snippet Portal'],
    tagline: 'The fundamentals, learnt on a very large website.',
    facts: [
      { label: 'Role', value: 'Associate frontend engineer' },
      { label: 'When', value: 'January 2016 to December 2018' },
      { label: 'Where', value: 'Thomson Reuters, Bangalore technology centre' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript, Vue and Flux, React, React Router' },
    ],
    problem: [
      'Thomson Reuters’ Bangalore campus was one of its largest technology centres, serving the financial, legal and tax businesses in the years before the 2018 split that created Refinitiv. I joined as an associate engineer and spent three years on the fundamentals of frontend work at scale.',
      'That meant CSS templates used on every page of a very large site, where a careless rule breaks something you can’t see. Page-weight work, combining images into sprites to cut requests. Then the move to single-page applications, first in Vue with Flux, then React with React Router, talking to SOAP and REST services that moved large XML and JSON payloads.',
    ],
    constraints: [
      'Templates shared across the whole site. Every change had to be safe everywhere, not just on the page in front of you.',
      'Performance budgets from the era of HTTP/1.1, where every request counted.',
      'SOAP alongside REST, XML alongside JSON.',
    ],
    architecture: [
      'A CSS template system for layout, type, spacing, borders and tables, written to be composed rather than overridden.',
      'Image sprites and asset optimisation to cut page size and requests.',
      'Single-page apps in Vue with Flux and in React, with React Router and drag-and-drop on React Draggable.',
    ],
    decisions: [
      {
        title: 'Templates you compose, not override',
        body: 'On a site that large, CSS written to be overridden becomes a specificity war. Templates were written as composable pieces with clear ownership. It’s a habit I still have, and the reason I later wrote about CSS specificity.',
      },
      {
        title: 'Measure page weight',
        body: 'Sprites weren’t glamorous, but measuring requests and bytes and cutting them was the first time I saw performance as something users feel.',
      },
      {
        title: 'Build the tool the team needs',
        body: 'The Snippet Portal gave other developers a shared, searchable library of code snippets and patterns. It streamlined common work for the team and earned several awards for creativity and ownership.',
      },
    ],
    numbers: [
      { value: '3 yrs', label: 'from templates to single-page apps' },
      { value: 'Several', label: 'awards for the Snippet Portal' },
    ],
    process:
      'Everything since has been built on what this job taught me: CSS is architecture, bytes are a feature, and the most valuable thing you can build is often the tool your own team needed.',
  },
]
