// About copy, shown as a row on the home page. Also part of the corpus the
// "Ask about my work" box answers from.

export const aboutSections = [
  {
    title: 'Taking ownership',
    body: 'I like understanding the bigger picture before writing code. Years of working on enterprise products have taught me to question assumptions, make practical trade-offs, and think beyond the immediate task.',
  },
  {
    title: 'Always curious',
    body: "Frontend is where I've built my expertise, but my curiosity doesn't stop there. I enjoy exploring the engineering behind the interface. Most of what I learn comes from building real products and figuring things out along the way.",
  },
]

export const aboutParagraphs = aboutSections.map((section) => `${section.title}: ${section.body}`)
