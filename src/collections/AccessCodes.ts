import { APIError, type CollectionConfig } from 'payload'

import { decryptCode, encryptCode, generateCode, hashCode } from '@/lib/access-crypto'

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

// A code is meant for one review session: it lasts a day unless you change it.
const in1Day = () => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

// One code per company. Visitors are matched by the code's HMAC, and the code
// itself is stored encrypted with the Payload secret, so a signed-in admin can
// copy it again while a leaked database reveals no working codes. The code is
// set once, on create; saving a record again never replaces it.

const UNAVAILABLE = 'Not viewable: revoke this code and create a new one'
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
          data.codeEncrypted = encryptCode(data.code, req.payload.secret)
        }
        delete data.code
        return data
      },
    ],
    afterRead: [
      ({ doc, req }) => {
        // Only signed-in admins can read this collection at all.
        doc.code = decryptCode(doc.codeEncrypted, req.payload.secret) ?? UNAVAILABLE
        delete doc.codeEncrypted
        return doc
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
      // Editable on create only; afterwards it is shown read-only for copying.
      access: { update: () => false },
      admin: {
        description:
          'Send this code to the company. You can copy it here at any time; it can’t be changed. To replace it, revoke this code and create a new one.',
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
      name: 'codeEncrypted',
      type: 'text',
      admin: { hidden: true },
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
      defaultValue: in1Day,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Defaults to one day from now. The code stops working at this time.',
      },
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
