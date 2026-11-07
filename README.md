# tanish.im

The portfolio of Tanish Raj, a senior frontend engineer in Abu Dhabi. It's a Next.js 16 app with Payload CMS running inside it, kept deliberately calm: one accent colour, light type, gentle motion.

## What's in it

- **Home.** Selected work, how I work, experience, skills, lab and writing.
- **Case studies.** Anubhav, Notivo and an institutional CMS, at `/work/[slug]`. Every number in them comes from the project's own code, commits or docs.
- **One protected case study.** It covers my current employer, so its body lives in Payload and opens only with a per-company access code (see [Decisions](#decisions)).
- **Event-loop lab.** `/lab/event-loop` steps through promises, timers and async/await. A TypeScript model of the loop produces each frame, a test checks every snippet against a real JavaScript engine, and the loop itself is drawn with raw WebGL.
- **Ask about my work.** A streaming Q&A box on the home page, answered by Claude from the site's public content only, with citations linking each claim to its page. The corpus is prompt-cached; questions are rate-limited per IP and per day in Postgres. It appears only when `ANTHROPIC_API_KEY` is set.
- **CV.** A PDF at `public/Tanish-Raj-CV.pdf`, linked from the hero and the Contact section.
- **Brand.** The signature mark is one path in `src/brand/signature.ts`; `pnpm brand` regenerates the favicon, Apple icon and avatar from it. Link previews are generated per page with `next/og`.

## Stack

Next.js 16 (App Router, Server Components, static generation) · React 19 · TypeScript · Tailwind CSS 4 · Payload 3 on Postgres · Vitest · Playwright with axe · Lighthouse CI · GitHub Actions.

## Running it

```sh
cp .env.example .env          # then set PAYLOAD_SECRET
docker compose up -d          # local Postgres (with pgvector)
pnpm install
pnpm dev                      # http://localhost:3000, admin at /admin
```

| Script                         | What it does                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck` / `pnpm lint` | TypeScript and ESLint                                                                                   |
| `pnpm test:int`                | Content guards and the Payload API test                                                                 |
| `pnpm test:e2e`                | Every page on a phone viewport, in both themes, checked with axe; the access-code flow; the admin panel |
| `pnpm build`                   | Production build; portfolio pages are prerendered                                                       |
| `pnpm brand`                   | Regenerates icons and the avatar from the signature mark                                                |

## Quality bar

CI runs on every push and pull request: typecheck, lint, unit tests, a production build, end-to-end and accessibility tests, then Lighthouse.

Lighthouse budgets fail the build below 90 for performance, 100 for accessibility and SEO, and 95 for best practices, or if layout shift goes above 0.05. On the production build today, home and a case study score 98 / 100 / 100 / 100 under mobile throttling.

## Decisions

- **Protected content never touches git.** The body of the protected study lives only in Payload, and a test fails if the repo's copy gains anything beyond a title and summary.
- **Access codes are per company and stored as hashes.** Each code has an expiry and a revoke switch, and only its HMAC is stored. A valid code sets a signed, httpOnly cookie limited to that page's path, and the code is re-checked on every visit, so revoking it works at once. Five wrong guesses from one IP in 15 minutes blocks further tries. Every view is logged. The public API returns 403 for these collections, and the page is `noindex` and kept out of the sitemap.
- **Public content is static.** It lives in `src/content/*.ts`, so it's prerendered, type-checked and tested, and the public pages don't depend on the database.
- **Colour comes from tokens.** Every colour is a CSS variable in `globals.css`, with a designed light mode, a dark default and a print palette. A saved theme is applied before first paint, so there is no flash.
- **Motion is optional.** Each animation sits behind `prefers-reduced-motion`. The hero headline doesn't animate, so it paints at once.

## How it's built

I build with AI agents, mostly Claude Code. I set the brief, the design rules and the architecture, and review every change against them.
