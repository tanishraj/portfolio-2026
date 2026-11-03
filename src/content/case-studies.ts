// Public case studies. Every number here comes from the project's own code,
// commits or docs (see the research notes kept outside the repo). The protected
// LibreChat study's body lives only in Payload, never here.

import type { BrandKey } from '@/components/BrandIcon'

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  meta: string
  locked?: boolean
  stack?: BrandKey[]
  glance?: string[]
  cover?: { src: string; alt: string }
  tagline?: string
  facts?: { label: string; value: string }[]
  link?: { label: string; href: string }
  /** The situation and why it was hard. */
  problem?: string[]
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
  next?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'librechat',
    title: 'LibreChat for LiquidityOne',
    summary:
      'Taking LibreChat from open-source to an internal AI assistant for a private-credit firm.',
    meta: 'AI · Liquidity Capital',
    locked: true,
    stack: ['react', 'node', 'mongodb', 'anthropic'],
    glance: ['Open source → internal', 'Private credit'],
  },
  {
    slug: 'anubhav',
    title: 'Anubhav',
    summary:
      'An e-logbook for postgraduate medical residents that an external examiner can trust: weekly entries, monthly sign-off, certification.',
    meta: 'Healthtech · In production',
    stack: ['nextjs', 'react', 'typescript', 'postgres', 'prisma', 'tailwind', 'docker'],
    glance: ['7 roles', '4.7 MB → 189 KB', '100k activities < 2 s'],
    cover: {
      src: '/images/work/anubhav-signin.webp',
      alt: 'Anubhav sign-in page: “Your training record, approved and certified”, with the weekly, monthly and HOD steps.',
    },
    tagline: 'Replacing a paper logbook with one an external examiner can trust.',
    facts: [
      { label: 'Role', value: 'Solo: product, design, frontend, backend, ops' },
      { label: 'When', value: 'October to November 2026' },
      { label: 'Status', value: 'In production at a medical college' },
      { label: 'Built with', value: 'Next.js 16, Postgres 17, Prisma, Docker, Claude Code' },
    ],
    link: { label: 'anubhav.everleaf.space', href: 'https://anubhav.everleaf.space' },
    problem: [
      'Postgraduate medical residents in India log everything they do during training: procedures, presentations, postings, teaching. Since PGMER-2023, the National Medical Commission requires that record to be a dynamic electronic logbook, updated every week (§5.2(vi)) and authenticated by the guide every month (§5.2(vii)). An April 2024 notice made it mandatory from the 2023–24 batch.',
      'The college I built it for was still on paper: a 108-page logbook, mostly scanned forms. On paper you can’t prove the weekly updates happened, a signature can be added months later, and nobody gets an honest view of where a resident stands until the exam. I set two goals that pull against each other: logging an activity should take a tired resident less than a minute, and an external examiner should be able to trust every line.',
    ],
    constraints: [
      'Regulation decides the workflow: weekly entries, monthly guide sign-off, quarterly appraisal and HOD certification before the exam. A Senior Resident can review, but can’t sign a month.',
      'Most entries happen on phones in wards, OPD and ICU: bright light, dim night duty, patchy networks.',
      'One person can hold several roles at once, such as HOD and guide, so permissions combine instead of switching.',
      'Patient privacy under India’s DPDP Act 2023: a case reference may only be a hospital number, never a name or phone number.',
      'It runs on one small VPS in an Indian region, so it has to be cheap to host and boring to operate.',
    ],
    architecture: [
      'Next.js 16 App Router with 82 Server Actions. Each action re-reads the user from the session, re-checks permissions in the database and writes its audit and notification rows in the same transaction.',
      'Postgres 17 through Prisma: 26 models. Every save writes an immutable revision; a monthly sign-off records the exact entry and revision pairs it covers.',
      'Sessions in the database, not JWTs: a random 256-bit token in an httpOnly cookie, stored only as a SHA-256 hash, with scrypt passwords and lockout after five wrong attempts.',
      'PDFs from an isolated headless-Chromium sidecar (Gotenberg), laid out once in print CSS. The in-app preview is the real PDF.',
      'Uploads are virus-scanned with ClamAV, sniffed for real content type, staged and claimed in the same transaction as the save.',
      'Docker Compose on the VPS: Caddy, the app, Postgres, ClamAV and the PDF sidecar, each memory-capped. Nightly and hourly encrypted backups go off-site.',
      'CI runs type checks, lint, unit tests, a dependency audit, a backup-restore drill, and the browser suite in four parallel shards against a production build.',
    ],
    decisions: [
      {
        title: 'A certified logbook is a frozen file',
        body: 'At certification the PDF is rendered once and stored with its SHA-256 checksum, so every copy an examiner sees is identical and verifiable. The live logbook freezes too, until the HOD revokes the certificate with a reason.',
        tradeoff: 'Template improvements never reach logbooks already certified. That’s the point.',
      },
      {
        title: 'Grants, not role switching',
        body: 'Every check asks whether one of the person’s grants covers this exact target. A scope the system doesn’t recognise matches nobody: the HOD of no department is nobody, not everybody.',
        tradeoff:
          'More queries per check than a simple role flag, in exchange for no accidental access.',
      },
      {
        title: 'Database sessions over JWTs',
        body: 'Removing, deactivating or archiving someone has to cut their access immediately, not when a token expires.',
        tradeoff: 'One indexed lookup on every request.',
      },
      {
        title: 'Shape the data by role',
        body: 'The browser caches a snapshot of what the signed-in person can see. Deans and admins get counts rather than every activity; faculty see a 90-day window.',
        tradeoff:
          'An HOD’s snapshot still grows with department size, so the review inbox needs server paging next.',
      },
      {
        title: 'Erasure means minimisation',
        body: 'Deleting a person would break the approvals and signatures that refer to them. After the retention period, contact details are removed and the name and registration number stay with the record.',
      },
      {
        title: 'Signatures attest at signing time',
        body: 'A signature uploaded later never re-stamps an earlier month. What was signed stays as it was signed.',
      },
    ],
    stories: [
      {
        title: 'The 4.7 MB home page',
        body: 'A Dean’s snapshot was 4.7 MB, sent on every load. Shaping it by role cut it to 189 KB, and sign-in to home went from 1.3 s to 0.5 s, measured with 100 students over three years. A load test now checks every main page stays under 2 s with about 100,000 activities.',
      },
      {
        title: 'The go-live security pass',
        body: 'Before launch I went looking for holes and found four: any college with a grant could reset an external examiner’s password; parallel password guesses could slip past the limit; two guides approving at once could collide; and CSV exports were open to formula injection. Attempts are now recorded before the password check, approvals take a per-student lock, and exports are escaped.',
      },
      {
        title: 'One mistyped command',
        body: 'The seed script emptied whichever database it was pointed at. One typo on the server would have wiped real data. Now anything that empties a database refuses unless the database name ends in _demo or _test.',
      },
      {
        title: 'The demo that aged',
        body: 'Demo mode freezes “today”, but recorded timestamps kept real time, so a week later every demo activity looked late and the browser suite failed on every branch. Fixing that, and splitting a 23-minute suite into four shards, made CI something people trust again.',
      },
    ],
    numbers: [
      { value: '7', label: 'roles, from resident to external examiner' },
      { value: '82', label: 'server actions, each re-checking permissions' },
      { value: '189 KB', label: 'Dean’s snapshot, down from 4.7 MB' },
      { value: '42', label: 'end-to-end phases, signing in as every role' },
      { value: '102', label: 'unit tests' },
      { value: '10 days', label: 'from first commit to production' },
    ],
    gallery: [
      {
        src: '/images/work/anubhav-signin.webp',
        alt: 'Anubhav sign-in page with the three-step weekly, monthly and HOD flow',
        caption: 'Sign-in: the whole NMC flow in three lines, before anyone logs in.',
      },
    ],
    process:
      'I built it over ten calendar days with Claude Code as a pair programmer, and most commits say so. I wrote the product brief, the design system (“Register & Seal”: violet only for genuinely signed records, marigold for the one next step) and six architecture decision records, and I reviewed every change against them. The accessibility target is WCAG 2.2 AA, checked by axe in the browser suite.',
    next: [
      'Server-side paging for the HOD’s review inbox.',
      'University-format PDF export.',
      'Attendance, configurable assessment templates, and languages other than English.',
    ],
  },
  {
    slug: 'notivo',
    title: 'Notivo',
    summary:
      'Watches the National Medical Commission’s notice board and emails genuinely new notices, exactly once, despite a source that misbehaves.',
    meta: 'Healthtech · In production',
    stack: ['node', 'sqlite', 'react', 'vite', 'tailwind', 'betterauth', 'resend', 'docker'],
    glance: ['58,510 → 520 rows', '1,017 notices watched', '~40 MB memory'],
    cover: {
      src: '/images/work/notivo-overview.webp',
      alt: 'Notivo admin overview: monitor healthy, 1,014 unique NMC notices tracked, latest notices listed.',
    },
    tagline: 'Watching a source that doesn’t behave.',
    facts: [
      { label: 'Role', value: 'Solo: design, frontend, backend, ops' },
      { label: 'When', value: 'October 2026, in a week' },
      { label: 'Status', value: 'In production, private admin portal' },
      { label: 'Built with', value: 'Node 24, SQLite, React 19, Resend, Docker' },
    ],
    problem: [
      'Medical colleges have to act on notices from the National Medical Commission. They appear on a “What’s New” page: a table of more than 1,000 entries, 20 to a page, with no feed and no alerts. A new notice can turn up on any page, so checking by hand means things get missed.',
      'The source is also unreliable in ways you only learn by watching it. IDs aren’t in order. Some years are wrong (“10 Aug 0202”). When notices share a date across a page break, one shows twice and another hides. Old notices get re-uploaded under new IDs, and when NMC moved sites it renumbered everything. A naive scraper either misses notices or emails old ones as new.',
    ],
    constraints: [
      'Never email the same notice twice, and never silently drop one.',
      'One private admin, and a small, fixed list of up to 20 recipients.',
      'It started on Cloudflare’s free plan (5 million database row reads a day). Today it is one container using about 40 MB of memory.',
      'Small, fixed work per cycle: at most three recent pages and two older pages per check, and five emails per run.',
    ],
    architecture: [
      'A timer wakes every minute. It checks NMC every 15 minutes by default and sends due emails on every wake. A database lease stops cycles overlapping.',
      'Fetching is strict: a 15-second timeout, redirects treated as failures, HTML only. If the table, the “Showing X–Y of Z” range or a link doesn’t look right, nothing is saved.',
      'The first import loads the whole 51-page archive three pages at a time, sending nothing. After that, every check reads the newest pages plus two older ones, so the full archive is re-audited about every six hours.',
      'One SQLite transaction saves notices, their history, queued emails, held entries and the page cursor together.',
      'Emails go through Resend with one message per recipient and a key derived from the delivery, so a retry can’t send twice.',
      'The admin portal is React 19 with Vite and shadcn/ui, behind Better Auth with 8-hour sessions. The Resend key is stored encrypted.',
      'CI runs the tests, CodeQL and Trivy, with every action pinned to a commit.',
    ],
    decisions: [
      {
        title: 'Three answers instead of two',
        body: 'Each new entry is emailed now (NEW badge, or published in the last 30 days), recorded quietly (older, with a valid date), or held for the admin to decide. Anything doubtful is held: an impossible date, an old notice marked new, or more than five new entries in one check, which usually means NMC renumbered.',
        tradeoff: 'Some notices wait for a person. That beats either kind of mistake.',
      },
      {
        title: 'A notice is its download ID',
        body: 'Titles change and IDs aren’t in order, but the document link is stable. Entries without one are matched by title and date until a link appears.',
        tradeoff: 'A re-upload of a recent notice can be emailed twice. Known, documented, rare.',
      },
      {
        title: 'Email exactly once',
        body: 'Saving a notice and queueing its emails happen in one transaction. Each message is fixed before sending, with a deterministic idempotency key. Retries back off, and stop after 23 hours, because Resend forgets keys after 24; the delivery is then marked “uncertain” for a person to check.',
        tradeoff: 'There is deliberately no “resend everything” button.',
      },
      {
        title: 'Stop on anything unexpected',
        body: 'A failed parse never moves the cursor forward, and a bot-challenge page is never read as “zero notices”.',
      },
    ],
    stories: [
      {
        title: '58,510 rows, then 520',
        body: 'Each check was quietly reading about 65,000 rows: 3.5 million of the 4.5 million read per day, close to the free plan’s 5 million limit. One missing index on the notice lookup was the cause. With it, the same test case read 520 rows instead of 58,510.',
      },
      {
        title: '1,017 versus 1,016',
        body: 'The overview counted one more notice than NMC listed. NMC had deleted notice 884, a duplicate of 404. Now a notice unseen for three days whose PDF returns 404 or 410 is marked “Removed by NMC” and counted separately.',
      },
      {
        title: 'The day old notices were emailed as new',
        body: 'On 27 October the audit sweep found two re-listed old notices and emailed them as announcements. That led to the 30-day rule and the review queue, and to cleaning out rows that page-break glitches had created.',
      },
      {
        title: 'Leaving Cloudflare in two hours',
        body: 'I moved from Cloudflare Workers and D1 to one Node container with SQLite in three pull requests on one morning (47 files, 349 lines added, 2,011 removed). The data moved with its migration history while the old app was paused, so nothing was emailed twice.',
      },
    ],
    numbers: [
      { value: '520', label: 'rows read per check, down from 58,510' },
      { value: '1,017', label: 'NMC notices watched' },
      { value: '~40 MB', label: 'memory for the whole service' },
      { value: '102', label: 'tests, against real SQLite and saved NMC pages' },
      { value: '15', label: 'commits, from first idea to production' },
      { value: '0', label: 'duplicate emails by design' },
    ],
    gallery: [
      {
        src: '/images/work/notivo-overview.webp',
        alt: 'Notivo overview with health banner, notice counts and latest notices',
        caption:
          'Overview, from a local copy with a placeholder admin: honest labels like “Accepted by Resend”, never “delivered”.',
      },
      {
        src: '/images/work/notivo-archive.webp',
        alt: 'Notivo notice archive with search and filters',
        caption: 'The archive of every notice seen, with search and filters.',
      },
    ],
    process:
      'A week of work with Claude Code helping, from the first commit to production. The admin portal’s design (“The Operating Desk”) is calm and explicit about state: colour only ever appears with a text label, and wording is careful. “Unique notices tracked” is not “entries on NMC”.',
    next: [
      'Delivery and bounce tracking through Resend webhooks.',
      'Detecting a changed PDF behind the same link.',
      'Digest emails, more than one admin, and sources beyond NMC.',
    ],
  },
  {
    slug: 'institutional-cms',
    title: 'An institutional CMS, built to be copied',
    summary:
      'An editorial platform on Payload, copied once per client. The first copy runs a medical college’s public website.',
    meta: 'Platform · Design system',
    stack: ['payload', 'nextjs', 'mongodb', 'tailwind', 'shadcn', 'storybook', 'vercel'],
    glance: ['61 blocks', '2,934 integration tests', '0 high-severity deps'],
    cover: {
      src: '/images/work/snmih-home.webp',
      alt: 'snmih.in home page: “Learn Medicine. Serve Humanity.” hero for a medical college, built on the platform.',
    },
    tagline: 'One editorial platform, copied once per client.',
    facts: [
      { label: 'Role', value: 'Solo: architecture, design system, frontend, ops' },
      { label: 'When', value: 'June to November 2026' },
      { label: 'Status', value: 'First client live at snmih.in' },
      { label: 'Built with', value: 'Next.js 16, Payload 3, MongoDB, Storybook, Claude Code' },
    ],
    link: { label: 'snmih.in', href: 'https://snmih.in' },
    problem: [
      'Colleges and hospitals need websites that many non-technical people can run: departments, notices, admissions, and regulatory pages that change every month. Page builders give editors too much freedom and the site drifts. Hand-built sites need a developer for every change.',
      'I wanted something in between: a controlled publishing system rather than a page builder. Editors get a catalogue of well-made blocks and clear permissions. The platform is copied once per client instead of run as shared SaaS, so every client’s data and access stay separate.',
    ],
    constraints: [
      'Exactly two roles, Admin and Site Manager, because that is how institutions actually work.',
      'Durable media only: the app refuses to start in production with local-disk storage.',
      'A pinned toolchain and a dependency audit with written exceptions.',
      'The first-client release was cut to five outcomes. A 242-item feature catalogue stays a backlog, not a promise.',
    ],
    architecture: [
      'Next.js 16 and Payload 3 in one TypeScript app: 23 collections, 9 globals.',
      'One block registry: every block shares a section schema and an anchor, and a duplicate name stops startup. Editors pick from 61 blocks in six groups.',
      'Access: 29 features an Admin can grant to Site Managers, denied by default, plus scoping to a branch of the page tree.',
      'Public pages are pre-rendered and refreshed when content is published. Today the live site serves from cache at the edge.',
      'Every block has a Storybook story with typed props, reviewed at desktop, 390 px and in dark mode. Editor thumbnails are real screenshots generated by a script.',
      'Agent tooling: a generated inventory of every block and project skills for AI agents, updated and checked after every change.',
    ],
    decisions: [
      {
        title: 'One deployment per client',
        body: 'Clean data and security boundaries, and no tenant switching to get wrong.',
        tradeoff: 'Fixes have to be carried between copies, as in the September backport below.',
      },
      {
        title: 'Payload’s own editor, no custom canvas',
        body: 'An earlier experiment showed a custom visual editor mostly duplicates what Payload already does. Editors fill in fields and see Live Preview.',
      },
      {
        title: 'Permissions that fail closed',
        body: 'A missing grant means no access. Granting a feature also grants read access to what it depends on, and the last Admin can never be demoted.',
        tradeoff: 'The access layer is query-heavy, so it is cached per request.',
      },
      {
        title: 'Trust boundaries written down',
        body: 'Four architecture decision records. Public reads go through wrappers that enforce access, because Payload’s server-side API skips checks by default. Tests only ever touch a database whose name ends in _test. Uploads are checked by file signature.',
      },
      {
        title: 'Theme tokens instead of colour pickers',
        body: 'Two presets with contrast-tested text pairs. Editors can’t pick a colour that fails.',
      },
    ],
    stories: [
      {
        title: 'The homepage that couldn’t be cached',
        body: 'The layout authenticated the visitor on every request, so the homepage took about 2.1 s to first byte and was sent as no-store. I split it into a cacheable public shell, loaded the editor toolbar after the page, and held analytics until consent. The live site now serves from cache.',
      },
      {
        title: 'Drafts that could leak',
        body: 'Because the server-side API skips access checks unless told otherwise, unapproved reviews could reach search, the sitemap and preview images. The fix touched 19 files, and every new public reader now has to use the access wrapper, backed by regression tests.',
      },
      {
        title: 'Five versions of Payload',
        body: 'A grouped dependency bump left Payload packages on five different versions and broke the build. Now they are pinned together.',
      },
      {
        title: 'The September backport',
        body: 'The college’s site grew features the platform didn’t have: optional two-factor sign-in, ranked search, secure downloads, backups. One backport of 124 files brought them home, so the next client starts with all of it.',
      },
    ],
    numbers: [
      { value: '61', label: 'page blocks in the catalogue' },
      { value: '2,934', label: 'integration tests passing' },
      { value: '333', label: 'Storybook entries' },
      { value: '21 → 0', label: 'high-severity dependency issues' },
      { value: '29', label: 'grantable features, denied by default' },
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
      'Planned and built with AI agents throughout: hundreds of written plans and specs, with decision records for what matters. I set the architecture and the rules, and reviewed what the agents produced against them. The college’s site adds a monthly disclosure system (copy a month as drafts, all or nothing, then publish it in one step), scheduled celebration banners that respect reduced motion, and careers forms whose CVs go to a private bucket.',
    next: [
      'Watch a real editor use it and fix what they trip on.',
      'Prove a full production restore and real email delivery.',
      'Start the second client from the platform, not from the first client.',
    ],
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)
