import React from 'react'
import {
  siAnthropic,
  siApollographql,
  siBetterauth,
  siCaddy,
  siCloudflare,
  siCoolify,
  siDocker,
  siGithub,
  siGithubactions,
  siGraphql,
  siJest,
  siJquery,
  siMedium,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPayloadcms,
  siPostgresql,
  siPrisma,
  siRadixui,
  siRakuten,
  siReact,
  siRedux,
  siResend,
  siSass,
  siShadcnui,
  siSqlite,
  siStorybook,
  siTailwindcss,
  siTestinglibrary,
  siTrivy,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siVuedotjs,
  siWebgl,
  siWellsfargo,
  type SimpleIcon,
} from 'simple-icons'

// Brand marks come from Simple Icons (CC0) as inline SVG paths. Brands without
// a public mark get a small lettered tile, so every row still lines up.
const marks: Record<string, { label: string; icon?: SimpleIcon; letters?: string }> = {
  anthropic: { label: 'Claude API', icon: siAnthropic },
  apollo: { label: 'Apollo', icon: siApollographql },
  betterauth: { label: 'Better Auth', icon: siBetterauth },
  caddy: { label: 'Caddy', icon: siCaddy },
  cloudflare: { label: 'Cloudflare', icon: siCloudflare },
  coolify: { label: 'Coolify', icon: siCoolify },
  docker: { label: 'Docker', icon: siDocker },
  github: { label: 'GitHub', icon: siGithub },
  githubactions: { label: 'GitHub Actions', icon: siGithubactions },
  graphql: { label: 'GraphQL', icon: siGraphql },
  jest: { label: 'Jest', icon: siJest },
  jquery: { label: 'jQuery', icon: siJquery },
  medium: { label: 'Medium', icon: siMedium },
  mongodb: { label: 'MongoDB', icon: siMongodb },
  nextjs: { label: 'Next.js', icon: siNextdotjs },
  node: { label: 'Node.js', icon: siNodedotjs },
  payload: { label: 'Payload CMS', icon: siPayloadcms },
  postgres: { label: 'PostgreSQL', icon: siPostgresql },
  prisma: { label: 'Prisma', icon: siPrisma },
  radix: { label: 'Radix', icon: siRadixui },
  react: { label: 'React', icon: siReact },
  redux: { label: 'Redux', icon: siRedux },
  resend: { label: 'Resend', icon: siResend },
  sass: { label: 'Sass', icon: siSass },
  shadcn: { label: 'shadcn/ui', icon: siShadcnui },
  sqlite: { label: 'SQLite', icon: siSqlite },
  storybook: { label: 'Storybook', icon: siStorybook },
  tailwind: { label: 'Tailwind CSS', icon: siTailwindcss },
  testinglibrary: { label: 'Testing Library', icon: siTestinglibrary },
  trivy: { label: 'Trivy', icon: siTrivy },
  typescript: { label: 'TypeScript', icon: siTypescript },
  vercel: { label: 'Vercel', icon: siVercel },
  vite: { label: 'Vite', icon: siVite },
  vitest: { label: 'Vitest', icon: siVitest },
  vue: { label: 'Vue', icon: siVuedotjs },
  webgl: { label: 'WebGL', icon: siWebgl },
  // Lettered tiles: no public Simple Icons mark.
  playwright: { label: 'Playwright', letters: 'PW' },
  linkedin: { label: 'LinkedIn', letters: 'in' },
  lexical: { label: 'Lexical', letters: 'Lx' },
  librechat: { label: 'LibreChat', letters: 'LC' },
  // Employers.
  liquidity: { label: 'Liquidity Capital', letters: 'LQ' },
  bsf: { label: 'Banque Saudi Fransi', letters: 'BSF' },
  wellsfargo: { label: 'Wells Fargo', icon: siWellsfargo },
  rakuten: { label: 'Rakuten', icon: siRakuten },
  cgi: { label: 'CGI', letters: 'CGI' },
  thomsonreuters: { label: 'Thomson Reuters', letters: 'TR' },
}

export type BrandKey = keyof typeof marks

export const brandLabel = (key: BrandKey) => marks[key].label

/** A monochrome brand mark that follows the text colour. Decorative unless `title` is set. */
export function BrandIcon({
  name,
  size = 16,
  title,
  className = '',
}: {
  name: BrandKey
  size?: number
  title?: boolean
  className?: string
}) {
  const mark = marks[name]
  const a11y = title ? { role: 'img', 'aria-label': mark.label } : { 'aria-hidden': true as const }

  if (!mark.icon) {
    return (
      <span
        {...a11y}
        className={`inline-grid shrink-0 place-items-center rounded-[5px] border border-current px-1 font-mono leading-none tracking-wide ${className}`}
        style={{ height: size, minWidth: size, fontSize: Math.max(8, size * 0.45) }}
      >
        {mark.letters}
      </span>
    )
  }

  return (
    <svg
      {...a11y}
      className={`shrink-0 ${className}`}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {title && <title>{mark.label}</title>}
      <path d={mark.icon.path} />
    </svg>
  )
}

/** A row of stack marks with names, for case studies and cards. */
export function StackList({
  items,
  showLabels = true,
}: {
  items: BrandKey[]
  showLabels?: boolean
}) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-muted" aria-label="Built with">
      {items.map((key) => (
        <li className="flex items-center gap-1.5 text-sm" key={key} title={brandLabel(key)}>
          <BrandIcon name={key} size={14} title={!showLabels} />
          {showLabels && <span>{brandLabel(key)}</span>}
        </li>
      ))}
    </ul>
  )
}
