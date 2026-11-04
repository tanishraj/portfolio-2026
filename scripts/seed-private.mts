// Seeds the protected case studies into Payload from content/private/*.json.
// That folder is git-ignored: the bodies never enter the public repo.
// Usage: pnpm seed:private   (needs DATABASE_URL and PAYLOAD_SECRET)
import 'dotenv/config'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'

import config from '../src/payload.config.ts'

const dir = path.resolve(import.meta.dirname, '../content/private')
const payload = await getPayload({ config })

for (const file of (await readdir(dir)).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(await readFile(path.join(dir, file), 'utf8'))
  const existing = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'case-studies', id: existing.docs[0].id, data })
    console.log(`updated ${data.slug}`)
  } else {
    await payload.create({ collection: 'case-studies', data })
    console.log(`created ${data.slug}`)
  }
}
process.exit(0)
