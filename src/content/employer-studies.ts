// Case studies from employment, newest first. Written at the level of decisions
// and architecture: no internal data, no screenshots. Numbers are either public
// (with the source noted in the research files) or Tanish's own measures.

import type { CaseStudy } from './case-studies'

export const employerStudies: CaseStudy[] = [
  {
    kind: 'employer',
    slug: 'bsf-digital-bank',
    title: 'Rebuilding a bank’s front end while it rebranded',
    summary:
      'The Customer Happiness Portal, the React Native banking app, and a rebrand carried across legacy platforms at Banque Saudi Fransi.',
    meta: 'Banking · Riyadh and Dubai',
    company: 'Banque Saudi Fransi',
    logo: 'bsf',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2022 — Jun 2024',
    stack: ['react', 'nextjs', 'typescript', 'chakra', 'githubactions'],
    glance: ['3 platforms, 1 design language', '15% faster pages', 'Web + React Native'],
    tagline: 'Three platforms, one design language, in the middle of a rebrand.',
    facts: [
      { label: 'Role', value: 'Senior frontend engineer; led the rebrand work' },
      { label: 'When', value: 'October 2022 to June 2024' },
      { label: 'Products', value: 'Customer Happiness Portal, BSF Mobile, legacy web' },
      { label: 'Built with', value: 'React, Next.js, TypeScript, Chakra UI, React Native' },
    ],
    problem: [
      'Banque Saudi Fransi was doing two hard things at once. It was rebuilding its digital bank, with a new mobile app that shipped in May 2024, and it was preparing a full rebrand to “BSF”, announced in June 2024. Underneath both sat years of legacy web platforms that customers and staff still used every day.',
      'I worked on three fronts. The Customer Happiness Portal, the internal tool support staff use to resolve customers’ problems, which matters more in Saudi banking since SAMA’s 2023 customer-care rules set service levels for complaints. The mobile banking app, in React Native. And the rebrand itself: making the old platforms look and behave like the new ones without rewriting them.',
    ],
    constraints: [
      'A bank’s release process: every change goes through security review and staged environments, so the work has to be planned in small, reversible steps.',
      'The rebrand could not wait for the legacy platforms to be rebuilt. The new identity had to land on old code.',
      'Designs arrived pixel-perfect and were checked pixel-perfect, which meant the implementation had to match exactly or the review bounced.',
      'Two platforms, web and React Native, had to feel like one product.',
    ],
    architecture: [
      'Customer-facing web on Next.js with TypeScript and Chakra UI, chosen because Chakra’s theme object let one set of brand tokens drive every component.',
      'The mobile app in React Native, sharing design tokens and naming with the web so a screen reviewed on one platform translated to the other.',
      'The rebrand as a theme layer over the legacy platforms: tokens for colour, type and spacing first, then component by component, so the old code changed as little as possible.',
      'Monitoring and alerting wired into the CI/CD pipeline with the DevOps team, so a bad release was visible within minutes rather than reported by customers.',
    ],
    decisions: [
      {
        title: 'Rebrand through tokens, not rewrites',
        body: 'Every legacy platform got the new identity through a theme layer: colours, type scale, spacing and radii as tokens, applied over existing components. The rebrand landed on time without a rewrite nobody had budget for.',
        tradeoff:
          'Some old components could only get close to the new look. I kept a list of those for the rebuild instead of forcing them.',
      },
      {
        title: 'Make design review cheap',
        body: 'Pixel-perfect handoff was slowing both sides down. I set up shared tokens and a component inventory that matched the design files, so designers could check against named parts instead of measuring screenshots, and fewer rounds were needed per feature.',
      },
      {
        title: 'Performance as part of the rebuild',
        body: 'Moving pages to Next.js gave me code splitting, lazy loading and server rendering for free, and I used the move to cut what each page loaded. By my measure, pages were about 15% faster after the rebuild.',
      },
      {
        title: 'Observability in the pipeline',
        body: 'Working with DevOps, releases got monitoring and alerting as part of the pipeline rather than as an afterthought. By the team’s measure, reliability improved by about 20% over the period.',
        tradeoff: 'More alerts means more noise at first. Tuning thresholds took a few releases.',
      },
    ],
    numbers: [
      { value: '3', label: 'platforms carrying one design language: portal, app, legacy web' },
      { value: '15%', label: 'faster page loads after the Next.js rebuild, by my measure' },
      {
        value: '20%',
        label: 'improvement in reliability after pipeline monitoring, by the team’s measure',
      },
      { value: 'May 2024', label: 'BSF Mobile shipped, a month before the public rebrand' },
    ],
    process:
      'Bank work taught me to ship in small, reversible steps and to make the review process part of the design: shared tokens, a named component inventory and monitoring in the pipeline did more for speed than any clever code.',
    next: [
      'The new Backbase-based platform BSF announced in 2025 came after my time; the rebrand and the portal were the groundwork for it.',
    ],
  },
  {
    kind: 'employer',
    slug: 'wells-fargo-card-replacement',
    title: 'Replacing a lost card online, end to end',
    summary:
      'The self-service flow that lets Wells Fargo customers replace a lost or stolen card online, and knows when to hand them to a person instead.',
    meta: 'Banking · Bangalore',
    company: 'Wells Fargo',
    logo: 'wellsfargo',
    role: 'Frontend Engineer II',
    period: 'Jul 2021 — Sep 2022',
    stack: ['react', 'reduxsaga', 'typescript', 'testinglibrary', 'jest'],
    glance: ['Single contributor', 'jQuery → React', 'Tested with RTL'],
    tagline: 'One engineer, one flow that millions of customers might need on a bad day.',
    facts: [
      { label: 'Role', value: 'Single contributor on the module' },
      { label: 'When', value: 'July 2021 to September 2022' },
      { label: 'Scope', value: 'Online card replacement, lost and stolen flows' },
      { label: 'Built with', value: 'React, TypeScript, Redux Saga, React Testing Library' },
    ],
    problem: [
      'When a card is lost or stolen, the customer is already having a bad day. Wells Fargo lets customers report it and order a replacement online or in the app: a new number, expiry and security code, delivery in five to seven days, and digital wallets updated automatically. After in-branch instant issuing ended in late 2020, the online flow became the main path.',
      'I owned the frontend of that module, moving it from a legacy jQuery application into a React and TypeScript customer portal. The hard part is not the happy path. It is knowing exactly when a case cannot be completed online, such as suspected fraud or a wallet that needs separate handling, and routing the customer to the right person with the right information instead of a dead end.',
    ],
    constraints: [
      'One engineer on the module, so the architecture had to be simple enough to hold in one head and well tested enough to change safely.',
      'A regulated flow: every state, message and handoff reviewed by risk and compliance before release.',
      'The new React portal had to live alongside the jQuery application it was replacing, page by page.',
      'The flow has to work for people who are stressed, on a phone, possibly abroad.',
    ],
    architecture: [
      'React with TypeScript for the portal, with Redux Saga handling the multi-step request: report, verify, choose delivery, confirm, with retries and cancellation handled in sagas rather than in components.',
      'Each step a small, reusable component; business rules kept out of the UI layer so the eligibility and handoff logic could be tested on its own.',
      'React Testing Library tests for the flow as a user sees it, step by step, including every “you need to call us” branch.',
      'A clean separation of UI, API integration and business rules, so the jQuery pages could be retired one at a time.',
    ],
    decisions: [
      {
        title: 'Sagas for the long-running flow',
        body: 'Card replacement is a sequence of requests with branches, timeouts and the possibility of the customer going back a step. Modelling it as sagas kept that logic in one place and out of components, and made the branches testable.',
        tradeoff:
          'More ceremony than hooks for a small flow. It paid off because this flow was not small.',
      },
      {
        title: 'Design the handoff as a feature',
        body: 'The cases that cannot finish online were treated as first-class outcomes: a clear reason, the right number to call, and the reference the agent would need. A customer who has to call should not have to start over.',
      },
      {
        title: 'Test like a customer',
        body: 'Tests followed the screens a customer sees rather than internal state, so refactors inside the module did not break them and reviewers could read them as a spec.',
      },
      {
        title: 'Migrate by seams, not big bang',
        body: 'Separating UI, API and rules let the React portal take over from the jQuery application one page at a time, with both running during the transition.',
      },
    ],
    process:
      'This is the project where I learnt to own something end to end: the architecture, the edge cases, the tests and the conversations with risk and compliance. It is also where I became careful about failure paths, which shows up in everything I have built since.',
  },
  {
    kind: 'employer',
    slug: 'ola-electric-reservations',
    title: 'The reservation app for a scooter launch',
    summary:
      'Four months building the pre-booking portal and feature pages for Ola Electric’s first scooter, ahead of a launch that took 100,000 reservations in a day.',
    meta: 'Consumer · Bangalore',
    company: 'Ola Electric',
    logo: 'ola',
    role: 'Frontend Engineer',
    period: '2021 · four months',
    stack: ['react', 'mui', 'javascript'],
    glance: ['100k reservations in 24 h', '₹499 refundable', '4-step flow'],
    tagline: 'Four months to build a flow the whole country would try on the same evening.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on the reservation portal and site' },
      { label: 'When', value: 'Four months in 2021, before the July launch' },
      { label: 'Scope', value: 'Pre-booking portal, feature and FutureFactory pages' },
      { label: 'Built with', value: 'React, Material UI' },
    ],
    problem: [
      'Ola Electric announced its FutureFactory in March 2021 and opened reservations for its first scooter on the evening of 15 July 2021: a refundable ₹499 to hold a place. The company reported more than 100,000 reservations in the first 24 hours. The flow itself was short: phone number and captcha, a one-time code, payment by UPI, card, net banking or Ola Money, then confirmation.',
      'I joined for the months before launch to build that reservation portal and the feature pages around it. A short flow that a very large number of people hit at the same moment is a different problem from a long flow used by a few people a day: every step has to be fast, forgiving of flaky phone networks, and impossible to get stuck in.',
    ],
    constraints: [
      'A fixed public launch date, with marketing already running.',
      'Peak traffic concentrated into the first hours, far above anything the site had seen.',
      'Most users on phones, many on slow or intermittent connections, paying through several different providers.',
      'The brand was new, so the pages had to carry the launch visually as well as functionally.',
    ],
    architecture: [
      'A React single-page application for the reservation flow, built on Material UI for a consistent, accessible component base that could be themed to the brand quickly.',
      'Each step of the flow as its own route (phone, code, payment, confirmation), so a refresh or a flaky connection returned the user to the right step rather than the start.',
      'Device detection and polyfills so older Android browsers, which were a large share of the audience, worked as well as new ones.',
      'Separate feature and FutureFactory pages for the story of the product, kept apart from the transactional flow so marketing changes never risked the booking path.',
    ],
    decisions: [
      {
        title: 'One route per step',
        body: 'Phone, code, payment and confirmation each got a route. Users could refresh, go back, or lose signal and come back without losing their place, which matters when a hundred thousand people are trying at once.',
      },
      {
        title: 'Keep the transaction path small',
        body: 'The booking app loaded only what the booking needed. Everything else, the product story, the factory, the charging network, lived on separate pages so a heavy image or a last-minute copy change could not slow down the one path that mattered.',
      },
      {
        title: 'Build for the worst phone in the queue',
        body: 'Polyfills, device detection and conservative use of browser features, because the audience was the whole country, not a design agency’s laptop.',
      },
    ],
    numbers: [
      { value: '100,000+', label: 'reservations in the first 24 hours, as reported by Ola' },
      { value: '₹499', label: 'refundable reservation, paid through four kinds of provider' },
      { value: '4', label: 'steps from phone number to confirmation' },
      { value: '4 months', label: 'from joining to launch' },
    ],
    process:
      'Four months with an immovable date. The lesson that stayed: when the launch moment is the product, cut everything that is not on the path and make the path survive bad networks.',
  },
  {
    kind: 'employer',
    slug: 'rakuten-card-apply',
    title: 'Applying for a credit card, online',
    summary:
      'The application flow for Rakuten Card, Japan’s largest card by shopping transaction value, built in Vue 2 and Vuex from Rakuten’s Bangalore centre.',
    meta: 'Banking · Bangalore',
    company: 'Rakuten',
    logo: 'rakuten',
    role: 'Frontend Engineer I',
    period: 'Aug 2020 — Mar 2021',
    stack: ['vue', 'node', 'sass', 'jest'],
    glance: ['20M+ cardholders', 'Vue 2 + Vuex', 'Test-first'],
    tagline: 'A long form that has to feel short, for a card with twenty million holders.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on the Credit Cards Apply module' },
      { label: 'When', value: 'August 2020 to March 2021' },
      { label: 'Product', value: 'Rakuten Card online application' },
      { label: 'Built with', value: 'Vue 2, Vuex, Node toolchain' },
    ],
    problem: [
      'Rakuten Card had more than twenty million cardholders in 2020 and led Japan by credit-card shopping transaction value. Its application is fully online: the customer fills in personal, employment and financial details, submits, and the application is checked, partly by people, before a decision in a few days and a card in the post.',
      'The Credit Cards Apply module is the first thing a would-be customer touches. It is a long, regulated form with strict validation, and most people fill it in on a phone. The work was to make it fast, forgiving and consistent, and to build it from reusable pieces so the next form would be cheaper than this one.',
    ],
    constraints: [
      'A regulated financial form: every field, validation message and consent reviewed.',
      'A long form on small screens, where every unnecessary step loses applicants.',
      'Built from Bangalore for a Japanese product, so requirements came through product owners and had to be understood precisely before anything was built.',
      'Validation happened partly after submission, by people, so the form had to collect clean data the first time.',
    ],
    architecture: [
      'Vue 2 with Vuex holding the application state, so a multi-page form could be resumed, reviewed and corrected without losing anything.',
      'Field, section and step components built to be reused across other forms in the banking application.',
      'Validation rules defined once and shared between fields and the review step.',
      'A Node-based build and test workflow, with components built test-first.',
    ],
    decisions: [
      {
        title: 'State outside the pages',
        body: 'Keeping the whole application in Vuex rather than in page components meant users could move between steps, review and fix answers, and the review page could be generated from the same data.',
      },
      {
        title: 'Reusable form parts',
        body: 'Fields, sections and steps were built as a small library, so the next banking form started from parts that were already tested and reviewed.',
      },
      {
        title: 'Understand before building',
        body: 'Most of the risk was in misunderstanding a requirement that came through two languages and a product owner. I spent time with the owners up front, which cost days and saved weeks.',
      },
    ],
    numbers: [
      { value: '20M+', label: 'Rakuten Card holders in 2020, public figure' },
      { value: '1', label: 'set of validation rules, shared by the fields and the review step' },
    ],
    process:
      'My first banking product and my first time building for users I would never meet, in a language I did not speak. It made me careful about requirements and fond of test-first components.',
  },
  {
    kind: 'employer',
    slug: 'shell-wells-digitalisation',
    title: 'Automating two of a well engineer’s manual processes',
    summary:
      'Two modules of a 35-module platform CGI built for Shell’s well engineers, replacing manual, error-prone processes with React.',
    meta: 'Energy · Bangalore',
    company: 'CGI, for Shell',
    logo: 'shell',
    role: 'Frontend Engineer I',
    period: 'Jan 2019 — Aug 2020',
    stack: ['react', 'redux', 'sass', 'javascript'],
    glance: ['35 modules, 2 mine', 'Manual → automated', 'Greenfield'],
    tagline: 'Replacing spreadsheets and email with a platform, one module at a time.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on two of the platform’s modules' },
      { label: 'When', value: 'January 2019 to August 2020' },
      { label: 'Client', value: 'Shell, through CGI’s subsurface and wells portfolio' },
      { label: 'Built with', value: 'React, Redux Thunk, SCSS, JavaScript ES6' },
    ],
    problem: [
      'Well engineering runs on a long chain of planning, approvals and reports, and much of it was still done by hand: spreadsheets, documents and email between engineers. Manual steps are slow, and in this domain a transcription error is expensive. CGI has supplied application services for Shell’s subsurface and wells portfolio since 2013, and this platform was part of that work.',
      'The platform was started from scratch, with React on the front end, and planned as 35 modules, each replacing one manual process for the engineers. I built two of them: taking a process that lived in people’s inboxes and turning it into a guided flow with validation, so the data was right the first time and the process took minutes instead of days.',
    ],
    constraints: [
      'Users were engineers, not consumers: dense data, many fields, and a low tolerance for anything that slowed them down.',
      'A new codebase shared by many teams building many modules, so conventions mattered more than cleverness.',
      'Browser and device variety across offices and sites.',
    ],
    architecture: [
      'React with Redux and Thunk for asynchronous workflows, SCSS for styling, on a shared front-end architecture used across the 35 modules.',
      'Reusable components and a small front-end library contributed back to the platform so later modules could build on them.',
      'Components optimised for a wide range of browsers and devices, since engineers worked from offices, sites and laptops of every age.',
    ],
    decisions: [
      {
        title: 'Guided flows instead of forms',
        body: 'The manual processes were long. Breaking each into a guided sequence with validation at every step produced clean data and removed the back-and-forth that used to happen by email.',
      },
      {
        title: 'Build the library, not just the feature',
        body: 'Anything used twice went into the shared library. With 35 modules in flight, that was the most useful thing a single engineer could do.',
      },
      {
        title: 'Debug for performance early',
        body: 'The first versions were slow with real data volumes. Profiling and fixing render and data-handling issues before more modules copied the pattern saved every team that came after.',
      },
    ],
    numbers: [
      { value: '35', label: 'modules planned for the platform' },
      { value: '2', label: 'modules I built, each replacing a manual process' },
      { value: '2019', label: 'started from scratch with React, Redux Thunk and SCSS' },
    ],
    process:
      'My first greenfield platform and my first enterprise domain. It taught me that on a large shared codebase, the reusable library and the conventions are the product, and that performance problems are cheapest to fix before anyone copies them.',
  },
  {
    kind: 'employer',
    slug: 'thomson-reuters',
    title: 'Where it started: templates, sprites and single-page apps',
    summary:
      'Three years at Thomson Reuters’ Bangalore technology centre, from CSS templates and page-weight work to single-page applications in Vue and React, and an internal tool that won awards.',
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
      'That meant CSS templates used across every page of a large site, where a careless rule breaks something you cannot see; page-weight work, combining images into sprites to cut requests and load time; and then the move to single-page applications, first in Vue with Flux, then in React with React Router, talking to SOAP and REST services that moved large XML and JSON payloads.',
    ],
    constraints: [
      'Templates shared across a very large site: every change had to be safe everywhere, not just on the page in front of you.',
      'Performance budgets from the era of HTTP/1.1, where every extra request counted.',
      'Legacy services: SOAP alongside REST, XML alongside JSON.',
    ],
    architecture: [
      'A CSS template system covering layout, type, spacing, borders and tables for all pages, written to be composed rather than overridden.',
      'Image sprites and asset optimisation to reduce page size and requests.',
      'Single-page applications in Vue with Flux and in React, with React Router for navigation and drag-and-drop interactions built on React Draggable.',
      'Integration with SOAP and RESTful services carrying large XML and JSON documents.',
    ],
    decisions: [
      {
        title: 'Templates you compose, not override',
        body: 'On a site that large, CSS written to be overridden becomes a specificity war. Templates were written as composable pieces with clear ownership, which is a habit I still have, and the reason I later wrote about CSS specificity.',
      },
      {
        title: 'Measure page weight',
        body: 'Sprites were not glamorous, but measuring requests and bytes and cutting them was the first time I saw performance as a feature users feel.',
      },
      {
        title: 'Build the tool the team needs',
        body: 'The Snippet Portal was an internal project to give other developers a shared, searchable library of code snippets and patterns. It streamlined common work for the team and earned several awards for creativity and ownership.',
      },
    ],
    numbers: [
      { value: '3 yrs', label: 'from templates to single-page applications' },
      { value: '2', label: 'frameworks shipped: Vue with Flux, then React' },
      {
        value: 'Several',
        label: 'awards for the Snippet Portal: creativity, problem-solving, ownership',
      },
    ],
    process:
      'Everything since has been built on what this job taught: that CSS is architecture, that bytes are a feature, and that the most valuable thing you can build is often the tool your own team needed.',
  },
]
