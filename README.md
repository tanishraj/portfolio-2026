# tanish.im

The portfolio of Tanish Raj, a senior frontend engineer in Abu Dhabi. It's a Next.js 16 app with Payload CMS running inside it, kept deliberately calm: one accent colour, light type, gentle motion.

## What's in it

- **Home.** Selected work, how I work, experience, skills, lab and writing.
- **Case studies.** Anubhav, Notivo and an institutional CMS, at `/work/[slug]`. Every number in them comes from the project's own code, commits or docs.
- **One protected case study.** It's about my current employer. Only its title and summary are public; the body will live in Payload, never in this repo (see [Decisions](#decisions)).
- **About and CV.** `/cv` is the single source of the CV; `pnpm cv` prints it to `public/Tanish-Raj-CV.pdf`.
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

| Script                         | What it does                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `pnpm typecheck` / `pnpm lint` | TypeScript and ESLint                                                                  |
| `pnpm test:int`                | Content guards and the Payload API test                                                |
| `pnpm test:e2e`                | Every page on a phone viewport, in both themes, checked with axe; plus the admin panel |
| `pnpm build`                   | Production build; portfolio pages are prerendered                                      |
| `pnpm cv`                      | Prints `/cv` to PDF (needs the site running)                                           |
| `pnpm brand`                   | Regenerates icons and the avatar from the signature mark                               |

## Quality bar

CI runs on every push and pull request: typecheck, lint, unit tests, a production build, end-to-end and accessibility tests, then Lighthouse.

Lighthouse budgets fail the build below 90 for performance, 100 for accessibility and SEO, and 95 for best practices, or if layout shift goes above 0.05. On the production build today, home and a case study score 98 / 100 / 100 / 100 under mobile throttling.

## Decisions

- **Protected content never touches git.** A test fails if the locked case study gains anything beyond its title and summary. The sitemap and `robots.txt` leave it out, and the page is `noindex`.
- **Content is static for now.** It lives in `src/content/*.ts` and moves into Payload collections next, along with per-company access codes for the protected study.
- **Colour comes from tokens.** Every colour is a CSS variable in `globals.css`, with a designed light mode, a dark default and a print palette. A saved theme is applied before first paint, so there is no flash.
- **Motion is optional.** Each animation sits behind `prefers-reduced-motion`. The hero headline doesn't animate, so it paints at once.

## How it's built

I build with AI agents, mostly Claude Code. I set the brief, the design rules and the architecture, and review every change against them.
