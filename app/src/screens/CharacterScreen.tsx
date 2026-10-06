import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterQuickNav } from '../components/CharacterQuickNav';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import type { Character, CharacterRole } from '../types/story';
import characterIcon from '../assets/icons/character.png';

export interface CharacterFocus {
  id: string;
  nonce: number;
}

const YEMINA_SHEET: [string, string][] = [
  ['Who', 'Yemina O’Hara, Female, 156, Black, Giggle Witch / CEO of a Doula empire.'],
  ['Strength', 'Yemina is a cunning wordsmith.'],
  ['Strength Reason', 'She had to learn how to talk her way out of trouble growing up in the Confederate South for the past hundred and fifty years.'],
  ['Weakness', 'Her ego and ambition will be her downfall.'],
  ['Weakness Reason', 'She’s gained a lot of power and is now a touch full of herself.'],
  ['Inner Conflict', 'Despite her power, she feels like she’s still a third-class citizen.'],
  ['Inner Conflict Reason', 'No matter how much social power she gains, she is still mistreated by everyone, especially wealthy white men.'],
  ['Established Norm', 'She is building the largest doula/midwife company in the world.'],
  ['Goal', 'She wants to be accepted by the elite of the elite.'],
  ['Goal Reason', 'She feels that if the elite love her, she will finally feel respected — something she’s never felt.'],
  ['What makes her dynamic', 'She’s a dangerously ruthless woman with a soft spot for children.'],
];

const YEMINA_EXAMPLE = (
  <>
    <dl className="m-0 grid gap-x-4 gap-y-1.5 sm:grid-cols-[10rem_1fr]">
      {YEMINA_SHEET.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="font-semibold text-[var(--color-ink)]">{label}</dt>
          <dd className="m-0">{value}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-2 mb-0">
      Why her? She’s the most compelling person in the story — a 156-year-old witch who harvests babies’ giggles
      for magic while running a business for women’s health, hunting for the Well of Ascension with a witch hunter
      on her trail.
    </p>
  </>
);

const ROLE_COPY: Record<
  CharacterRole,
  { eyebrow: string; title: string; subtitle: string; example: ReactNode; stepLabel: string }
> = {
  protagonist: {
    eyebrow: 'Who Are You?',
    title: 'Protagonist',
    stepLabel: 'Protagonist',
    subtitle:
      "Your main character. We follow this storyline the closest. Ask yourself: why should this person be my main character? An active protagonist — one whose decisions come from an internal moral compass — is more compelling than a passive one.",
    example: YEMINA_EXAMPLE,
  },
  deuteragonist: {
    eyebrow: 'Aka The Deuteragonist',
    title: 'Secondary Character',
    stepLabel: 'Secondary Character',
    subtitle:
      'The "almost" protagonist — main-character adjacent. They monopolize the B plot and have major influence on the protagonist. They must relate to the protagonist spiritually, physically, or mentally.',
    example: 'Gentleman O’Hara — Yemina’s "adopted" son.',
  },
  tertiary: {
    eyebrow: 'Ensemble Character',
    title: 'Tertiary',
    stepLabel: 'Tertiary',
    subtitle:
      'Your ensemble characters. They affect the main plot the least, but still matter — comedic relief, a unique perspective, or support for the theme. Build them out just like secondary characters.',
    example: 'Yara & Yellow O’Hara — sisters who help/hinder the protagonist on her quest.',
  },
  antagonist: {
    eyebrow: 'In Direct Conflict',
    title: 'Antagonist',
    stepLabel: 'Antagonist',
    subtitle:
      "The person, place, or thing at odds with the protagonist — the main source of conflict. Their goal should be in CLEAR AND DIRECT CONFLICT with the protagonist's goal, and should challenge them personally.",
    example: 'Long Eye Joe — a witch hunter.',
  },
};

export function CharacterScreen({
  role,
  focus,
  onNavigate,
  onSelectCharacter,
}: {
  role: CharacterRole;
  focus?: CharacterFocus | null;
  onNavigate: (id: StepId) => void;
  onSelectCharacter: (character: Character) => void;
}) {
  const { story, addCharacter, updateCharacter, removeCharacter } = useStory();
  const meta = stepMeta(role);
  const copy = ROLE_COPY[role];
  const characters = story.characters.filter((c) => c.role === role);
  const isProtagonist = role === 'protagonist';
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`character-${focus.id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlightedId(focus.id);
    const timeout = setTimeout(() => setHighlightedId(null), 1600);
    return () => clearTimeout(timeout);
  }, [focus]);

  return (
    <StepShell id={role} onNavigate={onNavigate}>
      <CharacterQuickNav
        characters={story.characters}
        currentRole={role}
        focusedId={focus?.id}
        accent={meta.accent}
        onSelect={onSelectCharacter}
      />

      <PageHeader icon={characterIcon} eyebrow={copy.eyebrow} title={copy.title} accent={meta.accent} subtitle={copy.subtitle} />

      <div className="space-y-6">
        {characters.length === 0 && (
          <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-8 text-center text-[var(--color-ink-faint)]">
            No {copy.stepLabel.toLowerCase()} yet.
          </div>
        )}

        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            accent={meta.accent}
            isProtagonist={isProtagonist}
            highlighted={highlightedId === c.id}
            onChange={(patch) => updateCharacter(c.id, patch)}
            onRemove={isProtagonist && characters.length === 1 ? undefined : () => removeCharacter(c.id)}
          />
        ))}

        <button
          onClick={() => addCharacter(role)}
          className="w-full rounded-lg border border-dashed border-[var(--color-line-strong)] py-3 text-sm font-medium text-[var(--color-ink-soft)] transition hover:border-[var(--color-character-500)] hover:text-[var(--color-character-500)]"
        >
          + Add a {copy.stepLabel.toLowerCase()}
        </button>

        <ExampleCallout>{copy.example}</ExampleCallout>
      </div>
    </StepShell>
  );
}
