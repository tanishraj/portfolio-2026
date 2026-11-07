// Case studies from employment, newest first. Written at the level of decisions
// and architecture: no internal data, no screenshots. Numbers are either public
// or Tanish's own measures; public facts are linked under each study's sources.

import type { CaseStudy } from './case-studies'

export const employerStudies: CaseStudy[] = [
  {
    kind: 'employer',
    slug: 'bsf-digital-bank',
    title: 'Rebranding a bank’s legacy platforms',
    summary:
      'The Customer Happiness Portal, the React Native banking app, and the new BSF identity carried across legacy web platforms at Banque Saudi Fransi.',
    meta: 'Banking · Dubai',
    company: 'Banque Saudi Fransi',
    logo: 'bsf',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2022 — Jun 2024',
    stack: ['react', 'nextjs', 'typescript', 'chakra', 'githubactions'],
    glance: ['3 platforms, 1 design language', '15% faster pages', 'Web + React Native'],
    blurb:
      'A bank’s new identity carried across legacy platforms through design tokens, without a rewrite.',
    tagline: 'A new identity landing on old code, while the new app was still being built.',
    facts: [
      { label: 'Role', value: 'Senior frontend engineer; led the frontend side of the rebrand' },
      { label: 'When', value: 'October 2022 to June 2024' },
      { label: 'Products', value: 'Customer Happiness Portal, the mobile banking app, legacy web' },
      { label: 'Built with', value: 'React, Next.js, TypeScript, Chakra UI, React Native' },
    ],
    problem: [
      'Banque Saudi Fransi is one of Saudi Arabia’s long-established banks. In June 2024 it completed a full rebrand to “BSF”, with a new identity designed by the agency R/GA and a revamped website and app. The switch was public and immediate, so the new brand had to be ready on every screen customers and staff use, on the same day.',
      'Those screens weren’t one codebase. There were web platforms built up over many years, a Customer Happiness Portal that support staff use to resolve customers’ problems, and a mobile banking app being rebuilt in React Native at the same time. None of them could stop for the rebrand, and nobody had budget to rewrite the old ones first.',
      'I worked across all three and led the frontend side of the rebrand: deciding how a new identity lands on old code, and making sure it landed the same way everywhere.',
    ],
    ownership: [
      'The frontend approach to the rebrand: the tokens, the theme layer over legacy code, and the order the platforms moved in.',
      'Feature work on the Customer Happiness Portal in React, and on the mobile banking app in React Native.',
      'Moving customer-facing pages to Next.js and TypeScript, and the performance work that came with the move.',
      'Monitoring and alerting in the release pipeline, set up with the DevOps team.',
    ],
    constraints: [
      'A bank’s release process. Every change goes through security review and staged environments, so the work had to come in small, reversible steps.',
      'The rebrand couldn’t wait for the legacy platforms to be rebuilt.',
      'One switch date for every channel, shared with marketing and the rest of the bank.',
      'Designs arrived pixel-perfect and were checked pixel-perfect.',
    ],
    architecture: [
      'Customer-facing web on Next.js with TypeScript and Chakra UI, because Chakra’s theme object let one set of brand tokens drive every component.',
      'The mobile app in React Native, using the same token names as the web, so a colour or spacing decision meant the same thing on both.',
      'The rebrand as a theme layer over the legacy platforms: tokens first, then component by component.',
      'Monitoring and alerting wired into the CI/CD pipeline, so each release reported its own health.',
    ],
    decisions: [
      {
        title: 'Rebrand through tokens',
        body: 'Every legacy platform got the new identity as a theme layer: colours, type, spacing and radii as tokens over existing components. It landed on time without a rewrite nobody had budget for.',
        tradeoff:
          'Some old components could only get close to the new look. I kept a list of those for the rebuild instead of forcing them.',
      },
      {
        title: 'One set of names for web and mobile',
        body: 'Brand values were named once and used by the web platforms and the React Native app alike. A change to the brand became one change, not one per codebase.',
        tradeoff: 'Agreeing names with design took longer up front than copying values would have.',
      },
      {
        title: 'Make design review cheap',
        body: 'Pixel-perfect handoff was slowing both sides down. Shared tokens and a component inventory that matched the design files meant designers could check against named parts instead of measuring screenshots.',
        tradeoff: 'Building the inventory took time away from features in the first weeks.',
      },
      {
        title: 'Use the rebuild to get faster',
        body: 'Moving pages to Next.js gave me code splitting and server rendering, and I used the move to cut what each page loaded. By my measure, pages were about 15% faster afterwards.',
        tradeoff: 'Pages moved one at a time, so two stacks ran side by side for a while.',
      },
      {
        title: 'Alerts in the pipeline',
        body: 'Releases got monitoring and alerting as part of the pipeline rather than as an afterthought, so a bad release showed up in minutes instead of in customer complaints. By the team’s measure, reliability improved by about 20%.',
      },
    ],
    stories: [
      {
        title: 'Components that couldn’t take a token',
        body: 'Some legacy components had colours and sizes written straight into their styles. They were wrapped or patched one by one, and the few that could only get close went on a list for the rebuild rather than being forced.',
      },
      {
        title: 'Two brands at once',
        body: 'The old identity had to stay live while the new one was built and reviewed. Because the brand lived in one theme layer, the new look could be reviewed in staging behind the old one and switched over together.',
      },
      {
        title: 'Pixel-perfect, at scale',
        body: 'Checking every screen against design by eye doesn’t scale across three platforms. Named components that matched the design files turned review into “is this the right part”, which designers could answer quickly.',
      },
    ],
    numbers: [
      { value: '3', label: 'platforms carrying one design language' },
      { value: '15%', label: 'faster pages after the rebuild, by my measure' },
      { value: '20%', label: 'better reliability with pipeline monitoring, by the team’s measure' },
    ],
    process:
      'Bank work taught me to ship in small reversible steps and to design the review process itself. Shared tokens, a named component inventory and monitoring in the pipeline did more for speed than any clever code.',
    lessons: [
      'I’d agree token names with design before the first component, not alongside it. Most rework came from names that changed.',
      'The list of components that could only get close was worth more than any of the patches. It became the rebuild’s plan.',
    ],
    sources: [
      {
        label: 'BSF: rebrand press release',
        href: 'https://bsf.sa/english/news/rebrand-press-release',
      },
      {
        label: 'Gulf News: Banque Saudi Fransi announces its rebranding as BSF',
        href: 'https://gulfnews.com/business/banking/banque-saudi-fransi-announces-its-rebranding-as-bsf-1.1717676588070',
      },
      {
        label: 'The Brand Berries: the new identity by R/GA',
        href: 'https://thebrandberries.com/banque-saudi-fransi-rebrands-to-become-bsf-where-tradition-and-innovation-meet/',
      },
    ],
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
    role: 'Senior Frontend Engineer',
    period: 'Jul 2021 — Sep 2022',
    stack: ['react', 'reduxsaga', 'typescript', 'testinglibrary', 'jest'],
    glance: ['Single contributor', 'jQuery → React', 'Tested with RTL'],
    blurb:
      'The online flow for replacing a lost or stolen card, moved from jQuery to React by one engineer.',
    tagline: 'One engineer, one flow that a lot of people need on a bad day.',
    facts: [
      { label: 'Role', value: 'Senior frontend engineer, single contributor on the module' },
      { label: 'When', value: 'July 2021 to September 2022' },
      { label: 'Scope', value: 'Online card replacement, lost and stolen flows' },
      { label: 'Built with', value: 'React, TypeScript, Redux Saga, React Testing Library' },
    ],
    problem: [
      'When a card is lost or stolen, the customer is already having a bad day. Wells Fargo lets them report it and request a replacement online, and updates their eligible digital wallets as part of the same request, so they can keep paying with their phone until the new card arrives.',
      'By 2021 that online flow mattered more than ever. Branches stopped issuing instant debit cards after November 2020, and temporary cards ended in April 2021. For most customers, the website became the fastest way to a new card.',
      'I owned the front end of the replacement module and moved it from a legacy jQuery application into the React and TypeScript customer portal. The happy path is short. The hard part is everything around it: knowing when a case can’t be finished online, such as suspected fraud, and getting the customer to the right person with the right information instead of a dead end.',
    ],
    ownership: [
      'The replacement module’s front end, as its single contributor: architecture, components, state and tests.',
      'Moving its screens out of the jQuery application and into the React portal.',
      'Every branch of the flow, including the ones that end in a phone call.',
      'Walking risk and compliance reviewers through each state and message.',
    ],
    constraints: [
      'One engineer on the module, so the architecture had to be simple enough to hold in one head and tested well enough to change safely.',
      'A regulated flow. Every state, message and handoff was reviewed by risk and compliance.',
      'The new React portal had to run alongside the jQuery pages it was replacing.',
      'Customers arrive worried and often on a phone, so every step had to be clear the first time.',
    ],
    architecture: [
      'React with TypeScript, with Redux Saga handling the multi-step request: report, verify, choose delivery, confirm, with retries and cancellation in sagas rather than in components.',
      'Business rules kept out of the UI layer, so eligibility and handoff logic could be tested on their own.',
      'The portal took over the replacement screens while the rest of the jQuery application kept working around them.',
      'React Testing Library tests that follow the screens a customer sees, including every “you need to call us” branch.',
    ],
    decisions: [
      {
        title: 'Sagas for the long-running flow',
        body: 'Card replacement is a sequence of requests with branches, timeouts and the chance the customer goes back a step. Modelling it as sagas kept that logic in one place and made the branches testable.',
        tradeoff: 'More ceremony than hooks for a small flow. This flow wasn’t small.',
      },
      {
        title: 'Rules outside the components',
        body: 'Whether a card can be replaced online, and what happens if it can’t, lived in plain functions with their own tests. Screens only asked the question and showed the answer.',
        tradeoff: 'More files for a reader to follow than putting the checks inline.',
      },
      {
        title: 'Move the whole flow at once',
        body: 'The replacement flow moved to React as one piece, so a customer never crossed between the old app and the new one in the middle of a request.',
        tradeoff: 'A bigger first release than moving screen by screen.',
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
    stories: [
      {
        title: 'Going back a step',
        body: 'Customers change their minds halfway, about delivery or about the card itself. Sagas cancel the request in flight when they go back, so a back-step can never submit the same request twice.',
      },
      {
        title: 'The case that can’t finish online',
        body: 'Some cases, such as suspected fraud, have to end with a person. Each of those branches has its own screen, its own reason and its own test, so none of them ends in a generic error.',
      },
      {
        title: 'Two apps, one customer',
        body: 'For a while the new React screens sat inside an older jQuery application. Keeping navigation and session behaviour consistent between them mattered more to customers than anything new on the screens.',
      },
    ],
    numbers: [
      { value: '1', label: 'frontend engineer on the module' },
      { value: 'Nov 2020', label: 'when branches stopped issuing instant debit cards' },
      { value: 'Apr 2021', label: 'when temporary debit cards ended, leaving mail replacement' },
    ],
    process:
      'This is where I learnt to own something end to end: the architecture, the edge cases, the tests and the conversations with risk and compliance. It’s also where I became careful about failure paths, which shows in everything I’ve built since.',
    lessons: [
      'I’d write the list of handoff cases with risk and compliance before writing any screen. Every late change came from one of those branches.',
      'Tests written from the customer’s side were the best documentation the module had. The next engineer read them first.',
    ],
    sources: [
      {
        label: 'Wells Fargo: lost wallet and card replacement',
        href: 'https://www.wellsfargo.com/help/lost-wallet/',
      },
      {
        label: 'Travel With Grant: instant-issue debit cards end after 30 November 2020',
        href: 'https://travelwithgrant.boardingarea.com/2020/11/22/wells-fargo-discontinues-instant-issue-debit-cards-effective-november-30/',
      },
      {
        label: 'Travel With Grant: temporary debit cards end after 1 April 2021',
        href: 'https://travelwithgrant.boardingarea.com/2021/02/22/wells-fargo-discontinues-temporary-debit-cards-atm-access-code-feature-effective-april-1/',
      },
    ],
  },
  {
    kind: 'employer',
    slug: 'ola-electric-reservations',
    title: 'Reservations for Ola’s first scooter',
    summary:
      'Four months in 2021 building the pre-booking portal and feature pages for Ola Electric’s first scooter, ahead of a launch that took 100,000 reservations in a day.',
    meta: 'Consumer · Bangalore',
    company: 'Ola Electric',
    logo: 'ola',
    role: 'Senior Frontend Engineer',
    period: 'Mar — Jul 2021',
    stack: ['react', 'mui', 'javascript'],
    glance: ['100k reservations in 24 h', '₹499 refundable', '4-step flow'],
    blurb:
      'The pre-booking portal for Ola’s first scooter, which took over 100,000 reservations in its first day.',
    tagline: 'Four months to build a flow the whole country would try on the same evening.',
    facts: [
      { label: 'Role', value: 'Senior frontend engineer on the reservation portal and site' },
      { label: 'When', value: 'March to July 2021' },
      { label: 'Scope', value: 'Pre-booking portal, feature and Futurefactory pages' },
      { label: 'Built with', value: 'React, Material UI' },
    ],
    problem: [
      'Ola Electric opened reservations for its first scooter on the evening of 15 July 2021: a refundable ₹499 to hold a place. The company reported more than 100,000 reservations in the first 24 hours and called it the most pre-booked scooter in the world. A month later, on 15 August, it unveiled the S1 and S1 Pro, built at its Futurefactory in Krishnagiri, Tamil Nadu.',
      'I joined for the months before reservations opened, to build the portal and the feature pages around it. The flow was short: phone number and captcha, a one-time code, payment, confirmation.',
      'A short flow that a huge number of people hit at the same moment is a different problem from a long flow used by a few people a day. Every step has to be fast, forgiving of flaky phone networks, and impossible to get stuck in.',
    ],
    ownership: [
      'The front end of the reservation portal: the four steps from phone number to confirmation.',
      'Feature pages for the scooter and pages for the Futurefactory.',
      'Making the flow work on older Android phones and slow networks.',
    ],
    constraints: [
      'A fixed public date, with marketing already running.',
      'Peak traffic packed into the first hours, far beyond anything the site had seen.',
      'Most users on phones, many on slow connections.',
      'Payment through several kinds of provider, each leaving the site and coming back in its own way.',
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
        tradeoff: 'More state to restore on each route than a single-screen wizard would need.',
      },
      {
        title: 'Keep the booking app small',
        body: 'It loaded only what the booking needed. The product story lived on other pages.',
        tradeoff: 'Two apps to deploy and keep consistent instead of one.',
      },
      {
        title: 'Theme a library, don’t build one',
        body: 'With four months and a fixed date, Material UI themed to the brand was faster and safer than hand-built components. Each step imported only the parts it used.',
        tradeoff: 'Heavier than hand-built components. The date mattered more.',
      },
      {
        title: 'Build for the worst phone in the queue',
        body: 'The audience was the whole country, not a design agency’s laptop. Older Android browsers were tested and supported, not assumed away.',
      },
    ],
    stories: [
      {
        title: 'Everyone at once',
        body: 'On the first evening most of the traffic arrived together. Keeping the booking app small and the marketing pages separate meant the busiest path loaded the least.',
      },
      {
        title: 'Losing signal halfway',
        body: 'On mobile networks, connections drop between steps. With a route per step, a refresh put people back where they were instead of at the start of the queue.',
      },
      {
        title: 'The payment round trip',
        body: 'Paying meant leaving the site for a provider and coming back. The return had to land on the right step, whichever provider it came from.',
      },
    ],
    numbers: [
      { value: '100,000+', label: 'reservations in the first 24 hours, as reported by Ola' },
      { value: '₹499', label: 'refundable reservation' },
      { value: '4', label: 'steps from phone number to confirmation' },
      { value: '4 months', label: 'from joining to launch' },
    ],
    process:
      'Four months with an immovable date. The lesson that stayed with me: when the launch moment is the product, cut everything that isn’t on the path and make the path survive bad networks.',
    lessons: [
      'I’d load-test the exact launch-evening path earlier, with real phones on real networks, rather than trusting desktop numbers.',
      'Separating the story from the booking was the best decision on the project. I’d make it on day one next time, not week three.',
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
    slug: 'rakuten-card-apply',
    title: 'The Rakuten Card application form',
    summary:
      'The online application for Rakuten Card, Japan’s largest card by shopping transaction value, built in React from Rakuten’s Bangalore centre.',
    meta: 'Banking · Bangalore',
    company: 'Rakuten',
    logo: 'rakuten',
    role: 'Frontend Engineer',
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
    title: 'Tools for Shell’s well engineers',
    summary:
      'Two modules of a 35-module platform CGI built for Shell’s well engineers, replacing manual, error-prone processes with Vue.',
    meta: 'Energy · Bangalore',
    company: 'CGI, for Shell',
    logo: 'shell',
    role: 'Frontend Engineer I',
    period: 'Jan 2019 — Aug 2020',
    stack: ['vue', 'kendo', 'sass', 'javascript'],
    glance: ['35 modules, 2 mine', 'Manual → automated', 'Vue + Kendo UI'],
    blurb:
      'Two modules of a platform for Shell’s well engineers, each replacing a manual process with a guided flow.',
    tagline: 'Spreadsheets and email, replaced one module at a time.',
    facts: [
      { label: 'Role', value: 'Frontend engineer on two of the platform’s modules' },
      { label: 'When', value: 'January 2019 to August 2020' },
      { label: 'Client', value: 'Shell, through CGI’s Subsurface and Wells work' },
      { label: 'Built with', value: 'Vue, Vuex, Kendo UI, SCSS' },
    ],
    problem: [
      'In 2013 Shell chose CGI as a lead supplier of application services for its technical IT, including the Subsurface and Wells portfolio, delivered from the Netherlands, North America, the UK and India. I worked on that portfolio from CGI’s Bangalore centre.',
      'Well engineering runs on a long chain of planning, approvals and reports, and a lot of it was still done by hand in spreadsheets and email. Manual steps are slow, and in this domain a transcription error is expensive.',
      'The platform was started from scratch in Vue and planned as 35 modules, each replacing one manual process. I built two of them: taking a process that lived in people’s inboxes and turning it into a guided flow with validation, so the data was right the first time.',
    ],
    ownership: [
      'Two modules end to end on the front end: screens, state, validation and the data grids engineers work in.',
      'Reusable components contributed back to the platform’s shared library.',
      'Performance fixes on the data-heavy screens, before the pattern spread to other modules.',
    ],
    constraints: [
      'Users were engineers: dense data, many fields, no patience for anything slow.',
      'A new codebase shared by many teams, so conventions mattered more than cleverness.',
      'SonarQube quality rules on every change.',
      'Each module replaced a process people already knew, so it had to be clearly better on the first day.',
    ],
    architecture: [
      'Vue with Vuex for state, on a shared front-end architecture used across the 35 modules.',
      'Kendo UI for the data-heavy grids and forms engineers live in, styled with SCSS to match the platform.',
      'Each manual process modelled as a sequence of steps, with validation at every step before data moved on.',
      'Reusable components contributed back to the platform library so later modules could build on them.',
    ],
    decisions: [
      {
        title: 'Guided flows instead of long forms',
        body: 'Breaking each manual process into a guided sequence with validation at every step produced clean data and removed the back-and-forth that used to happen by email.',
        tradeoff: 'More clicks for an expert who already knew every field.',
      },
      {
        title: 'Kendo UI for the heavy grids',
        body: 'Engineers work in large tables. A commercial grid that already handled sorting, filtering and big data sets was a better use of time than building one.',
        tradeoff: 'Its own styling and conventions to work around.',
      },
      {
        title: 'Build the library, not just the feature',
        body: 'Anything used twice went into the shared library. With 35 modules in flight, that was the most useful thing one engineer could do.',
        tradeoff: 'Library-quality components took longer than one-off ones.',
      },
      {
        title: 'Fix performance before it spreads',
        body: 'The first versions were slow with real data volumes. Profiling and fixing the render and data-handling issues before more modules copied the pattern saved every team that came after.',
      },
    ],
    stories: [
      {
        title: 'A process that lived in inboxes',
        body: 'The first job on each module was finding out how the work really happened: who sent what to whom, and where mistakes crept in. The steps in the module came from that, not from a form.',
      },
      {
        title: 'Real data volumes',
        body: 'Screens that felt fine with test data slowed down with an engineer’s real data. The fix went in before other modules copied the pattern.',
      },
      {
        title: 'One codebase, many teams',
        body: 'With many teams building modules at once, shared components and conventions were what kept 35 modules feeling like one product.',
      },
    ],
    numbers: [
      { value: '35', label: 'modules planned for the platform' },
      { value: '2', label: 'modules I built, each replacing a manual process' },
      { value: '2013', label: 'when Shell chose CGI for its Subsurface and Wells applications' },
    ],
    process:
      'My first greenfield platform and my first enterprise domain. On a big shared codebase, the reusable library and the conventions are the product, and performance problems are cheapest to fix before anyone copies them.',
    lessons: [
      'I’d sit with an engineer doing the manual process before designing a single screen. The best steps in my modules came from watching, not from the requirement documents.',
      'I’d test with production-sized data from the first week. Performance surprises came from test data that was too small.',
    ],
    sources: [
      {
        label: 'CGI: Shell selects CGI as global Key Application Services supplier (2013)',
        href: 'https://www.cgi.com/en/Shell-selects-CGI-as-global-key-Application-Services-supplier',
      },
    ],
  },
  {
    kind: 'employer',
    slug: 'thomson-reuters',
    title: 'Templates, sprites and the first single-page apps',
    summary:
      'Three years at Thomson Reuters’ Bangalore technology centre, from associate to senior developer: CSS templates and page-weight work, then single-page apps in Vue and React, and an internal tool that won awards.',
    meta: 'Enterprise · Bangalore',
    company: 'Thomson Reuters',
    logo: 'thomsonreuters',
    role: 'Associate to Senior Web Developer',
    period: '2016 — Dec 2018',
    stack: ['html5', 'css', 'javascript', 'vue', 'react', 'reactrouter'],
    glance: [
      'Associate to senior in a year',
      'Site-wide CSS templates',
      'Awards for Snippet Portal',
    ],
    tagline: 'The fundamentals, learnt on a very large website.',
    facts: [
      {
        label: 'Role',
        value: 'Associate web developer from 2016, senior web developer from 2017',
      },
      { label: 'When', value: '2016 to December 2018' },
      { label: 'Where', value: 'Thomson Reuters, Bangalore technology centre' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript, Vue and Flux, React, React Router' },
    ],
    problem: [
      'Thomson Reuters’ Bangalore campus was one of its largest technology centres, serving the financial, legal and tax businesses in the years before the 2018 split that created Refinitiv. I joined as an associate web developer in 2016, was made a senior developer in 2017, and spent those years on the fundamentals of frontend work at scale.',
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
      'Browser automation for the pages that mattered most, with Selenium WebDriver in Java.',
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
        body: 'The Snippet Portal, a Vue app, gave other developers a shared, searchable library of headers, snippets and patterns. It streamlined common work for the team and earned several awards for creativity and ownership.',
      },
    ],
    numbers: [
      { value: '1 yr', label: 'from associate to senior web developer' },
      { value: 'Several', label: 'awards for the Snippet Portal' },
    ],
    process:
      'Everything since has been built on what this job taught me: CSS is architecture, bytes are a feature, and the most valuable thing you can build is often the tool your own team needed.',
  },
]
