import { PageHeader } from '../components/PageHeader';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { CharacterCard } from '../components/CharacterCard';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import type { CharacterRole } from '../types/story';
import characterIcon from '../assets/icons/character.png';

const ROLE_COPY: Record<
  CharacterRole,
  { eyebrow: string; title: string; subtitle: string; example: string; stepLabel: string }
> = {
  protagonist: {
    eyebrow: 'Step 3 — Who Are You?',
    title: 'Protagonist',
    stepLabel: 'Protagonist',
    subtitle:
      "Your main character. We follow this storyline the closest. Ask yourself: why should this person be my main character? An active protagonist — one whose decisions come from an internal moral compass — is more compelling than a passive one.",
    example: 'Yemina O’Hara, Female, 156, Black, Giggle Witch / CEO of a Doula empire.',
  },
  deuteragonist: {
    eyebrow: 'Secondary Character',
    title: 'Deuteragonist',
    stepLabel: 'Deuteragonist',
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
  onNavigate,
}: {
  role: CharacterRole;
  onNavigate: (id: StepId) => void;
}) {
  const { story, addCharacter, updateCharacter, removeCharacter } = useStory();
  const meta = stepMeta(role);
  const copy = ROLE_COPY[role];
  const characters = story.characters.filter((c) => c.role === role);
  const isProtagonist = role === 'protagonist';

  return (
    <StepShell id={role} onNavigate={onNavigate}>
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
