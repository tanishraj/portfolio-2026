// The three independent case studies. Every measurement comes from the project's
// own records. The protected LibreChat body lives only in Payload.

import type { BrandKey } from '@/components/BrandIcon'

import { employerStudies } from './employer-studies'

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  meta: string
  /** Independent projects and employment, including the current role. */
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
  /** Concrete implementation problems described in the project record. */
  stories?: { title: string; body: string }[]
  numbers?: { value: string; label: string }[]
  gallery?: {
    src: string
    alt: string
    caption?: string
    placement?: 'problem' | 'decisions' | 'contribution'
  }[]
  /** Approach and validation, before the implementation details. */
  process?: string
  /** Delivered behaviour, observed results and limits of the evidence. */
  outcomes?: string[]
  /** What I'd keep or change, written after the fact. */
  lessons?: string[]
  next?: string[]
  /** Public sources for the facts quoted about the company or product. */
  sources?: { label: string; href: string }[]
}

export const selectedStudies: CaseStudy[] = [
  {
    kind: 'selected',
    slug: 'anubhav',
    title: 'From paper logbooks to reviewable training records',
    summary:
      'I designed and built Anubhav for a medical college: a digital logbook that connects residents’ activity records to faculty approvals and a fixed PDF at certification. The challenge was making daily entry simple while preserving what each reviewer had approved.',
    meta: 'Healthtech · In production',
    stack: ['nextjs', 'react', 'typescript', 'postgres', 'prisma', 'tailwind', 'docker'],
    glance: ['7 roles', 'Revision-based approvals', '4.7 MB → 189 KB snapshot'],
    blurb:
      'Replacing paper training records with revision-based approvals and a fixed PDF at certification.',
    cover: {
      src: '/images/work/anubhav-signin.webp',
      alt: 'Anubhav sign-in page: “Your training record, approved and certified”, with the weekly, monthly and HOD steps.',
    },
    tagline: 'Make daily entry easy, and make approval history explicit.',
    facts: [
      {
        label: 'Company',
        value: 'Independent project',
      },
      {
        label: 'My role',
        value: 'Product, design, full-stack engineering and operations',
      },
      {
        label: 'Product',
        value: 'Postgraduate medical training logbook',
      },
      {
        label: 'Contribution',
        value: 'Built and deployed the complete product for a medical college',
      },
      {
        label: 'Timeline',
        value: 'October–November 2026',
      },
    ],
    link: {
      label: 'anubhav.everleaf.space',
      href: 'https://anubhav.everleaf.space',
    },
    problem: [
      'The college recorded postgraduate medical training in a 108-page paper logbook. Residents documented activities, guides signed monthly records, and the head of department certified the final submission. Paper made it difficult to establish when an entry changed or which version a signature covered.',
      'Moving the booklet online would solve storage, but leave the approval problem intact. I needed to connect each sign-off to a specific revision of the record, while keeping activity entry practical for residents using phones during clinical work.',
    ],
    constraints: [
      'Support the college’s weekly entries, monthly sign-off, quarterly appraisal and final departmental certification.',
      'Combine permissions when a faculty member is both a guide and a head of department.',
      'Keep the interface usable on phones and avoid collecting patient names or phone numbers in case references.',
      'Run the complete service on modest, self-managed infrastructure.',
    ],
    architecture: [
      'Next.js server actions re-read the signed-in user and check database-backed permissions before changing records. Related audit and notification rows are written in the same transaction.',
      'PostgreSQL stores activity revisions. A monthly approval refers to the revisions reviewed, rather than a record that can later change underneath it.',
      'Accounts are issued by the college, and an administrator can revoke access at any time.',
      'A separate rendering service generates the PDF from print CSS. At certification, the generated file and its checksum are stored; the app previews that PDF.',
    ],
    decisions: [
      {
        title: 'Approve revisions, then freeze the certified output',
        body: 'Monthly approval records which revisions a guide reviewed. Final certification stores one PDF and freezes the live logbook until the head of department revokes certification with a reason. Later edits and template improvements never change a file that has already been certified, and its stored checksum lets the college confirm that a copy matches it.',
      },
      {
        title: 'Evaluate permissions against the target record',
        body: 'Every permission is scoped to the records it covers, and anything not explicitly granted is denied. A faculty member can hold several responsibilities at once, such as guide and head of department, which mirrors how the college actually works.',
      },
      {
        title: 'Send each role only the data it needs',
        body: 'The Dean’s view receives aggregate counts instead of all activity records, and faculty views use a 90-day window. This reduced the data transferred without changing the underlying activity history.',
      },
    ],
    stories: [
      {
        title: 'A Dean’s dashboard at a fraction of the size',
        body: 'I shaped the Dean’s snapshot around exactly what the page shows, cutting it from 4.7 MB to 189 KB. In the recorded test, sign-in to the home page went from 1.3 seconds to 0.5.',
      },
      {
        title: 'Security reviewed before launch',
        body: 'Before launch, I reviewed every role boundary, sign-in protection, concurrent approvals and data exports, and hardened each one before real records went in.',
      },
      {
        title: 'Tooling that is safe by default',
        body: 'Scripts that reset or seed data refuse to run against production, so live training records are never at risk from a mistyped command.',
      },
    ],
    numbers: [
      {
        value: '7',
        label: 'supported roles, including resident and external examiner',
      },
      {
        value: '189 KB',
        label: 'Dean’s snapshot, down from 4.7 MB in the recorded comparison',
      },
      {
        value: '42',
        label: 'end-to-end phases covering the role-based workflows',
      },
      {
        value: '10 days',
        label: 'from first commit to production',
      },
    ],
    gallery: [
      {
        src: '/images/work/anubhav-signin.webp',
        alt: 'Anubhav sign-in page with the three-step weekly, monthly and HOD flow',
        caption: 'The sign-in page explains the whole workflow in three lines.',
      },
    ],
    process:
      'I translated the paper workflow into explicit entry, review and certification states, and recorded the important decisions in six architecture records. I worked with Claude Code as an implementation partner: I set the product and architecture constraints, and reviewed every change it made. Before launch, I ran the role-based workflows end to end, checked accessibility with axe, and ran a security and performance review.',
    next: [
      'Paginate the head of department’s review inbox.',
      'Support the university’s required PDF format.',
      'Evaluate attendance and additional languages after validating the core workflow.',
    ],
    ownership: [
      'Defined the product brief, review workflow and interface, then built the application and data model.',
      'Implemented scoped permissions, revision history, monthly approvals and PDF certification.',
      'Deployed and operated the service, including backups, performance checks and a pre-launch security review.',
    ],
    outcomes: [
      'The college now has an in-use digital workflow from activity entry through faculty approval to a fixed certification file.',
      'The implementation preserves the relationship between an approval and the version reviewed. The snapshot comparison also demonstrates a concrete reduction in transferred data.',
      'Seven roles, from resident to external examiner, work in one system, each seeing only the records their responsibilities cover.',
    ],
    lessons: [
      'An approval system needs version boundaries before it needs polished screens. Otherwise an edit can change the meaning of an earlier signature.',
      'I would establish review-queue pagination and a repeatable performance baseline earlier, before aggregate snapshots grow with the institution.',
      'Ten days forced hard scope decisions. Knowing what to leave out, such as attendance and extra languages, mattered as much as what went in.',
    ],
  },
  {
    kind: 'selected',
    slug: 'notivo',
    title: 'Reliable alerts from an unreliable notice board',
    summary:
      'I built Notivo to monitor medical-regulator notices for a college. The difficult part was deciding whether a changing entry was genuinely new, and handling uncertain email attempts without blindly resending them.',
    meta: 'Healthtech · In production',
    stack: ['node', 'sqlite', 'react', 'vite', 'tailwind', 'betterauth', 'resend', 'docker'],
    glance: ['58,510 → 520 rows read', 'Queued email retries', 'Manual review for ambiguity'],
    blurb:
      'Monitoring regulator notices with deduplication, bounded retries and explicit handling of uncertain sends.',
    cover: {
      src: '/images/work/notivo-overview.webp',
      alt: 'Notivo admin overview: monitor healthy, 1,014 unique NMC notices tracked, latest notices listed.',
    },
    tagline:
      'Separate a new notice from a changed listing, and a send attempt from a delivered email.',
    facts: [
      {
        label: 'Company',
        value: 'Independent project',
      },
      {
        label: 'My role',
        value: 'Design, full-stack engineering and operations',
      },
      {
        label: 'Product',
        value: 'Regulatory notice monitoring and email alerts',
      },
      {
        label: 'Contribution',
        value: 'Source ingestion, notice identity, email queue and admin portal',
      },
      {
        label: 'Timeline',
        value: 'October 2026',
      },
    ],
    problem: [
      'The college needed to act on new National Medical Commission notices without repeatedly checking a paginated notice board. A monitor could automate that work, but treating each unseen listing ID as a new notice produced the wrong answer.',
      'The source repeated and renumbered entries, contained invalid dates and sometimes moved notices across page boundaries. I needed to separate document identity from listing identity, and preserve ambiguous cases for review instead of silently discarding them.',
    ],
    constraints: [
      'Reduce duplicate alerts while making uncertain notices and email attempts visible to the admin.',
      'Serve a private admin and a small, fixed list of recipients.',
      'Initially fit Cloudflare’s free-tier read limits; later operate as a small container.',
      'Avoid advancing the source cursor when the page cannot be parsed reliably.',
    ],
    architecture: [
      'A scheduler wakes each minute, polls the board every 15 minutes and processes due email attempts. A database lease coordinates overlapping cycles.',
      'The parser validates the table, pagination summary and links. A validation failure leaves the stored cursor unchanged.',
      'A SQLite transaction records notices, history, queued email work and the cursor together. Each email request uses a stable idempotency key for retries.',
      'A private React and Vite admin portal behind authentication. It distinguishes provider acceptance from delivery to a recipient.',
    ],
    decisions: [
      {
        title: 'Make uncertainty an explicit state',
        body: 'Invalid dates, old notices marked new and unusually large batches are held for review. More than five apparently new entries in a check is treated as a possible renumbering event. A genuine batch can also trigger this threshold, so the admin reviews held notices before alerts are sent.',
      },
      {
        title: 'Use document links as the primary identity',
        body: 'A download link is more stable than a listing ID. Entries without a link are matched by title and date until a link becomes available. A re-upload under a new URL can still look new, and detecting a changed PDF behind the same URL is the next step.',
      },
      {
        title: 'Bound retries by the provider’s guarantee',
        body: 'Resend retains idempotency keys for 24 hours. Notivo stops automatic retries at 23 hours and marks the attempt uncertain for a person to investigate.',
      },
    ],
    stories: [
      {
        title: 'Cutting database reads by 99%',
        body: 'Profiling the monitor’s most frequent query showed a notice lookup reading 58,510 rows. A targeted index brought that to 520 rows for the same case.',
      },
      {
        title: 'An archive that keeps its history',
        body: 'When a listing disappears from the board, Notivo marks the notice removed once it has been unseen for three days and its PDF returns 404. The record and its history stay in the archive instead of being deleted.',
      },
      {
        title: 'Moving hosts without replaying alerts',
        body: 'I migrated from Workers and D1 to a Node.js container with SQLite. The old monitor was paused while data and migration history moved, so the new deployment could continue from the existing queue and cursor instead of treating the archive as new work.',
      },
    ],
    numbers: [
      {
        value: '520',
        label: 'rows read in the recorded lookup test, down from 58,510',
      },
      {
        value: '15 min',
        label: 'between checks of the notice board',
      },
      {
        value: '23 h',
        label: 'automatic retry cutoff before the provider’s 24-hour key expiry',
      },
      {
        value: '~40 MB',
        label: 'memory used by the running service',
      },
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
      'I worked through the source’s failure cases: repeated entries, invalid dates, renumbered notices and missing documents. Those cases shaped three classification outcomes: alert, record without alerting, or hold for review. I then connected ingestion to a durable email queue and made the admin states describe exactly what the system knew. I built it in a week, with Claude Code as an implementation partner and every change reviewed.',
    next: [
      'Add delivery and bounce webhooks.',
      'Detect document changes behind an unchanged URL.',
      'Evaluate digests and additional sources once the current review workflow is stable.',
    ],
    ownership: [
      'Built the source parser, notice identity rules, scheduler, database and email queue.',
      'Designed the private admin portal and its health, archive and delivery states.',
      'Optimised database reads and migrated the service from Cloudflare Workers and D1 to Node.js and SQLite.',
    ],
    outcomes: [
      'The college has an automated monitor with a searchable archive, queued alerts and visible exceptions for notices or sends that need human review.',
      'The indexed lookup substantially reduced reads in the recorded comparison, and the migration retained the existing notice and queue history.',
      'The portal labels each email as accepted by the provider, never as delivered, so the admin never sees a stronger claim than the system can make.',
    ],
    lessons: [
      'A reliable monitor needs a model of source identity and uncertainty. Fetching the page on a timer is the easy part.',
      'I would separate observed entries, unique documents, provider acceptance and recipient delivery in the data model and interface from the start.',
      'The host migration was smooth because the queue and cursor lived in the database, not in process memory. Durable state made the move a data copy.',
    ],
  },
  {
    kind: 'selected',
    slug: 'institutional-cms',
    title: 'A publishing platform for institutional websites',
    summary:
      'I built a Payload-based platform for colleges and hospitals, with a catalogue of reusable page blocks and scoped publishing permissions. Its first live deployment lets college staff update the site without routing routine edits through me.',
    meta: 'Platform · Design system',
    stack: ['payload', 'nextjs', 'mongodb', 'tailwind', 'shadcn', 'storybook', 'vercel'],
    glance: ['61 page blocks', 'Scoped editor permissions', 'First client live'],
    blurb:
      'Giving institutional editors reusable page blocks and scoped permissions, with a separate deployment per client.',
    cover: {
      src: '/images/work/snmih-home.webp',
      alt: 'snmih.in home page: “Learn Medicine. Serve Humanity.” hero for a medical college, built on the platform.',
    },
    tagline: 'Give editors useful choices without making every page a design project.',
    facts: [
      {
        label: 'Company',
        value: 'Independent project',
      },
      {
        label: 'My role',
        value: 'Architecture, design system, frontend and operations',
      },
      {
        label: 'Product',
        value: 'Reusable publishing platform for institutional websites',
      },
      {
        label: 'Contribution',
        value: 'Platform foundation, editorial blocks and first client deployment',
      },
      {
        label: 'Timeline',
        value: 'June–November 2026',
      },
    ],
    link: {
      label: 'snmih.in',
      href: 'https://snmih.in',
    },
    problem: [
      'Institutional websites combine admissions, departments, notices and regulatory content. Different staff need to maintain different parts of the site. A developer-owned site makes routine changes expensive; an unrestricted page builder makes layout and content permissions harder to govern.',
      'I wanted editors to assemble pages from a defined catalogue, while the platform controlled layout, theme and access. The first medical-college deployment also had to become a useful starting point for another institution rather than a one-off website.',
    ],
    constraints: [
      'Keep the role model simple for editors, while allowing finer-grained permissions where a site needs them.',
      'Require durable production media storage rather than depending on an application container’s local disk.',
      'Give each client a separate deployment and data boundary.',
      'Limit the first release to five defined outcomes; keep the larger feature inventory in the backlog.',
    ],
    architecture: [
      'A single TypeScript application combines Next.js and Payload, with 23 collections and nine globals.',
      'A shared registry defines 61 page blocks and their section schema. Duplicate block names fail startup rather than producing ambiguous editor behaviour.',
      'Editor permissions are granted feature by feature, scoped to parts of the site and denied by default, all enforced in one access layer.',
      'Storybook covers the blocks for desktop, mobile and dark-theme review. A script generates editor thumbnails from rendered components.',
    ],
    decisions: [
      {
        title: 'Use separate deployments for client boundaries',
        body: 'Each client receives its own deployment instead of sharing an application with tenant switching. This makes the data and access boundary easier to understand, while fixes and schema changes need to be carried between deployments. The first client’s backport exposed that maintenance cost.',
      },
      {
        title: 'Constrain composition with blocks and theme tokens',
        body: 'Editors choose content blocks and theme presets rather than designing every section from arbitrary fields. Approved text-colour pairs reduce opportunities to introduce contrast problems.',
      },
      {
        title: 'Centralise public reads',
        body: 'Every public reader goes through one shared access wrapper, so search, the sitemap and previews all respect the same approval rules, with regression tests on each path.',
      },
    ],
    stories: [
      {
        title: 'Public pages served from the edge',
        body: 'I separated the cacheable public shell from the editor toolbar, which loads afterwards for signed-in editors. Public pages are served from the edge cache, down from a recorded time to first byte of about two seconds.',
      },
      {
        title: 'One access boundary for every public read',
        body: 'Payload’s Local API skips access control by default, so I routed search, the sitemap and every other server-side reader through one shared access wrapper, with regression tests guarding each path.',
      },
      {
        title: 'Client features returned to the platform',
        body: 'Two-factor sign-in, ranked search, secure downloads and backups were built for the first college, then brought back into the base platform in a 124-file backport, so the next client starts with all of them.',
      },
    ],
    numbers: [
      {
        value: '61',
        label: 'page blocks in the recorded catalogue',
      },
      {
        value: '29',
        label: 'features editors can be granted individually',
      },
      {
        value: '2,934',
        label: 'integration tests guarding blocks, access rules and public reads',
      },
      {
        value: '23',
        label: 'content collections, plus nine site-wide globals',
      },
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
      'I defined the first release around publishing tasks and a shared block contract. I also tried a custom visual editor, then returned to Payload’s editor and live preview when the custom layer duplicated existing capability. Storybook supported component review, while the first college deployment drove caching, access and maintenance improvements back into the platform. I worked with AI agents under written plans and architecture decisions and reviewed their changes; a generated block inventory keeps them accurate about what exists.',
    next: [
      'Observe editors and improve the tasks that cause friction.',
      'Launch the second client from the platform and document the setup and upgrade path.',
    ],
    ownership: [
      'Designed the block system, themes, editor experience and permission model.',
      'Built and deployed the Payload and Next.js application and its first client site.',
      'Maintained Storybook coverage, integration checks and a generated block inventory for development with AI agents.',
    ],
    outcomes: [
      'The first client site is live, and staff publish routine content through a reusable block system instead of requesting a developer change for each edit.',
      'The platform gained a cacheable public shell and a common boundary for public content reads. Client-specific improvements were returned to the base platform.',
      'Fixes and features from the first client now live in the base platform, ready to start the next one.',
    ],
    lessons: [
      'The editor is a product in its own right. I would observe staff completing real tasks earlier, before expanding the block catalogue.',
      'Separate deployments simplify one boundary and create a release-maintenance problem. The backport is evidence that an explicit upgrade strategy is needed.',
      'Dropping the custom visual editor was the right call. Payload’s editor and live preview already covered the need, and the time went into blocks and permissions instead.',
    ],
  },
]

export const caseStudies: CaseStudy[] = [...selectedStudies, ...employerStudies]

// Exactly the four Work entries on the home page. The three independent
// projects are featured in Beyond 9–5; together these are the full catalogue.
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
