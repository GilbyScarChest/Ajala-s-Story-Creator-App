export type ToolId =
  | 'hub'
  | 'story-builder'
  | 'world-builder'
  | 'magic-builder'
  | 'belief-builder'
  | 'technology-builder'
  | 'character-profiler'
  | 'timeline'
  | 'character-web'
  | 'guide';

export interface ToolMeta {
  id: ToolId;
  label: string;
  description: string;
  accent: string;
  accentSoft: string;
}

export const TOOLS: ToolMeta[] = [
  {
    id: 'story-builder',
    label: 'Story Builder',
    description: 'Idea, Setting, Characters, Plot, Beginning, Middle, End.',
    accent: 'var(--color-gold-600)',
    accentSoft: 'var(--color-gold-100)',
  },
  {
    id: 'world-builder',
    label: 'World Builder',
    description: 'Geography, Society, and Culture — the world your story lives in.',
    accent: 'var(--color-world-500)',
    accentSoft: 'var(--color-world-100)',
  },
  {
    id: 'magic-builder',
    label: 'Magic Builder',
    description: 'The rules and history of any magic systems in your world.',
    accent: 'var(--color-magic-500)',
    accentSoft: 'var(--color-magic-100)',
  },
  {
    id: 'belief-builder',
    label: 'Belief Builder',
    description: 'The rules and history of any religions or belief systems.',
    accent: 'var(--color-belief-500)',
    accentSoft: 'var(--color-belief-100)',
  },
  {
    id: 'technology-builder',
    label: 'Technology Builder',
    description: 'The rules and history of any technology systems.',
    accent: 'var(--color-tech-500)',
    accentSoft: 'var(--color-tech-100)',
  },
  {
    id: 'character-profiler',
    label: 'Character Profiler',
    description: 'A deep dive on background, current life, traits, and backstory per character.',
    accent: 'var(--color-character-500)',
    accentSoft: 'var(--color-character-100)',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    description: 'Lay your story’s events out in chronological order.',
    accent: 'var(--color-plot-500)',
    accentSoft: 'var(--color-plot-100)',
  },
  {
    id: 'character-web',
    label: 'Character Web',
    description: 'Map the relationships that connect your cast.',
    accent: 'var(--color-web-500)',
    accentSoft: 'var(--color-web-100)',
  },
  {
    id: 'guide',
    label: 'Guide',
    description: 'How to use each tool, straight from the book.',
    accent: 'var(--color-idea-600)',
    accentSoft: 'var(--color-idea-100)',
  },
];

export function toolMeta(id: ToolId): ToolMeta {
  return TOOLS.find((t) => t.id === id)!;
}
