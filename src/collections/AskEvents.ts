import type { CollectionConfig } from 'payload'

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

// Questions asked in the "Ask about my work" box. Used for rate limiting, and
// so I can see what recruiters actually want to know. Written only by the server.
export const AskEvents: CollectionConfig = {
  slug: 'ask-events',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'question',
    defaultColumns: ['question', 'outcome', 'createdAt'],
    description: 'Questions asked in the “Ask about my work” box.',
  },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    { name: 'question', type: 'text', required: true },
    {
      name: 'outcome',
      type: 'select',
      required: true,
      defaultValue: 'answered',
      options: [
        { label: 'Answered', value: 'answered' },
        { label: 'Rate limited', value: 'limited' },
      ],
    },
    { name: 'ipHash', type: 'text', index: true, admin: { readOnly: true } },
  ],
}
