// Canonical origin for metadata, sitemap and preview images.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tanish.im'

export const person = {
  name: 'Tanish Raj',
  jobTitle: 'Senior Frontend Engineer',
  email: 'hire.tanishraj@gmail.com',
  location: 'Abu Dhabi, UAE',
}

// The downloadable CV, linked from the hero and the Contact section.
export const cvPdfPath = '/Tanish-Raj-CV.pdf'

// Build revision and date for the footer colophon (set in next.config.ts).
export const revision = process.env.NEXT_PUBLIC_REVISION ?? 'local'
export const updatedOn = process.env.NEXT_PUBLIC_BUILT_AT
  ? new Date(process.env.NEXT_PUBLIC_BUILT_AT).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  : ''
