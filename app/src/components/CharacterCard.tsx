import { useState } from 'react';
import { FormField } from './FormField';
import { CharacterArcBuilder } from './CharacterArcBuilder';
import { composeArcSummary } from '../builder/arc';
import type { Character } from '../types/story';

interface CharacterCardProps {
  character: Character;
  accent: string;
  isProtagonist: boolean;
  highlighted?: boolean;
  onChange: (patch: Partial<Character>) => void;
  onRemove?: () => void;
}

export function CharacterCard({ character: c, accent, isProtagonist, highlighted, onChange, onRemove }: CharacterCardProps) {
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  return (
    <div
      id={`character-${c.id}`}
      className="scroll-mt-44 rounded-xl border bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] transition-[box-shadow,border-color] duration-500"
      style={{
        borderColor: highlighted ? accent : 'var(--color-line)',
        boxShadow: highlighted ? `0 0 0 3px color-mix(in srgb, ${accent} 22%, transparent), var(--shadow-card)` : undefined,
      }}
    >
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormField
          accent={accent}
          label="Name"
          placeholder="e.g. John Doe"
          value={c.name}
          onChange={(name) =>
            onChange(
              c.arcStart || c.arcChallenge || c.arcEnd
                ? { name, arcSummary: composeArcSummary(name, c.arcStart, c.arcChallenge, c.arcEnd) }
                : { name },
            )
          }
        />
        <FormField accent={accent} label="Sex" placeholder="e.g. Male" value={c.sex} onChange={(sex) => onChange({ sex })} />
        <FormField accent={accent} label="Age" placeholder="e.g. 34" value={c.age} onChange={(age) => onChange({ age })} />
        <FormField accent={accent} label="Race" placeholder="e.g. White" value={c.race} onChange={(race) => onChange({ race })} />
      </div>
      <div className="mb-6">
        <FormField
          accent={accent}
          label="Profession"
          placeholder="e.g. Night-shift paramedic"
          value={c.profession}
          onChange={(profession) => onChange({ profession })}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          as="textarea"
          accent={accent}
          label="Strength"
          prompt="What are they best at? Physical, emotional, spiritual, or intellectual."
          placeholder="e.g. John stays calm when everyone else panics."
          value={c.strength}
          onChange={(strength) => onChange({ strength })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Strength Reason"
          prompt="Why do they have this strength?"
          placeholder="e.g. As the oldest of five with an absent father, he was the one who handled every emergency at home."
          value={c.strengthReason}
          onChange={(strengthReason) => onChange({ strengthReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Weakness"
          prompt="What are they worst at? The character flaw that hinders them most."
          placeholder="e.g. John can't ask anyone for help."
          value={c.weakness}
          onChange={(weakness) => onChange({ weakness })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Weakness Reason"
          prompt="Why do they have this weakness?"
          placeholder="e.g. Every time he leaned on someone as a kid, they let him down."
          value={c.weaknessReason}
          onChange={(weaknessReason) => onChange({ weaknessReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Inner Conflict"
          prompt="What are they internally struggling with — spiritually, mentally, emotionally?"
          placeholder="e.g. John feels he's only worth something when he's saving someone."
          value={c.innerConflict}
          onChange={(innerConflict) => onChange({ innerConflict })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Inner Conflict Reason"
          prompt="Why are they struggling?"
          placeholder="e.g. His father walked out the night John froze during his mother's seizure, and he's blamed himself ever since."
          value={c.innerConflictReason}
          onChange={(innerConflictReason) => onChange({ innerConflictReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Established Norm"
          prompt="Before the plot begins, what is this character doing day to day?"
          placeholder="e.g. John works nights, sleeps days, sends money home, and avoids his empty apartment."
          value={c.establishedNorm}
          onChange={(establishedNorm) => onChange({ establishedNorm })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Goal"
          prompt="The objective — what they want most in life before the plot begins. Must be personal."
          placeholder="e.g. John wants to become a flight medic."
          value={c.goal}
          onChange={(goal) => onChange({ goal })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Goal Reason"
          prompt="Why do they want this thing?"
          placeholder="e.g. Being the first one to arrive at the worst moments makes him feel like he's finally enough."
          value={c.goalReason}
          onChange={(goalReason) => onChange({ goalReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="What makes them dynamic?"
          prompt="A unique trait, often in opposition to another. Juxtaposition, hypocrisy, dilemma."
          placeholder="e.g. He saves strangers for a living, but won't let anyone close enough to save him."
          value={c.dynamic}
          onChange={(dynamic) => onChange({ dynamic })}
        />
      </div>

      {!isProtagonist && (
        <div className="mt-6 grid gap-6 rounded-lg bg-[var(--color-paper-soft)] p-4 sm:grid-cols-2">
          <FormField
            as="textarea"
            accent={accent}
            label="Significance"
            prompt="What makes this character important to the protagonist?"
            placeholder="e.g. Jane is John's partner on the ambulance and the only person he lets see him tired."
            value={c.significance}
            onChange={(significance) => onChange({ significance })}
          />
          <FormField
            as="textarea"
            accent={accent}
            label="Similarity"
            prompt="What makes this character similar to the protagonist?"
            placeholder="e.g. Like John, Jane would rather run into a fire than talk about her feelings."
            value={c.similarity}
            onChange={(similarity) => onChange({ similarity })}
          />
        </div>
      )}

      <CharacterArcBuilder character={c} accent={accent} onChange={onChange} />

      {onRemove && (
        <div className="mt-6 flex justify-end">
          {confirmingRemove ? (
            <div
              role="alertdialog"
              aria-label="Confirm character removal"
              className="flex flex-wrap items-center justify-end gap-3 rounded-lg border border-[var(--color-character-500)]/40 bg-[var(--color-character-100)] px-4 py-3 text-sm"
            >
              <span className="text-[var(--color-ink)]">
                Remove <strong>{c.name.trim() || 'this character'}</strong>? Everything written for them will be
                lost. This can't be undone.
              </span>
              <button
                onClick={() => setConfirmingRemove(false)}
                className="rounded-full border border-[var(--color-line-strong)] bg-[var(--color-card)] px-4 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                Keep
              </button>
              <button
                onClick={onRemove}
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                style={{ background: 'var(--color-character-500)' }}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmingRemove(true)}
              className="text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]"
            >
              Remove this character
            </button>
          )}
        </div>
      )}
    </div>
  );
}
