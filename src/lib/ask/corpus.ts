import { aboutParagraphs, aiParagraph } from '@/content/about'
import { caseStudies } from '@/content/case-studies'
import { cvBullets, cvEducation, cvSkills, cvSummary } from '@/content/cv'
import { experience, principles } from '@/content/home'

// The public material the "Ask about my work" box may answer from. Each source
// becomes one document with citations on, so answers can link back to a page.
// Protected case studies contribute only their public title and summary.

export type Source = { title: string; href: string; text: string }

function caseStudyText(slug: string): string {
  const study = caseStudies.find((s) => s.slug === slug)!
  if (study.locked) {
    return `${study.title}. ${study.summary} This case study is private: it is shared only with a per-company access code. Its details are not public; to read it, request access by email at hire.tanishraj@gmail.com.`
  }
  return [
    `${study.title}. ${study.tagline ?? ''}`,
    ...(study.facts ?? []).map((fact) => `${fact.label}: ${fact.value}.`),
    'The problem.',
    ...(study.problem ?? []),
    'Constraints.',
    ...(study.constraints ?? []),
    'How it works.',
    ...(study.architecture ?? []),
    'Decisions.',
    ...(study.decisions ?? []).map(
      (d) => `${d.title}. ${d.body}${d.tradeoff ? ` Trade-off: ${d.tradeoff}` : ''}`,
    ),
    'Hard problems.',
    ...(study.stories ?? []).map((story) => `${story.title}. ${story.body}`),
    'By the numbers.',
    ...(study.numbers ?? []).map((n) => `${n.value}: ${n.label}.`),
    'How I built it.',
    study.process ?? '',
    'What’s next.',
    ...(study.next ?? []),
  ].join('\n')
}

export function buildSources(): Source[] {
  const studies = caseStudies.map((study) => ({
    title: study.locked ? `${study.title} (private case study)` : `Case study: ${study.title}`,
    href: `/work/${study.slug}`,
    text: caseStudyText(study.slug),
  }))

  const about: Source = {
    title: 'About Tanish',
    href: '/about',
    text: [
      ...aboutParagraphs,
      `How I use AI: ${aiParagraph}`,
      ...principles.map((p) => `${p.title} ${p.body}`),
    ].join('\n'),
  }

  const cv: Source = {
    title: 'CV',
    href: '/cv',
    text: [
      cvSummary,
      ...experience.map((job) =>
        [
          `${job.company}, ${job.role}, ${job.place}, ${job.years.replace('—', 'to')}.`,
          ...(cvBullets[job.company] ?? []),
        ].join(' '),
      ),
      ...cvSkills.map((group) => `${group.heading}: ${group.items}.`),
      ...cvEducation.map((item) => `${item.title}, ${item.detail}.`),
    ].join('\n'),
  }

  return [...studies, about, cv]
}
