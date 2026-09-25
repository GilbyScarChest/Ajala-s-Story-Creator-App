import { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { FormField } from '../../components/FormField';
import { useStory } from '../../context/StoryContext';
import { toolMeta } from '../../workspace/tools';
import { ROLE_LABEL } from '../../types/story';
import type { MoralAlignment, EthicalAlignment } from '../../types/story';
import characterBuilderIcon from '../../assets/icons/character-builder.png';

type Tab = 'background' | 'current' | 'traits' | 'backstory' | 'notes';

const MORAL: { value: MoralAlignment; label: string }[] = [
  { value: 'lawful', label: 'Lawful' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'chaotic', label: 'Chaotic' },
];
const ETHICAL: { value: EthicalAlignment; label: string }[] = [
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' },
];

export function CharacterProfilerApp({ onBack }: { onBack: () => void }) {
  const { story, updateCharacterProfile } = useStory();
  const meta = toolMeta('character-profiler');
  const [characterId, setCharacterId] = useState<string | null>(story.characters[0]?.id ?? null);
  const [tab, setTab] = useState<Tab>('background');

  const character = story.characters.find((c) => c.id === characterId) ?? story.characters[0] ?? null;

  if (!character) {
    return (
      <ToolShell title="Character Profiler" icon={characterBuilderIcon} accent={meta.accent} onBack={onBack}>
        <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-10 text-center text-[var(--color-ink-soft)]">
          Add a character in the Story Builder first, then come back here to go deep on them.
        </div>
      </ToolShell>
    );
  }

  const p = character.profile;
  const set = (patch: Partial<typeof p>) => updateCharacterProfile(character.id, patch);

  return (
    <ToolShell
      title="Character Profiler"
      icon={characterBuilderIcon}
      accent={meta.accent}
      subtitle="Character building can be thought of in six main traits: Background, Current Living Status, Relationship Status, Unique Traits, Personality Traits, and Backstory."
      onBack={onBack}
      tabs={[
        { id: 'background', label: 'Background' },
        { id: 'current', label: 'Current' },
        { id: 'traits', label: 'Traits' },
        { id: 'backstory', label: 'Backstory' },
        { id: 'notes', label: 'Notes' },
      ]}
      activeTab={tab}
      onTabChange={setTab}
      headerExtra={
        <select
          value={character.id}
          onChange={(e) => setCharacterId(e.target.value)}
          className="rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-card)] px-3 py-1.5 text-sm"
        >
          {story.characters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name ? `${c.name} (${ROLE_LABEL[c.role]})` : ROLE_LABEL[c.role]}
            </option>
          ))}
        </select>
      }
    >
      {tab === 'background' && (
        <div className="space-y-7">
          <p className="text-sm italic text-[var(--color-ink-faint)]">
            Who is your patient, Dr. Author? These are qualities out of the character's control — what they were
            born into or shaped by before your story begins.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField accent={meta.accent} label="Height" value={p.height} onChange={(height) => set({ height })} />
            <FormField accent={meta.accent} label="Body Type" value={p.bodyType} onChange={(bodyType) => set({ bodyType })} />
            <FormField accent={meta.accent} label="Nationality" value={p.nationality} onChange={(nationality) => set({ nationality })} />
            <FormField accent={meta.accent} label="Birth Place" value={p.birthPlace} onChange={(birthPlace) => set({ birthPlace })} />
          </div>
          <FormField accent={meta.accent} label="Raised" prompt="The location(s) the character grew up in." value={p.raised} onChange={(raised) => set({ raised })} />
          <FormField accent={meta.accent} label="Language/s" value={p.languages} onChange={(languages) => set({ languages })} />
          <FormField as="textarea" accent={meta.accent} label="Family" prompt="Immediate relatives and perceived family members." value={p.family} onChange={(family) => set({ family })} />
          <FormField accent={meta.accent} label="Socioeconomic level as a child" value={p.socioeconomicChild} onChange={(socioeconomicChild) => set({ socioeconomicChild })} />
          <FormField accent={meta.accent} label="Education" prompt="The highest level of schooling, training, or learning they received." value={p.educationLevel} onChange={(educationLevel) => set({ educationLevel })} />
        </div>
      )}

      {tab === 'current' && (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl text-[var(--color-ink)]">Current Living Status</h3>
            <div className="space-y-5">
              <FormField accent={meta.accent} label="Current Residence" value={p.currentResidence} onChange={(currentResidence) => set({ currentResidence })} />
              <FormField accent={meta.accent} label="Current Profession" value={p.currentProfession} onChange={(currentProfession) => set({ currentProfession })} />
              <FormField accent={meta.accent} label="Current Socioeconomic Level" value={p.currentSocioeconomic} onChange={(currentSocioeconomic) => set({ currentSocioeconomic })} />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl text-[var(--color-ink)]">Relationship Status</h3>
            <div className="space-y-5">
              <FormField as="textarea" accent={meta.accent} label="Romantic Beliefs" prompt="Their philosophy on love and how people are supposed to love others." value={p.romanticBeliefs} onChange={(romanticBeliefs) => set({ romanticBeliefs })} />
              <FormField accent={meta.accent} label="Sexual Orientation" value={p.sexualOrientation} onChange={(sexualOrientation) => set({ sexualOrientation })} />
              <FormField as="textarea" accent={meta.accent} label="Attraction" prompt="What they find attractive in others — physical, mental, situational." value={p.attraction} onChange={(attraction) => set({ attraction })} />
              <FormField as="textarea" accent={meta.accent} label="Significant Other" prompt="Their most important or influential romantic relationship, current or past." value={p.significantOther} onChange={(significantOther) => set({ significantOther })} />
            </div>
          </div>
        </div>
      )}

      {tab === 'traits' && (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl text-[var(--color-ink)]">Unique Traits</h3>
            <div className="space-y-5">
              <FormField as="textarea" accent={meta.accent} label="Talents/Skills" value={p.talentsSkills} onChange={(talentsSkills) => set({ talentsSkills })} />
              <FormField as="textarea" accent={meta.accent} label="Hobbies" value={p.hobbies} onChange={(hobbies) => set({ hobbies })} />
              <FormField as="textarea" accent={meta.accent} label="Life Goal" prompt="What they work every day to accomplish for their life to have meaning." value={p.lifeGoal} onChange={(lifeGoal) => set({ lifeGoal })} />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl text-[var(--color-ink)]">Personality Traits</h3>
            <div className="space-y-5">
              <FormField accent={meta.accent} label="Personality Type" prompt="Introvert, Extrovert, Introverted Extrovert, or Extroverted Introvert." value={p.personalityType} onChange={(personalityType) => set({ personalityType })} />
              <FormField accent={meta.accent} label="Intelligence" prompt="Street-Smarts, Book-Smarts, or Wisdom." value={p.intelligence} onChange={(intelligence) => set({ intelligence })} />
              <FormField as="textarea" accent={meta.accent} label="Spirituality" value={p.spirituality} onChange={(spirituality) => set({ spirituality })} />
              <FormField accent={meta.accent} label="Emotionality" value={p.emotionality} onChange={(emotionality) => set({ emotionality })} />
              <FormField as="textarea" accent={meta.accent} label="Core Values" prompt="Unshakeable personal values — the pillars of all their beliefs and actions." value={p.coreValues} onChange={(coreValues) => set({ coreValues })} />
              <FormField as="textarea" accent={meta.accent} label="Social Values" value={p.socialValues} onChange={(socialValues) => set({ socialValues })} />
              <FormField as="textarea" accent={meta.accent} label="Greatest Perceived Strength" value={p.perceivedStrength} onChange={(perceivedStrength) => set({ perceivedStrength })} />
              <FormField as="textarea" accent={meta.accent} label="Greatest Actual Strength" value={p.actualStrength} onChange={(actualStrength) => set({ actualStrength })} />
              <FormField as="textarea" accent={meta.accent} label="Greatest Perceived Weakness" value={p.perceivedWeakness} onChange={(perceivedWeakness) => set({ perceivedWeakness })} />
              <FormField as="textarea" accent={meta.accent} label="Greatest Actual Weakness" value={p.actualWeakness} onChange={(actualWeakness) => set({ actualWeakness })} />

              <div>
                <span className="mb-2 block font-serif text-[1.05rem] text-[var(--color-ink)]">Alignment</span>
                <p className="mb-3 text-sm italic text-[var(--color-ink-faint)]">
                  The moral and ethical stance that defines a character's intentions and actions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Moral</div>
                    <div className="flex gap-2">
                      {MORAL.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => set({ moralAlignment: opt.value })}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          style={{
                            background: p.moralAlignment === opt.value ? meta.accent : 'transparent',
                            color: p.moralAlignment === opt.value ? '#fff' : 'var(--color-ink-soft)',
                            border: `1px solid ${p.moralAlignment === opt.value ? meta.accent : 'var(--color-line-strong)'}`,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Ethical</div>
                    <div className="flex gap-2">
                      {ETHICAL.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => set({ ethicalAlignment: opt.value })}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          style={{
                            background: p.ethicalAlignment === opt.value ? meta.accent : 'transparent',
                            color: p.ethicalAlignment === opt.value ? '#fff' : 'var(--color-ink-soft)',
                            border: `1px solid ${p.ethicalAlignment === opt.value ? meta.accent : 'var(--color-line-strong)'}`,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'backstory' && (
        <div className="space-y-4">
          <p className="text-sm italic text-[var(--color-ink-faint)]">
            The character's history until now. Use the traits from earlier sections to write a paragraph or essay
            detailing the past events connected to your character.
          </p>
          <FormField as="textarea" rows={16} accent={meta.accent} label="Backstory" value={p.backstory} onChange={(backstory) => set({ backstory })} />
        </div>
      )}

      {tab === 'notes' && (
        <div className="space-y-4">
          <p className="text-sm italic text-[var(--color-ink-faint)]">
            A quick-reference list of major moments that shape who they are — fears, love interests, mentors,
            motifs, anything that seems important.
          </p>
          <FormField as="textarea" rows={12} accent={meta.accent} label="Important Character Notes" value={p.notes} onChange={(notes) => set({ notes })} />
        </div>
      )}
    </ToolShell>
  );
}
