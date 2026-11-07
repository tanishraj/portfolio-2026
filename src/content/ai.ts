// The AI row on the home page: what I build for AI, and how I build with it.

export const aiIntro =
  "I don't just build with AI. I build tools for AI to work with. From AI-assisted development to MCP integrations and intelligent product experiences, I use a decade of engineering experience to make AI practical, productive, and reliable."

export type AiIcon = 'design-system' | 'app' | 'code' | 'thinking'

export const aiGroups: {
  title: string
  items: { icon: AiIcon; title: string; body: string }[]
}[] = [
  {
    title: 'Building for AI',
    items: [
      {
        icon: 'design-system',
        title: 'Design system meets AI',
        body: 'Built an MCP server that exposes our UI library, component APIs, and usage patterns to compatible AI tools, helping them generate interfaces using our existing components.',
      },
      {
        icon: 'app',
        title: 'AI-powered applications',
        body: 'Building conversational experiences that turn AI responses into interactive interfaces using reusable components and live financial data.',
      },
    ],
  },
  {
    title: 'Building with AI',
    items: [
      {
        icon: 'code',
        title: 'AI-assisted development',
        body: 'Using AI to explore solutions, write and refactor code, debug issues, and accelerate implementation while maintaining control over technical decisions.',
      },
      {
        icon: 'thinking',
        title: 'Thinking with AI',
        body: 'Using AI as a technical thought partner to evaluate approaches, investigate unfamiliar technologies, and challenge architectural decisions before writing code.',
      },
    ],
  },
]
