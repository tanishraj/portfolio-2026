// The four employment projects featured on the home page. The protected
// Liquidity study contains only its public teaser; its body stays in Payload.

import type { CaseStudy } from './case-studies'

export const employerStudies: CaseStudy[] = [
  {
    kind: 'employer',
    slug: 'librechat',
    title: 'Bringing AI into private credit',
    summary:
      'A chat assistant for our private credit platform, built on LibreChat. Ask about a portfolio and you get the chart itself, drawn with our components and live numbers.',
    meta: 'AI · Liquidity Capital · 2024 — now',
    locked: true,
    company: 'Liquidity Capital',
    logo: 'liquidity',
    role: 'Senior Frontend Engineer',
    period: 'Jul 2024 — now',
    stack: ['librechat', 'react', 'typescript', 'node', 'mongodb', 'anthropic'],
    glance: ['Generative UI in chat', 'Own design system', 'Live platform data'],
    blurb:
      'A conversational AI platform built on LibreChat, combining live financial data with reusable UI components and interactive visualizations.',
    tagline: 'Ask the platform a question and get the answer drawn as UI.',
    publicPoints: [
      'We built on LibreChat, the open-source chat platform, instead of writing a chat UI from scratch. Models, agents, tools and MCP were already solved, so the work went into what’s specific to the firm.',
      'We built our own design system: tokens, components and larger blocks for how the platform shows credit and portfolio information.',
      'The system itself is React and TypeScript on Tailwind CSS 4, documented in Storybook with a theme per brand, with AG Grid for the data-heavy tables and a separate charts package. I’m now putting an MCP server over it, so a coding agent can look up a component and see its preview before it builds.',
      'LibreChat renders those same blocks inside the conversation. An answer about a facility or a portfolio arrives as a chart, a table or a card with live data.',
      'The full write-up covers how the blocks are described to the model, how live data gets into them safely, and what we learnt about reliability. It’s shared with a code because it concerns my current employer’s internal tools.',
    ],
  },
  {
    kind: 'employer',
    slug: 'wells-fargo-card-replacement',
    title: 'Modernizing the card replacement experience',
    summary:
      'As the sole frontend engineer on the module, I rebuilt Wells Fargo’s lost and stolen card replacement flow in the React and TypeScript customer portal, and designed its request states, recovery paths and support handoffs.',
    meta: 'Banking · Bangalore',
    company: 'Wells Fargo',
    logo: 'wellsfargo',
    role: 'Senior Frontend Engineer',
    period: 'Jul 2021 — Sep 2022',
    stack: ['react', 'reduxsaga', 'typescript', 'testinglibrary', 'jest'],
    glance: ['Sole frontend engineer', 'jQuery → React', 'Request and handoff states'],
    blurb:
      'Rebuilding a lost and stolen card replacement flow from jQuery to React, bringing a legacy banking experience onto a modern frontend.',
    tagline: 'A replacement request needs a clear outcome, including when it cannot finish online.',
    facts: [
      { label: 'Company', value: 'Wells Fargo' },
      { label: 'My role', value: 'Senior Frontend Engineer' },
      { label: 'Product', value: 'Lost and stolen card replacement' },
      { label: 'Contribution', value: 'Sole frontend engineer on the replacement module' },
      { label: 'Timeline', value: 'July 2021–September 2022' },
    ],
    problem: [
      'A lost or stolen card is an urgent moment for a customer: report it, protect the account and find out how a replacement will arrive. As the bank moved its customer portal to React and TypeScript, this flow was one of the modules to make the move.',
      'I owned the frontend migration of that module. Beyond the screens, I designed the flow around every state a request can be in, from eligibility and pending requests to the cases that need a person, so each customer always gets a clear outcome.',
    ],
    ownership: [
      'Owned the replacement module’s frontend end to end as its sole engineer: components, state orchestration and tests.',
      'Migrated the module from jQuery into the React portal.',
      'Built the lost and stolen card paths and end-to-end request tracking.',
      'Worked through the flow’s states and customer messages with risk and compliance reviewers.',
    ],
    constraints: [
      'Integrate with existing banking services and the surrounding customer portal.',
      'Keep the journey seamless while jQuery and React pages ran side by side.',
      'Make pending, failed and support-handoff states clear to a customer under stress.',
      'Keep the module maintainable by one frontend engineer and reviewable by non-engineers.',
    ],
    architecture: [
      'React and TypeScript screens built from reusable components in the customer portal.',
      'Redux Saga orchestrating the asynchronous steps of the flow, including request sequencing and cancellation.',
      'Eligibility and handoff rules kept outside the components, so each branch could be tested without rendering the whole journey.',
      'React Testing Library coverage written from the customer’s point of view, including support handoffs.',
    ],
    decisions: [
      {
        title: 'Keep asynchronous orchestration out of screens',
        body: 'Redux Saga coordinated request sequences and branching, while React components only rendered the current state. It added a layer for a new contributor to learn, but kept the workflow logic in one testable place instead of spreading it across components.',
      },
      {
        title: 'Separate decisions from presentation',
        body: 'Eligibility and handoff rules lived outside the components. Each outcome could be tested on its own, and its wording reviewed with risk and compliance without reading UI code. The backend stayed the source of truth; the frontend shaped the journey around its answers.',
      },
      {
        title: 'Treat the support handoff as an outcome',
        body: 'A case that cannot finish online still needs an explanation and a specific next step. I designed these branches as first-class parts of the flow, each with its own screen and message.',
      },
    ],
    stories: [
      {
        title: 'Screens that stay in step with the customer',
        body: 'The saga layer cancelled in-flight frontend work whenever the customer moved to another step, so every screen reflected exactly where they were in the journey.',
      },
      {
        title: 'Guided handoffs to support',
        body: 'For cases that need a person, such as suspected fraud, I built dedicated screens and tests that tell the customer exactly who to contact and what happens next.',
      },
      {
        title: 'One experience across two technologies',
        body: 'I kept navigation and session behaviour consistent between the new React module and the rest of the portal, so customers moved between them without noticing the change in technology.',
      },
    ],
    numbers: [
      { value: '1', label: 'frontend engineer on the module, from migration to tests' },
      { value: '2', label: 'card scenarios, lost and stolen, each with its own path' },
    ],
    process:
      'I treated the migration as a workflow problem: map the online replacement path, find the branches that needed support, and separate request orchestration from rendering. I wrote React Testing Library tests around what the customer sees, and worked through the regulated states and messages with reviewers. That kept the migration focused on preserving the journey, not only on changing its implementation.',
    outcomes: [
      'The replacement module moved from jQuery into the React and TypeScript portal, with request orchestration in one layer and its customer-visible branches covered by tests.',
      'Lost and stolen paths, request tracking and support handoffs now lived in one maintainable frontend module, integrated with the bank’s existing services.',
    ],
    lessons: [
      'Support-handoff states are part of the workflow specification. Agreeing them with risk and compliance early saved rework later.',
      'Request safety spans layers: UI cancellation, the network request and backend duplicate checks each need a clear owner. I now write that down alongside the flow.',
      'Tests written from the customer’s point of view served two audiences: they protected the flow during refactors and gave reviewers a readable record of every branch.',
    ],
    sources: [
      {
        label: 'Wells Fargo: lost wallet and card replacement',
        href: 'https://www.wellsfargo.com/help/lost-wallet/',
      },
    ],
  },
  {
    kind: 'employer',
    slug: 'ola-electric-reservations',
    title: 'Launching Ola Electric’s first scooter',
    summary:
      'I built the pre-booking frontend and product pages for Ola Electric’s first scooter, ahead of reservations opening in July 2021. The booking journey connected phone verification, payment and confirmation, against a fixed public launch date.',
    meta: 'Consumer · Bangalore',
    company: 'Ola Electric',
    logo: 'ola',
    role: 'Senior Frontend Engineer',
    period: 'Mar — Jul 2021',
    stack: ['react', 'mui', 'javascript'],
    glance: ['4-step reservation journey', 'React + Material UI', 'July 2021 launch'],
    blurb:
      'Frontend development for the pre-booking experience behind Ola’s debut electric scooter, launched to significant customer demand.',
    tagline: 'Keep the booking path focused, and make every step transition explicit.',
    facts: [
      { label: 'Company', value: 'Ola Electric' },
      { label: 'My role', value: 'Senior Frontend Engineer' },
      { label: 'Product', value: 'First-scooter reservation portal' },
      {
        label: 'Contribution',
        value: 'Reservation frontend, scooter feature pages and Futurefactory pages',
      },
      { label: 'Timeline', value: 'March–July 2021' },
    ],
    problem: [
      'Ola’s first scooter launch needed two things at once: a product story that made people want the scooter, and a reservation journey that worked for everyone who did. I joined in the months before reservations opened to build the pre-booking portal and the feature pages.',
      'The booking path itself was short: phone number and captcha, one-time code, payment and confirmation. My focus was making every move between those steps smooth on a phone, including the hand-off to the payment provider and back.',
    ],
    ownership: [
      'Built the frontend reservation journey, from phone entry to confirmation.',
      'Built scooter feature pages and Futurefactory pages for the launch.',
      'Worked on compatibility and loading behaviour for mobile and older Android browsers.',
    ],
    constraints: [
      'A fixed public reservation launch in July 2021.',
      'Mostly mobile customers, many on slower connections.',
      'Verification and payment services owned by other teams.',
      'Product pages must not add weight to the booking path.',
    ],
    architecture: [
      'A React reservation app with Material UI themed to the brand.',
      'A route per step: phone entry, verification, payment and confirmation.',
      'Product and factory pages kept separate from the booking app.',
      'Compatibility and loading work for older Android browsers and slower connections.',
    ],
    decisions: [
      {
        title: 'Give each step its own route',
        body: 'A route per step made the customer’s position in the journey explicit, and gave back navigation, refresh and the payment return a defined destination. The backend stayed the source of truth for whether a payment had gone through.',
      },
      {
        title: 'Keep promotional content outside the booking app',
        body: 'The reservation app loaded only what booking needed, while the product story lived on separate pages. That kept the booking path light on mobile, at the cost of coordinating branding and releases across two surfaces.',
      },
      {
        title: 'Use an existing component foundation',
        body: 'Material UI, themed to the brand, let me move quickly under a fixed deadline and spend the time on the journey itself rather than on a component library for four steps.',
      },
    ],
    stories: [
      {
        title: 'A smooth return from payment',
        body: 'I built the return from the payment provider as its own step, with its own states, and showed the reservation only once the backend confirmed the payment.',
      },
      {
        title: 'A booking flow built for phones',
        body: 'Every step had its own route, so a refresh, the back button or a return from the SMS app always landed the customer on the right step. Compatibility work brought older Android browsers onto the same experience.',
      },
    ],
    numbers: [
      { value: '4', label: 'steps from phone entry to confirmation' },
      { value: '100K+', label: 'reservations Ola reported in the first 24 hours' },
    ],
    gallery: [
      {
        src: '/images/work/ola-homepage-2026.webp',
        alt: 'Current Ola Electric homepage with a festive campaign featuring three electric two-wheelers.',
        placement: 'problem',
      },
      {
        src: '/images/work/ola-scooter-range-2026.webp',
        alt: 'The Ola S1 third-generation scooter range on the current Ola Electric website.',
        placement: 'decisions',
      },
      {
        src: '/images/work/ola-booking-2026.webp',
        alt: 'The current Ola Electric booking page: an S1 Pro scooter beside variant and colour choices, and a Continue button.',
        placement: 'contribution',
      },
    ],
    process:
      'I kept the reservation app focused on four steps and moved the product and factory content to separate pages. Material UI provided the component foundation, which left time for step transitions, mobile compatibility and the payment return. With a fixed launch date, the scope call mattered most: the booking path came before additional presentation detail.',
    outcomes: [
      'The reservation frontend and product pages were ready for the opening of reservations in July 2021.',
      'Ola reported more than 100,000 reservations in the first 24 hours, at a refundable ₹499 each.',
    ],
    lessons: [
      'Test on real mobile devices and representative networks early. Desktop checks say little about how a launch journey behaves for customers.',
      'Routing, saved state and payment reconciliation are separate problems. I now map each one, and who owns it, before building a flow like this.',
      'Marketing pages and transactional flows have different performance budgets and release rhythms. Keeping them apart from the start paid off.',
    ],
    sources: [
      {
        label: 'Business Standard: 100,000 bookings within the first 24 hours',
        href: 'https://business-standard.com/article/automobile/ola-s-electric-scooter-receives-100-000-bookings-within-first-24-hours-121071700419_1.html',
      },
      {
        label: 'Autocar Professional: over 100,000 bookings in 24 hours',
        href: 'https://autocarpro.in/news-national/ola-electric-scooter-gets-over-100-000-bookings-in-24-hours-79626',
      },
      {
        label: 'Business Today: S1 and S1 Pro launch, 15 August 2021',
        href: 'https://businesstoday.in/latest/corporate/story/ola-electric-scooter-launch-event-live-updates-price-features-images-specifications-mileage-304213-2021-08-15',
      },
    ],
  },
  {
    kind: 'employer',
    slug: 'shell-wells-digitalisation',
    title: 'Simplifying workflows for Shell’s well engineers',
    summary:
      'At CGI, I built two frontend modules for Shell’s well-engineering platform with Vue, Vuex and Kendo UI. They turned manual, spreadsheet-driven processes into guided forms and data-heavy interfaces, inside a shared platform planned for 35 modules.',
    meta: 'Energy · Bangalore',
    company: 'CGI, for Shell',
    logo: 'shell',
    role: 'Frontend Engineer I',
    period: 'Jan 2019 — Aug 2020',
    stack: ['vue', 'kendo', 'sass', 'javascript'],
    glance: ['2 modules owned', '35-module platform', 'Vue, Vuex + Kendo UI'],
    blurb:
      'Built two modules for a well-engineering platform, turning complex operational processes into structured, data-heavy interfaces.',
    tagline: 'Model the process and its validation before reproducing the spreadsheet.',
    facts: [
      { label: 'Company', value: 'CGI · Shell' },
      { label: 'My role', value: 'Frontend Engineer I' },
      { label: 'Product', value: 'Well-engineering digitalisation platform' },
      { label: 'Contribution', value: 'Two frontend modules within a 35-module platform' },
      { label: 'Timeline', value: 'January 2019–August 2020' },
    ],
    problem: [
      'Well-engineering work combines planning, approvals and reporting, and much of it ran on spreadsheets and email. Moving it onto a platform meant more than recreating tables: the interface had to represent the sequence of the work and check information before it moved to the next step.',
      'CGI’s platform was planned as 35 modules. I built two of them on the frontend, working within the shared architecture and contributing reusable components to the platform library.',
    ],
    ownership: [
      'Built the frontend of two modules: screens, Vuex state, validation and data grids.',
      'Contributed reusable components to the shared platform library.',
      'Optimised rendering and data handling on data-heavy screens.',
    ],
    constraints: [
      'Represent domain-specific workflows for well engineers.',
      'Fit a common frontend architecture shared by several teams.',
      'Handle dense tables and forms at real data volumes.',
      'Meet the project’s SonarQube quality rules.',
    ],
    architecture: [
      'Vue and Vuex within the platform’s shared frontend architecture.',
      'Kendo UI for grids and forms, with SCSS for the platform’s visual styling.',
      'Guided process steps that validate input before the workflow advances.',
      'Reusable components contributed to a common library for other modules.',
    ],
    decisions: [
      {
        title: 'Make workflow steps explicit',
        body: 'Each manual process became a guided sequence with validation, so engineers could see what was required and what came next at every step.',
      },
      {
        title: 'Use a mature grid foundation',
        body: 'Kendo UI supplied sorting, filtering and editing for the grids, so the time went into domain logic rather than rebuilding table mechanics.',
      },
      {
        title: 'Contribute stable patterns to the shared library',
        body: 'Components that proved themselves in my modules went into the platform library, giving other module teams a consistent starting point and engineers a familiar interface across modules.',
      },
    ],
    stories: [
      {
        title: 'Modules that follow the engineers’ workflow',
        body: 'I encoded what happens next and which information each step requires, so validation and navigation follow the engineers’ real sequence of work rather than a flat form.',
      },
      {
        title: 'Fast screens at real data volumes',
        body: 'I tuned rendering and data handling on the data-heavy screens against real data volumes, and those patterns carried over to other modules on the platform.',
      },
    ],
    numbers: [
      { value: '2', label: 'frontend modules I built' },
      { value: '35', label: 'modules planned across the wider platform' },
    ],
    process:
      'I broke each manual process down into steps, inputs and validation rules, then built them on the platform’s Vue and Vuex conventions, with Kendo UI as the grid and form foundation. I tuned rendering and data handling against real data volumes, so the patterns were ready to reuse across the platform.',
    outcomes: [
      'Two manual well-engineering processes now ran as guided, validated workflows on the shared Vue platform.',
      'Reusable components and performance fixes from these modules went into the shared library, benefiting the platform beyond my own screens.',
    ],
    lessons: [
      'Validate the process model with the engineers who do the work. A sequence can be technically correct and still fit their day poorly.',
      'Test with representative data volumes before a rendering pattern spreads across modules.',
      'A shared library is only as useful as its documentation. I would write usage notes alongside every component I contribute.',
    ],
    sources: [
      {
        label: 'CGI: Shell selects CGI as global Key Application Services supplier (2013)',
        href: 'https://www.cgi.com/en/Shell-selects-CGI-as-global-key-Application-Services-supplier',
      },
    ],
  },
]
