// Public case studies. Every number here comes from the project's own code,
// commits or docs (see the research notes kept outside the repo). The protected
// LibreChat study's body lives only in Payload, never here.

import type { BrandKey } from '@/components/BrandIcon'

import { employerStudies } from './employer-studies'

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  meta: string
  /** Selected work is independent or current; employer studies are earlier roles. */
  kind: 'selected' | 'employer'
  locked?: boolean
  company?: string
  logo?: BrandKey
  role?: string
  period?: string
  /** For a protected study: what can be said publicly, as short points. */
  publicPoints?: string[]
  stack?: BrandKey[]
  glance?: string[]
  /** One short line for the study's tile on the home page. */
  blurb?: string
  cover?: { src: string; alt: string }
  tagline?: string
  facts?: { label: string; value: string }[]
  link?: { label: string; href: string }
  /** The situation and why it was hard. */
  problem?: string[]
  /** What I was personally responsible for, one line each. */
  ownership?: string[]
  /** The limits the design had to respect. */
  constraints?: string[]
  /** How it fits together, one line each. */
  architecture?: string[]
  decisions?: { title: string; body: string; tradeoff?: string }[]
  /** Hard problems from the commit history, and how they were solved. */
  stories?: { title: string; body: string }[]
  numbers?: { value: string; label: string }[]
  gallery?: { src: string; alt: string; caption: string }[]
  process?: string
  /** What I'd keep or change, written after the fact. */
  lessons?: string[]
  next?: string[]
  /** Public sources for the facts quoted about the company or product. */
  sources?: { label: string; href: string }[]
}

export const selectedStudies: CaseStudy[] = [
  {
    kind: 'selected',
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
    kind: 'selected',
    slug: 'anubhav',
    title: 'Anubhav',
    summary:
      'A digital logbook for postgraduate doctors. Guides sign each month, and the final PDF can’t be quietly changed. Built in ten days, in use at a college since.',
    meta: 'Healthtech · In production',
    stack: ['nextjs', 'react', 'typescript', 'postgres', 'prisma', 'tailwind', 'docker'],
    glance: ['7 roles', '4.7 MB → 189 KB', '100k activities < 2 s'],
    blurb:
      'A digital logbook for postgraduate doctors, with monthly sign-off and a PDF that can’t be quietly changed.',
    cover: {
      src: '/images/work/anubhav-signin.webp',
      alt: 'Anubhav sign-in page: “Your training record, approved and certified”, with the weekly, monthly and HOD steps.',
    },
    tagline: 'A paper logbook, replaced by one an examiner can trust.',
    facts: [
      { label: 'Role', value: 'Everything: product, design, frontend, backend, ops' },
      { label: 'When', value: 'October to November 2026' },
      { label: 'Status', value: 'In production at a medical college' },
      { label: 'Built with', value: 'Next.js 16, Postgres 17, Prisma, Docker, Claude Code' },
    ],
    link: { label: 'anubhav.everleaf.space', href: 'https://anubhav.everleaf.space' },
    problem: [
      'Postgraduate doctors in India keep a logbook of everything they do in training. Since 2023 the National Medical Commission wants that logbook to be electronic, updated weekly and signed off by the guide every month. The college I built this for was still on paper: a 108-page booklet, mostly scanned forms.',
      'Paper has two problems. You can’t prove an entry was made on time, and a signature can be added months later. I set myself two goals that pull in opposite directions: a tired resident should be able to log an activity in under a minute, and an external examiner should be able to trust every line.',
    ],
    constraints: [
      'The regulation decides the workflow: weekly entries, monthly sign-off, a quarterly appraisal, and certification by the head of department before the exam.',
      'Most entries happen on phones in wards, at night, on patchy networks.',
      'One person can be a guide and a head of department at the same time, so permissions have to combine rather than switch.',
      'A case reference may only be a hospital number. Never a patient’s name or phone number.',
    ],
    architecture: [
      'Next.js with 82 server actions. Each one re-reads the user, re-checks permissions in the database, and writes its audit and notification rows in the same transaction.',
      'Postgres with 26 models. Every save writes a new revision, and a monthly sign-off records exactly which revisions it covers.',
      'Sessions live in the database, so removing someone cuts their access immediately. Passwords use scrypt, and five wrong attempts lock the account.',
      'PDFs come from an isolated headless Chromium, laid out once in print CSS. The preview in the app is the real PDF.',
      'One small server in India runs the app, Postgres, a virus scanner and the PDF service in Docker, with encrypted backups copied off-site every night.',
    ],
    decisions: [
      {
        title: 'A certified logbook is a frozen file',
        body: 'At certification the PDF is rendered once and stored with its checksum, so every copy an examiner sees is identical and can be verified. The live logbook freezes too, until the head of department revokes the certificate with a reason.',
        tradeoff:
          'Improvements to the template never reach logbooks that are already certified. That’s deliberate.',
      },
      {
        title: 'Permissions are grants',
        body: 'Every check asks whether one of the person’s grants covers this exact target. A scope the system doesn’t recognise matches nobody.',
        tradeoff:
          'More queries per check than a simple role flag. Worth it for zero accidental access.',
      },
      {
        title: 'Each role sees only its own data',
        body: 'The browser caches a snapshot shaped to the signed-in person. Deans get counts rather than every activity; faculty see a 90-day window.',
        tradeoff:
          'A head of department’s snapshot still grows with department size, so the review inbox needs paging next.',
      },
      {
        title: 'Erasure means minimisation',
        body: 'Deleting a person would break the approvals and signatures that refer to them. After the retention period, contact details go and the name and registration number stay with the record.',
      },
    ],
    stories: [
      {
        title: 'The 4.7 MB home page',
        body: 'A Dean’s snapshot was 4.7 MB, sent on every load. Shaping it by role cut it to 189 KB, and sign-in to home went from 1.3 s to 0.5 s. A load test now checks every main page stays under 2 s with about 100,000 activities.',
      },
      {
        title: 'The go-live security pass',
        body: 'Before launch I went looking for holes and found four, including one that let any college reset an external examiner’s password. Login attempts are now recorded before the password check, approvals take a per-student lock, and CSV exports are escaped.',
      },
      {
        title: 'One mistyped command',
        body: 'The seed script emptied whichever database it was pointed at. One typo on the server would have wiped real data. Now anything that empties a database refuses unless the database name ends in _demo or _test.',
      },
    ],
    numbers: [
      { value: '7', label: 'roles, from resident to external examiner' },
      { value: '189 KB', label: 'Dean’s snapshot, down from 4.7 MB' },
      { value: '42', label: 'end-to-end phases, signing in as every role' },
      { value: '10 days', label: 'from first commit to production' },
    ],
    gallery: [
      {
        src: '/images/work/anubhav-signin.webp',
        alt: 'Anubhav sign-in page with the three-step weekly, monthly and HOD flow',
        caption: 'The sign-in page explains the whole workflow in three lines.',
      },
    ],
    process:
      'Ten calendar days with Claude Code as pair programmer, and most commits say so. I wrote the product brief, the design system and six decision records, and I reviewed every change against them. Accessibility target is WCAG 2.2 AA, checked by axe in the browser suite.',
    next: [
      'Server-side paging for the head of department’s review inbox.',
      'A PDF in the university’s own format.',
      'Attendance, and languages other than English.',
    ],
  },
  {
    kind: 'selected',
    slug: 'notivo',
    title: 'Notivo',
    summary:
      'Emails new notices from the National Medical Commission to the college, once each. The board duplicates and renumbers its own entries, so “once each” was the whole job.',
    meta: 'Healthtech · In production',
    stack: ['node', 'sqlite', 'react', 'vite', 'tailwind', 'betterauth', 'resend', 'docker'],
    glance: ['58,510 → 520 rows', '1,017 notices watched', '~40 MB memory'],
    blurb:
      'Emails each new notice from the medical regulator exactly once, from a board that renumbers itself.',
    cover: {
      src: '/images/work/notivo-overview.webp',
      alt: 'Notivo admin overview: monitor healthy, 1,014 unique NMC notices tracked, latest notices listed.',
    },
    tagline: 'Watching a notice board that keeps changing its mind.',
    facts: [
      { label: 'Role', value: 'Everything: design, frontend, backend, ops' },
      { label: 'When', value: 'One week in October 2026' },
      { label: 'Status', value: 'In production, private admin portal' },
      { label: 'Built with', value: 'Node 24, SQLite, React 19, Resend, Docker' },
    ],
    problem: [
      'Medical colleges have to act on notices from the National Medical Commission. The notices sit on a “What’s New” page: more than 1,000 entries, 20 to a page, no feed, no alerts. A new one can appear on any page, so checking by hand misses things.',
      'The page is also unreliable in ways you only discover by watching it. IDs aren’t in order. Some dates have the year “0202”. When notices share a date across a page break, one shows twice and another disappears. Old notices come back under new IDs. A simple scraper either misses notices or emails old ones as new.',
    ],
    constraints: [
      'Never email the same notice twice. Never silently drop one.',
      'One private admin and a fixed list of up to 20 recipients.',
      'It started on Cloudflare’s free plan, with a daily limit on database reads. Today it’s one container using about 40 MB of memory.',
    ],
    architecture: [
      'A timer wakes every minute, checks the board every 15 minutes, and sends due emails on every wake. A database lease stops two cycles overlapping.',
      'Fetching is strict. If the table, the “Showing X–Y of Z” line or a link looks wrong, nothing is saved and the cursor doesn’t move.',
      'One SQLite transaction saves notices, history, queued emails and the page cursor together. Each email has a fixed key, so a retry can’t send twice.',
      'The admin portal is React with Vite and shadcn/ui, behind Better Auth with 8-hour sessions.',
    ],
    decisions: [
      {
        title: 'Three outcomes for every new entry',
        body: 'Email it now, record it quietly, or hold it for the admin. Anything doubtful is held: an impossible date, an old notice marked new, or more than five new entries in one check, which usually means the board was renumbered.',
        tradeoff: 'Some notices wait for a person. That beats either kind of mistake.',
      },
      {
        title: 'A notice is its download link',
        body: 'Titles change and IDs aren’t in order, but the document link is stable. Entries without one are matched by title and date until a link appears.',
        tradeoff:
          'A recent notice re-uploaded under a new link can be emailed twice. Rare, and written down.',
      },
      {
        title: 'Retries stop at 23 hours',
        body: 'The email provider forgets idempotency keys after 24. After 23 the delivery is marked “uncertain” for a person to check, and there is no “resend everything” button on purpose.',
      },
    ],
    stories: [
      {
        title: '58,510 rows, then 520',
        body: 'Each check was quietly reading about 65,000 rows, close to the free plan’s daily limit. One missing index on the notice lookup was the cause. With it, the same test case read 520 rows instead of 58,510.',
      },
      {
        title: '1,017 versus 1,016',
        body: 'The overview counted one more notice than the board listed. The board had deleted notice 884, a duplicate of 404. Now a notice unseen for three days whose PDF returns 404 is marked “Removed by NMC”.',
      },
      {
        title: 'Leaving Cloudflare in a morning',
        body: 'I moved from Workers and D1 to one Node container with SQLite in three pull requests before lunch. The data moved with its migration history while the old app was paused, so nothing was emailed twice.',
      },
    ],
    numbers: [
      { value: '520', label: 'rows read per check, down from 58,510' },
      { value: '1,017', label: 'notices watched' },
      { value: '~40 MB', label: 'memory for the whole service' },
      { value: '0', label: 'duplicate emails, by design' },
    ],
    gallery: [
      {
        src: '/images/work/notivo-overview.webp',
        alt: 'Notivo overview with health banner, notice counts and latest notices',
        caption:
          'The overview, from a local copy with a placeholder admin. The labels are careful: “Accepted by Resend”, never “delivered”.',
      },
      {
        src: '/images/work/notivo-archive.webp',
        alt: 'Notivo notice archive with search and filters',
        caption: 'The archive of every notice seen, with search and filters.',
      },
    ],
    process:
      'A week, with Claude Code helping, from first commit to production. The portal is calm and explicit about state: colour only ever appears next to a text label, and “unique notices tracked” is not the same as “entries on the board”, so it doesn’t say so.',
    next: [
      'Delivery and bounce tracking through webhooks.',
      'Spotting a changed PDF behind the same link.',
      'Digest emails, and sources beyond the NMC.',
    ],
  },
  {
    kind: 'selected',
    slug: 'institutional-cms',
    title: 'An institutional CMS, built to be copied',
    summary:
      'A website platform on Payload, copied once per client. The medical college runs on it and the staff publish without asking me.',
    meta: 'Platform · Design system',
    stack: ['payload', 'nextjs', 'mongodb', 'tailwind', 'shadcn', 'storybook', 'vercel'],
    glance: ['61 blocks', '2,934 integration tests', '0 high-severity deps'],
    blurb:
      'A website platform on Payload, copied once per client, that staff publish on without asking me.',
    cover: {
      src: '/images/work/snmih-home.webp',
      alt: 'snmih.in home page: “Learn Medicine. Serve Humanity.” hero for a medical college, built on the platform.',
    },
    tagline: 'One website platform, copied once for each client.',
    facts: [
      { label: 'Role', value: 'Everything: architecture, design system, frontend, ops' },
      { label: 'When', value: 'June to November 2026' },
      { label: 'Status', value: 'First client live at snmih.in' },
      { label: 'Built with', value: 'Next.js 16, Payload 3, MongoDB, Storybook, Claude Code' },
    ],
    link: { label: 'snmih.in', href: 'https://snmih.in' },
    problem: [
      'Colleges and hospitals need websites that a lot of non-technical people can run: departments, notices, admissions, and regulatory pages that change every month. Page builders give editors too much freedom and the site drifts. Hand-built sites need a developer for every change.',
      'I wanted the thing in between. Editors get a catalogue of well-made blocks and clear permissions, and the whole platform is copied once per client so nobody’s data or access is shared.',
    ],
    constraints: [
      'Two roles only, Admin and Site Manager, because that’s how institutions actually work.',
      'Media has to live in durable storage. The app refuses to start in production with local-disk files.',
      'The first release was cut to five outcomes. The 242-item feature list is a backlog, not a promise.',
    ],
    architecture: [
      'Next.js and Payload in one TypeScript app: 23 collections and 9 globals.',
      'One block registry. Every block shares a section schema, and a duplicate name stops the app from starting. Editors pick from 61 blocks.',
      'Permissions: 29 features an Admin can grant to a Site Manager, denied by default, with scoping to one branch of the page tree.',
      'Every block has a Storybook story, reviewed at desktop, phone and dark mode. The thumbnails editors see are real screenshots generated by a script.',
      'A generated inventory of every block and a set of instructions for AI agents, kept current by tests.',
    ],
    decisions: [
      {
        title: 'One deployment per client',
        body: 'Clean data and security boundaries, and no tenant switching to get wrong.',
        tradeoff: 'Fixes have to be carried between copies by hand. See the backport below.',
      },
      {
        title: 'Payload’s own editor',
        body: 'An earlier experiment with a custom visual editor mostly duplicated what Payload already does. Editors fill in fields and watch the live preview.',
      },
      {
        title: 'Permissions fail closed',
        body: 'A missing grant means no access. Granting a feature also grants read access to what it depends on, and the last Admin can never be demoted.',
        tradeoff: 'The access layer is query-heavy, so it’s cached per request.',
      },
      {
        title: 'Theme tokens, no colour pickers',
        body: 'Two presets with contrast-tested text pairs. An editor can’t pick a colour that fails.',
      },
    ],
    stories: [
      {
        title: 'The home page that couldn’t be cached',
        body: 'The layout checked who the visitor was on every request, so the home page took about 2 seconds to first byte and was never cached. I split it into a cacheable public shell and loaded the editor toolbar afterwards. It serves from the edge cache now.',
      },
      {
        title: 'Drafts that could leak',
        body: 'Payload’s server-side API skips access checks unless you ask, so unapproved reviews could reach search and the sitemap. The fix touched 19 files, and every public reader now goes through one access wrapper with regression tests.',
      },
      {
        title: 'The September backport',
        body: 'The college’s site grew features the platform didn’t have: two-factor sign-in, ranked search, secure downloads, backups. One backport of 124 files brought them home, so the next client starts with all of it.',
      },
    ],
    numbers: [
      { value: '61', label: 'blocks in the catalogue' },
      { value: '2,934', label: 'integration tests passing' },
      { value: '21 → 0', label: 'high-severity dependency issues' },
      { value: '742', label: 'commits on the platform' },
    ],
    gallery: [
      {
        src: '/images/work/snmih-home.webp',
        alt: 'The snmih.in home page',
        caption:
          'snmih.in, the first client: admissions, departments, notices and a monthly regulatory disclosure system.',
      },
    ],
    process:
      'Planned and built with AI agents from the start, with written plans for the work and decision records for the things that matter. I set the architecture and the rules and reviewed what the agents produced. The college’s site adds a monthly disclosure system, scheduled celebration banners, and careers forms whose CVs go to a private bucket.',
    next: [
      'Watch a real editor use it and fix what they trip on.',
      'Prove a full production restore.',
      'Start the second client from the platform, not from the first client.',
    ],
  },
]

export const caseStudies: CaseStudy[] = [...selectedStudies, ...employerStudies]

// The home page's Work section: the current AI platform, then four earlier
// products. The independent projects live in the Beyond 9–5 row instead.
const workSlugs = [
  'librechat',
  'wells-fargo-card-replacement',
  'ola-electric-reservations',
  'shell-wells-digitalisation',
]
export const workStudies: CaseStudy[] = workSlugs.map((slug) =>
  caseStudies.find((study) => study.slug === slug)!,
)

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)
