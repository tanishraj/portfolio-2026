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

export const sideProjectsIntro =
  'Outside my day job, I build software for real-world problems. These projects are where I explore new technologies, work across the stack, and take ideas from development to deployment.'

export const sideProjects: SideProject[] = [
  {
    title: 'Websites powered by Payload CMS',
    blurb:
      'A reusable website foundation that combines modern frontend development with a CMS, giving clients control over their own content.',
    image: snmih,
    alt: 'The snmih.in home page for a medical college, in grayscale.',
    slug: 'institutional-cms',
  },
  {
    title: 'Anubhav — Digital Logbook',
    blurb:
      'A digital logbook for postgraduate medical training, bringing clinical records, monthly approvals, and downloadable reports into one place.',
    image: anubhav,
    alt: 'The Anubhav sign-in page, in grayscale.',
    slug: 'anubhav',
  },
  {
    title: 'Notivo — Notice Monitoring',
    blurb:
      'An automated notification service that tracks regulatory notices, identifies new updates, and delivers timely email alerts without duplicate notifications.',
    image: notivo,
    alt: 'The Notivo sign-in page, in grayscale.',
    slug: 'notivo',
  },
]
