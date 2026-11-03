import type { CollectionConfig } from 'payload'

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

// Bodies of protected case studies. Nobody reads these through the API:
// the site loads one with overrideAccess only after an access code checks out.
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description:
      'Protected case studies. Shown only to visitors with a valid access code. The title and summary on the public site come from the code repo.',
  },
  access: { read: signedIn, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Must match the slug on the public site, e.g. librechat.' },
    },
    { name: 'tagline', type: 'text' },
    {
      name: 'facts',
      type: 'array',
      admin: { description: 'Role, when, status, stack.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'problem',
      type: 'array',
      fields: [{ name: 'paragraph', type: 'textarea', required: true }],
    },
    {
      name: 'decisions',
      label: 'What I did',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      // Not "numbers": Payload's Postgres adapter reserves <collection>_numbers for its own tables.
      name: 'stats',
      label: 'By the numbers',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'process', label: 'How I built it', type: 'textarea' },
  ],
}
