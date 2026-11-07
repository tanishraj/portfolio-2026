// About copy, shown as a row on the home page. Also part of the corpus the
// "Ask about my work" box answers from.

export const aboutSections = [
  {
    title: 'Taking ownership',
    body: 'I like to understand the problem before writing code: ask questions, challenge assumptions, and care about what happens after a feature ships. Ten years of complex products taught me when to push for quality and when to keep it simple.',
  },
  {
    title: 'Always curious',
    body: 'Frontend is what I know best, but I enjoy figuring out what happens behind it. Lately that means backend, infrastructure and AI. I learn by building things, breaking them and making them better.',
  },
]

export const aboutParagraphs = aboutSections.map((section) => `${section.title}: ${section.body}`)
