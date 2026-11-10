import { APIError, type CollectionConfig } from 'payload'

import { generateCode, hashCode } from '@/lib/access-crypto'

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

const in30Days = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

// One code per company. The plain code is shown once, on the create form, and
// only its HMAC is stored, so a leaked database can't reveal working codes.
// The code field exists only on create: an existing record has no plain code to
// show, and re-saving it must never replace the code that was sent out.
export const AccessCodes: CollectionConfig = {
  slug: 'access-codes',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'label',
    defaultColumns: ['label', 'study', 'expiresAt', 'revoked', 'lastUsedAt'],
    description: 'Give one code to each company you share a protected case study with.',
  },
  access: { read: signedIn, create: signedIn, update: signedIn, delete: signedIn },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create') {
          if (!data.code) throw new APIError('Enter a code, or keep the generated one.', 400)
          data.codeHash = hashCode(data.code, req.payload.secret)
        }
        delete data.code
        return data
      },
    ],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Who it’s for, e.g. "Tabby, Nov 2026".' },
    },
    {
      name: 'code',
      type: 'text',
      virtual: true,
      defaultValue: generateCode,
      admin: {
        condition: (_data, _siblingData, { operation }) => operation === 'create',
        description:
          'Copy this code now and send it to the company. Once you save, it is never shown again: only a hash is stored. To replace a code, revoke this one and create a new one.',
      },
    },
    {
      name: 'codeHash',
      type: 'text',
      unique: true,
      index: true,
      admin: { hidden: true },
      // Never sent to the admin UI or the API.
      access: { read: () => false },
    },
    {
      name: 'study',
      type: 'relationship',
      relationTo: 'case-studies',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      defaultValue: in30Days,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'revoked',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Stops the code working immediately, even for visitors already in.' },
    },
    {
      name: 'lastUsedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
