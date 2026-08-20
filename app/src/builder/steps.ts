export type StepId =
  | 'idea'
  | 'setting'
  | 'protagonist'
  | 'deuteragonist'
  | 'tertiary'
  | 'antagonist'
  | 'plot'
  | 'beginning'
  | 'middle'
  | 'end'
  | 'reference'
  | 'writer';

export interface StepMeta {
  id: StepId;
  label: string;
  group: 'Story Building' | 'Characters' | 'Wrap Up';
  accent: string;
  accentSoft: string;
}

export const STEPS: StepMeta[] = [
  { id: 'idea', label: 'Idea', group: 'Story Building', accent: 'var(--color-idea-500)', accentSoft: 'var(--color-idea-100)' },
  { id: 'setting', label: 'Setting', group: 'Story Building', accent: 'var(--color-setting-500)', accentSoft: 'var(--color-setting-100)' },
  { id: 'protagonist', label: 'Protagonist', group: 'Characters', accent: 'var(--color-character-500)', accentSoft: 'var(--color-character-100)' },
  { id: 'deuteragonist', label: 'Deuteragonist', group: 'Characters', accent: 'var(--color-character-500)', accentSoft: 'var(--color-character-100)' },
  { id: 'tertiary', label: 'Tertiary', group: 'Characters', accent: 'var(--color-character-500)', accentSoft: 'var(--color-character-100)' },
  { id: 'antagonist', label: 'Antagonist', group: 'Characters', accent: 'var(--color-character-500)', accentSoft: 'var(--color-character-100)' },
  { id: 'plot', label: 'Plot', group: 'Story Building', accent: 'var(--color-plot-500)', accentSoft: 'var(--color-plot-100)' },
  { id: 'beginning', label: 'Beginning', group: 'Story Building', accent: 'var(--color-gold-600)', accentSoft: 'var(--color-gold-100)' },
  { id: 'middle', label: 'Middle', group: 'Story Building', accent: 'var(--color-gold-600)', accentSoft: 'var(--color-gold-100)' },
  { id: 'end', label: 'End', group: 'Story Building', accent: 'var(--color-gold-600)', accentSoft: 'var(--color-gold-100)' },
  { id: 'reference', label: 'Reference Tools', group: 'Wrap Up', accent: 'var(--color-plot-500)', accentSoft: 'var(--color-plot-100)' },
  { id: 'writer', label: 'Story Writer', group: 'Wrap Up', accent: 'var(--color-gold-600)', accentSoft: 'var(--color-gold-100)' },
];

export function stepIndex(id: StepId) {
  return STEPS.findIndex((s) => s.id === id);
}

export function stepMeta(id: StepId): StepMeta {
  return STEPS.find((s) => s.id === id)!;
}
