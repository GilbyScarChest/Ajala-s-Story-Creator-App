import { PageHeader } from '../components/PageHeader';
import { StepShell } from '../components/StepShell';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import storyElementsIcon from '../assets/icons/story-elements.png';

const ELEMENTS = [
  {
    name: 'Established Norm',
    tagline: 'The Before',
    question: 'Who should I care about? Why? Where are we?',
    color: '#4F7DA0',
    def: 'The life of the characters before the Inciting Incident. This is what they are doing day to day — their strengths, weaknesses, and inner conflicts — just before the plot begins.',
  },
  {
    name: 'Inciting Incident',
    tagline: 'The Thing',
    question: 'How will the characters succeed?',
    color: '#7B2635',
    def: 'The first major plot point that breaks the protagonist away from the Established Norm and introduces the Intention, Obstacle, Stakes, and Timeframe.',
  },
  {
    name: 'Rising Action',
    tagline: 'The Decision',
    question: 'What do we do first?',
    color: '#C68A1D',
    def: 'The series of events after the Inciting Incident that directly affect the characters and advance the plot — the first steps toward the intention.',
  },
  {
    name: 'Rising Reaction',
    tagline: 'The Consequences',
    question: 'What do we do now?',
    color: '#6B4423',
    def: 'The consequences following the Rising Action that heighten the conflict. Characters adapt to new or intensified issues; inner conflict reaches its peak.',
  },
  {
    name: 'Climax',
    tagline: 'The Gamble',
    question: 'Will this work?',
    color: '#9B3FA8',
    def: 'The turning point that changes the protagonist’s fate for good or bad — the final, all-in action every character must take.',
  },
  {
    name: 'Falling Action',
    tagline: 'The Result',
    question: 'Did we win?',
    color: '#3F9BA6',
    def: 'The conclusion of the conflict — the success or failure of the protagonist’s intention, and the immediate consequences of the climax.',
  },
  {
    name: 'Resolution',
    tagline: 'The After',
    question: 'What next?',
    color: '#6B8E23',
    def: 'The establishment of the new normal. Whether or not the intention was achieved, the characters now have to live with the result.',
  },
];

const PLOTS = [
  { name: 'A Plot', color: 'var(--color-plot-500)', def: 'Takes precedence over all other plots. Mainly concerns the Protagonist and the Antagonist.' },
  { name: 'B Plot', color: 'var(--color-gold-600)', def: 'Directly affects and informs the A plot. Mainly concerns the Deuteragonist and/or the Protagonist.' },
  { name: 'C Plot', color: 'var(--color-character-500)', def: 'Indirectly affects and informs the A plot. Mainly concerns Tertiary characters and/or the Protagonist.' },
];

const GLOSSARY = [
  { term: 'Plot Point', def: 'A fact within a plot that has significance — something that directly affects the direction of the story.' },
  { term: 'Major Plot Point', def: 'A significant event within a plot that alters the direction of the story.' },
  { term: 'Minor Plot Point', def: 'An event that significantly informs a major plot point without altering the story’s direction on its own.' },
  { term: 'Subplot', def: 'A secondary plot that runs parallel to, and supports, the main plot.' },
  { term: 'Motif', def: 'A distinctive pattern — a phrase, symbol, or description — that recurs throughout a story to give the audience clues or reinforce theme.' },
  { term: 'Plot Device', def: 'A character, item, location, or event used solely to advance the plot. Avoid making any character only this.' },
];

export function ReferenceScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const meta = stepMeta('reference');

  return (
    <StepShell id="reference" onNavigate={onNavigate}>
      <PageHeader
        icon={storyElementsIcon}
        eyebrow="Once Upon A Time"
        title="Reference Tools"
        accent={meta.accent}
        subtitle="The 7-Essential Story Elements are the bones of every story. Look at where you are, see what the next element is, and write to there."
      />

      <div className="mb-10 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
        {ELEMENTS.map((el) => (
          <div key={el.name} className="rounded-lg px-1.5 pb-3 pt-2 text-center" style={{ background: `${el.color}14` }}>
            <div className="mx-auto mb-2 h-1.5 w-full rounded-full" style={{ background: el.color }} />
            <div className="font-serif text-xs leading-tight sm:text-sm" style={{ color: el.color }}>
              {el.name}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {ELEMENTS.map((el) => (
          <div key={el.name} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5">
            <div className="mb-1 flex items-baseline gap-3">
              <h3 className="m-0 text-xl" style={{ color: el.color }}>{el.name}</h3>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                {el.tagline}
              </span>
            </div>
            <p className="m-0 mb-2 text-sm italic text-[var(--color-ink-faint)]">{el.question}</p>
            <p className="m-0 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">{el.def}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-2xl text-[var(--color-ink)]">A / B / C Plot</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {PLOTS.map((p) => (
          <div key={p.name} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5">
            <h3 className="m-0 mb-2 text-lg" style={{ color: p.color }}>{p.name}</h3>
            <p className="m-0 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.def}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-2xl text-[var(--color-ink)]">Glossary</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5">
            <h3 className="m-0 mb-2 text-lg text-[var(--color-ink)]">{g.term}</h3>
            <p className="m-0 text-sm leading-relaxed text-[var(--color-ink-soft)]">{g.def}</p>
          </div>
        ))}
      </div>
    </StepShell>
  );
}
