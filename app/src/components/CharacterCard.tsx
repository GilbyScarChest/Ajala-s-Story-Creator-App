import { FormField } from './FormField';
import type { Character, CharacterArcType } from '../types/story';

const ARC_OPTIONS: { value: CharacterArcType; label: string; blurb: string }[] = [
  { value: 'growth', label: 'Growth Arc', blurb: 'Begins dark, is challenged, becomes a better person.' },
  { value: 'change', label: 'Change Arc', blurb: 'Begins as one type of person, becomes a different type.' },
  { value: 'fall', label: 'Fall Arc', blurb: 'Begins good, is worn down, becomes darker.' },
  { value: 'flat', label: 'Flat Arc', blurb: 'Believes something so strongly that nothing changes them.' },
];

interface CharacterCardProps {
  character: Character;
  accent: string;
  isProtagonist: boolean;
  onChange: (patch: Partial<Character>) => void;
  onRemove?: () => void;
}

export function CharacterCard({ character: c, accent, isProtagonist, onChange, onRemove }: CharacterCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormField accent={accent} label="Name" value={c.name} onChange={(name) => onChange({ name })} />
        <FormField accent={accent} label="Sex" value={c.sex} onChange={(sex) => onChange({ sex })} />
        <FormField accent={accent} label="Age" value={c.age} onChange={(age) => onChange({ age })} />
        <FormField accent={accent} label="Race" value={c.race} onChange={(race) => onChange({ race })} />
      </div>
      <div className="mb-6">
        <FormField
          accent={accent}
          label="Profession"
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
          value={c.strength}
          onChange={(strength) => onChange({ strength })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Strength Reason"
          prompt="Why do they have this strength?"
          value={c.strengthReason}
          onChange={(strengthReason) => onChange({ strengthReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Weakness"
          prompt="What are they worst at? The character flaw that hinders them most."
          value={c.weakness}
          onChange={(weakness) => onChange({ weakness })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Weakness Reason"
          prompt="Why do they have this weakness?"
          value={c.weaknessReason}
          onChange={(weaknessReason) => onChange({ weaknessReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Inner Conflict"
          prompt="What are they internally struggling with — spiritually, mentally, emotionally?"
          value={c.innerConflict}
          onChange={(innerConflict) => onChange({ innerConflict })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Inner Conflict Reason"
          prompt="Why are they struggling?"
          value={c.innerConflictReason}
          onChange={(innerConflictReason) => onChange({ innerConflictReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Established Norm"
          prompt="Before the plot begins, what is this character doing day to day?"
          value={c.establishedNorm}
          onChange={(establishedNorm) => onChange({ establishedNorm })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Goal"
          prompt="The objective — what they want most in life before the plot begins. Must be personal."
          value={c.goal}
          onChange={(goal) => onChange({ goal })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="Goal Reason"
          prompt="Why do they want this thing?"
          value={c.goalReason}
          onChange={(goalReason) => onChange({ goalReason })}
        />
        <FormField
          as="textarea"
          accent={accent}
          label="What makes them dynamic?"
          prompt="A unique trait, often in opposition to another. Juxtaposition, hypocrisy, dilemma."
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
            value={c.significance}
            onChange={(significance) => onChange({ significance })}
          />
          <FormField
            as="textarea"
            accent={accent}
            label="Similarity"
            prompt="What makes this character similar to the protagonist?"
            value={c.similarity}
            onChange={(similarity) => onChange({ similarity })}
          />
        </div>
      )}

      <div className="mt-6">
        <span className="mb-2 block font-serif text-[1.05rem] text-[var(--color-ink)]">Character Arc</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ARC_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ arcType: opt.value })}
              className="rounded-lg border px-3 py-2 text-left text-xs transition"
              style={{
                borderColor: c.arcType === opt.value ? accent : 'var(--color-line)',
                background: c.arcType === opt.value ? `${accent}14` : 'transparent',
              }}
            >
              <div className="font-semibold text-[var(--color-ink)]">{opt.label}</div>
              <div className="mt-0.5 text-[var(--color-ink-faint)] leading-snug">{opt.blurb}</div>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <FormField
            as="textarea"
            rows={2}
            accent={accent}
            label="Arc summary"
            placeholder="In the beginning, they believe ___. By the end, they understand ___."
            value={c.arcSummary}
            onChange={(arcSummary) => onChange({ arcSummary })}
          />
        </div>
      </div>

      {onRemove && (
        <div className="mt-6 text-right">
          <button onClick={onRemove} className="text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]">
            Remove this character
          </button>
        </div>
      )}
    </div>
  );
}
