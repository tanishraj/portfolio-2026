// Public case studies. Every number here comes from the project's own code,
// commits or docs. Static until step 2 moves content into Payload; the
// protected LibreChat study must only ever live in Payload, never here.

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  meta: string
  locked?: boolean
  tagline?: string
  facts?: { label: string; value: string }[]
  link?: { label: string; href: string }
  problem?: string[]
  decisions?: { title: string; body: string }[]
  numbers?: { value: string; label: string }[]
  process?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'librechat',
    title: 'LibreChat for Liquidity One',
    summary:
      'Taking LibreChat from open-source to an internal AI assistant for a private-credit firm.',
    meta: 'AI · Liquidity Capital',
    locked: true,
  },
  {
    slug: 'anubhav',
    title: 'Anubhav',
    summary:
      'A logbook for postgraduate medical residents that an external examiner can trust. Weekly entries, monthly sign-off, certification.',
    meta: 'Healthtech · In production',
    tagline: 'Replacing a paper logbook with one an external examiner can trust.',
    facts: [
      { label: 'Role', value: 'Solo: product, design, frontend, backend, ops' },
      { label: 'When', value: 'October to November 2026' },
      { label: 'Status', value: 'In production' },
      {
        label: 'Stack',
        value: 'Next.js 16, React 19, TypeScript, Postgres + Prisma, Tailwind, Docker',
      },
    ],
    link: { label: 'anubhav.everleaf.space', href: 'https://anubhav.everleaf.space' },
    problem: [
      'Postgraduate medical residents in India keep a logbook of everything they do: procedures, presentations, postings, teaching. Since PGMER-2023, the National Medical Commission requires it to be a dynamic electronic logbook, updated weekly and authenticated by the guide every month.',
      'On paper, it’s easy to fill a logbook in late and hard for an examiner to tell what was written when. The goal I set was simple to say and hard to build: it should take a resident less than a minute to log an activity, and an external examiner should be able to trust what they read.',
    ],
    decisions: [
      {
        title: 'Records that can’t quietly change',
        body: 'Every save writes an immutable revision. When the guide signs a month, the exact revisions are frozen, and only the HOD can reopen it, with a reason. The certified logbook is rendered once to a PDF and stored with a SHA-256 checksum, so every copy is identical and verifiable.',
      },
      {
        title: 'Access by grants, not role switches',
        body: 'One person can be a guide and an HOD at the same time. Instead of switching roles, every check asks whether one of their grants covers this exact target. A scope that isn’t known matches nobody: the HOD of no department is nobody, not everybody.',
      },
      {
        title: 'Each role gets only the data it needs',
        body: 'Shaping each role’s snapshot to what that role actually shows cut the Dean’s and college admin’s home data from 4.7 MB to 189 KB, and sign-in to home from 1.3 s to 0.5 s on my machine.',
      },
      {
        title: 'Built for a hospital ward, not an office',
        body: 'Connectivity in wards is patchy. Saves wait for the network instead of failing, an offline banner says so, and every submit carries a key so a retry can never create a duplicate. Case references reject names, phone numbers and Aadhaar or ABHA numbers, so patient details stay out.',
      },
      {
        title: 'A PDF that reads like the register it replaces',
        body: 'The logbook is laid out with CSS paged media and rendered in an isolated headless-Chromium sidecar. It renders twice, so the contents page has real page numbers.',
      },
    ],
    numbers: [
      { value: '7', label: 'roles, from resident to external examiner' },
      { value: '~275', label: 'end-to-end checks, signing in as every role' },
      { value: '100,000', label: 'activities in the load test, pages under 2 s' },
      { value: '6', label: 'architecture decision records' },
    ],
    process:
      'I built it over about nine days of commits with Claude Code as a pair programmer. I wrote the product brief, the design system and six architecture decision records, reviewed every change, and ran a security pass before go-live that closed tenant, role and concurrency holes. CI runs type checks, unit and end-to-end tests, a dependency audit and a backup-restore drill on every change.',
  },
  {
    slug: 'notivo',
    title: 'Notivo',
    summary:
      'Watches the National Medical Commission’s notice listing and emails genuinely new notices, exactly once.',
    meta: 'Healthtech · In production',
    tagline: 'Watching a source that doesn’t behave.',
    facts: [
      { label: 'Role', value: 'Solo: design, frontend, backend, ops' },
      { label: 'When', value: 'October 2026' },
      { label: 'Status', value: 'In production, private admin portal' },
      {
        label: 'Stack',
        value: 'Node 24, SQLite, React 19, Vite, Tailwind, Better Auth, Resend, Docker',
      },
    ],
    problem: [
      'Medical colleges have to act on notices from the National Medical Commission, and checking its “What’s New” page by hand means things get missed. So Notivo checks it and emails a small list of people when something new appears.',
      'The hard part is that the source misbehaves. When several notices share a date across a page boundary, the listing shows one twice and hides another. Old notices get re-uploaded under new IDs. Dates arrive as “10 Aug 0202”. And when NMC moved sites, it renumbered every notice.',
    ],
    decisions: [
      {
        title: 'Start silent',
        body: 'On day one, the whole archive of 51 pages is imported as history without sending a single email. The import resumes three pages at a time, so a failure halfway costs nothing.',
      },
      {
        title: 'Three answers instead of two',
        body: 'Each new entry is emailed now, archived quietly, or held for a person to review. Anything uncertain is held: a missing or impossible date, an old notice marked new, or more than five new entries in one check, which usually means a renumbering. Nothing is dropped.',
      },
      {
        title: 'Email exactly once',
        body: 'Saving a notice and queueing its emails happen in one transaction. Each recipient gets one message with a fixed idempotency key. Retries back off, and stop after 23 hours, because the email provider forgets keys after 24. There is deliberately no “resend everything” button.',
      },
      {
        title: 'Fail without lying',
        body: 'A failed parse never moves the cursor forward, and a bot-challenge page is never mistaken for an empty list. A rolling audit of older pages catches back-dated rows, and a notice is only marked removed after three days unseen and a 404 from its PDF.',
      },
    ],
    numbers: [
      { value: '58,510 → 520', label: 'rows read per scan, after one missing index' },
      {
        value: '1,017 vs 1,016',
        label: 'the count mismatch that exposed a duplicate on NMC’s side',
      },
      { value: '~40 MB', label: 'memory for the whole service' },
      { value: '~100', label: 'tests, run against real SQLite and captured NMC pages' },
    ],
    process:
      'It started on Cloudflare Workers with D1. When the free-plan read limit came close, I fixed the query and then moved it to plain Node and SQLite in a single container, within a week of the first commit. CI runs CodeQL and Trivy on every push, with every action pinned to a commit.',
  },
  {
    slug: 'institutional-cms',
    title: 'An institutional CMS, built to be copied',
    summary:
      'An editorial platform on Payload, copied once per client. The first copy runs a medical college’s public website.',
    meta: 'Platform · Design system',
    tagline: 'One editorial platform, copied once per client.',
    facts: [
      { label: 'Role', value: 'Solo: architecture, design system, frontend, ops' },
      { label: 'When', value: 'June to November 2026' },
      { label: 'Status', value: 'First client live' },
      {
        label: 'Stack',
        value: 'Next.js 16, Payload 3, MongoDB, Tailwind, shadcn, Storybook, Vercel',
      },
    ],
    link: { label: 'snmih.in', href: 'https://snmih.in' },
    problem: [
      'Colleges and hospitals need websites that many non-technical people can run: departments, notices, admissions, regulatory pages that change every month. Page builders give them too much freedom; hand-built sites need a developer for every change.',
      'I wanted something in between: a controlled publishing system, not a page builder. Editors get a catalogue of well-made blocks and clear permissions. The platform is copied once per client rather than run as shared SaaS.',
    ],
    decisions: [
      {
        title: 'Blocks as a product',
        body: '61 page blocks, each with a Storybook story, typed props and labelled controls. Block thumbnails in the editor are real screenshots, generated by a script.',
      },
      {
        title: 'Permissions that fail closed',
        body: 'Two roles and 29 feature grants. Site managers can be limited to their own section of the page tree, and the last admin can never be demoted or deleted.',
      },
      {
        title: 'Trust boundaries written down',
        body: 'Four architecture decision records: public reads never bypass access control, tests only ever touch an isolated test database, uploads are checked by file signature, and private form attachments live in a separate bucket, with a build step that fails if one ever leaks into the output.',
      },
      {
        title: 'A codebase AI agents can work in',
        body: 'A machine-generated inventory of every block, plus project skills for agents, kept in sync by scripts and tests. Agents get correct context instead of guessing.',
      },
      {
        title: 'The first client',
        body: 'The college’s site adds a monthly regulatory disclosure system: copy a month all-or-nothing, then publish it in one step. It also runs scheduled backups, two-factor sign-in and automatic redirects when a page moves.',
      },
    ],
    numbers: [
      { value: '742', label: 'commits on the platform' },
      { value: '61', label: 'page blocks in the catalogue' },
      { value: '84', label: 'Storybook stories' },
      { value: '280', label: 'test files, plus 224 on the client site' },
    ],
    process:
      'Planned and built with AI agents throughout: hundreds of written plans and specs, with ADRs for the decisions that matter. I set the architecture and the rules, and reviewed what the agents produced against them.',
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)
