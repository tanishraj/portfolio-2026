// The AI row on the home page: what I build for AI, and how I build with it.

export const aiIntro =
  "I don't just build with AI. I build tools that make AI more useful. From connecting our UI library to AI tools through MCP to developing intelligent financial applications, I combine a decade of engineering experience with new ways of building software."

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
        title: 'Connecting UI with AI',
        body: 'Built an MCP server that makes our UI components, APIs, and usage patterns accessible to compatible AI tools, helping them work with our existing design system.',
      },
      {
        icon: 'app',
        title: 'AI-powered interfaces',
        body: 'Building a private-credit AI assistant that presents financial insights through reusable UI components, interactive visualizations, and live data.',
      },
    ],
  },
  {
    title: 'Building with AI',
    items: [
      {
        icon: 'code',
        title: 'AI-assisted engineering',
        body: 'Using AI coding agents to accelerate implementation, refactoring, testing, and debugging, while reviewing the output for correctness, performance, and maintainability.',
      },
      {
        icon: 'thinking',
        title: 'AI as a thought partner',
        body: 'Using AI to explore unfamiliar technologies, compare approaches, and challenge technical decisions. Experience guides what I trust, question, and ultimately ship.',
      },
    ],
  },
]
