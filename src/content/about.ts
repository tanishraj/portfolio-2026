// About copy, shown as a row on the home page. Also part of the corpus the
// "Ask about my work" box answers from.

export const aboutSections = [
  {
    title: 'What I like working on',
    body: 'Strict rules and messy data. A card replacement flow that has to be right. A legacy app nobody wants to touch. A regulator’s notice board that renumbers its own notices. I enjoy making that kind of thing feel calm for the person using it.',
  },
  {
    title: 'How I use AI',
    body: 'I build with AI most days, mostly Claude Code. I write the brief, the design rules and the decision records. The agent does a lot of the typing. I review every change against those rules. One person can ship what used to need a team, as long as that person keeps owning how it works.',
  },
  {
    title: 'Outside work',
    body: 'I build software for a medical college in Bihar: a logbook that postgraduate doctors and their guides sign every month, and a monitor for the regulator’s notice board. Both are in production with real users, and both are why I now run the backend as well as the front end.',
  },
]

export const aboutParagraphs = aboutSections.map((section) => section.body)
export const aiParagraph = aboutSections[1].body
