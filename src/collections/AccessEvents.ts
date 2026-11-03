import type { CollectionConfig } from 'payload'

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

// Who opened a protected case study, and failed attempts for rate limiting.
// Written only by the server; admins can read and clear it.
export const AccessEvents: CollectionConfig = {
  slug: 'access-events',
  admin: {
    group: 'Portfolio',
    defaultColumns: ['type', 'code', 'study', 'createdAt'],
    description: 'Views of protected case studies, and failed code attempts.',
  },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Viewed', value: 'view' },
        { label: 'Wrong code', value: 'failed' },
      ],
    },
    { name: 'code', type: 'relationship', relationTo: 'access-codes' },
    { name: 'study', type: 'text', admin: { description: 'Slug of the case study.' } },
    { name: 'ipHash', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', admin: { readOnly: true } },
  ],
}
