import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Shown in the footer colophon, so the site visibly says when it last changed.
const revision = (() => {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { cwd: dirname }).toString().trim()
  } catch {
    return 'local'
  }
})()

const nextConfig: NextConfig = {
  // Unknown addresses match neither root layout (site, admin); see app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
  env: {
    NEXT_PUBLIC_REVISION: revision,
    NEXT_PUBLIC_BUILT_AT: new Date().toISOString(),
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
