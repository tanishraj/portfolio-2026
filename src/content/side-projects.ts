import type { StaticImageData } from 'next/image'

import anubhav from '../../public/images/side/anubhav.webp'
import notivo from '../../public/images/side/notivo.webp'
import snmih from '../../public/images/side/snmih.webp'

// The home page's "Beyond 9–5" row. Screenshots are grayscale captures of each
// live site's public front page; nothing behind a sign-in is shown.
export type SideProject = {
  title: string
  blurb: string
  image: StaticImageData
  alt: string
  /** Case study slug under /work. */
  slug: string
}

export const sideProjects: SideProject[] = [
  {
    title: 'Website on Payload CMS',
    blurb:
      'A website platform on Payload, copied once per client, that staff publish on without asking me.',
    image: snmih,
    alt: 'The snmih.in home page for a medical college, in grayscale.',
    slug: 'institutional-cms',
  },
  {
    title: 'Anubhav',
    blurb:
      'A digital logbook for postgraduate doctors, with monthly sign-off and a PDF that can’t be quietly changed.',
    image: anubhav,
    alt: 'The Anubhav sign-in page, in grayscale.',
    slug: 'anubhav',
  },
  {
    title: 'Notivo',
    blurb:
      'Emails each new notice from the medical regulator exactly once, from a board that renumbers itself.',
    image: notivo,
    alt: 'The Notivo sign-in page, in grayscale.',
    slug: 'notivo',
  },
]
