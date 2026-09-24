import { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { FormField } from '../../components/FormField';
import { useStory } from '../../context/StoryContext';
import { toolMeta } from '../../workspace/tools';
import { ROLE_LABEL } from '../../types/story';

function displayName(name: string, role: string) {
  return name || ROLE_LABEL[role as keyof typeof ROLE_LABEL];
}

export function CharacterWebApp({ onBack }: { onBack: () => void }) {
  const { story, addRelationship, updateRelationship, removeRelationship } = useStory();
  const meta = toolMeta('character-web');
  const characters = story.characters;
  const [pendingA, setPendingA] = useState('');
  const [pendingB, setPendingB] = useState('');

  const size = 460;
  const center = size / 2;
  const radius = size / 2 - 70;
  const positions = new Map<string, { x: number; y: number }>();
  characters.forEach((c, i) => {
    const angle = (i / Math.max(characters.length, 1)) * Math.PI * 2 - Math.PI / 2;
    positions.set(c.id, {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    });
  });

  const handleAdd = () => {
    if (!pendingA || !pendingB || pendingA === pendingB) return;
    addRelationship(pendingA, pendingB);
    setPendingA('');
    setPendingB('');
  };

  return (
    <ToolShell
      title="Character Web"
      accent={meta.accent}
      subtitle="Map the relationships that connect your cast — who matters to whom, and why."
      onBack={onBack}
    >
      {characters.length < 2 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-10 text-center text-[var(--color-ink-soft)]">
          Add at least two characters in the Story Builder to start mapping relationships.
        </div>
      ) : (
        <>
          <div className="mb-10 flex justify-center">
            <svg width={size} height={size} className="overflow-visible">
              {story.relationships.map((r) => {
                const a = positions.get(r.characterAId);
                const b = positions.get(r.characterBId);
                if (!a || !b) return null;
                return (
                  <line
                    key={r.id}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={meta.accent}
                    strokeWidth={1.5}
                    strokeOpacity={0.45}
                  />
                );
              })}
              {characters.map((c) => {
                const pos = positions.get(c.id)!;
                return (
                  <g key={c.id}>
                    <circle cx={pos.x} cy={pos.y} r={7} fill={meta.accent} />
                    <text
                      x={pos.x}
                      y={pos.y + (pos.y > center ? 22 : -14)}
                      textAnchor="middle"
                      fontSize={13}
                      fontFamily="var(--font-serif)"
                      fill="var(--color-ink)"
                    >
                      {displayName(c.name, c.role)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mb-8 rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-lg text-[var(--color-ink)]">Add a relationship</h3>
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <label className="block">
                <span className="mb-1 block text-sm text-[var(--color-ink-soft)]">Character A</span>
                <select
                  value={pendingA}
                  onChange={(e) => setPendingA(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2 text-sm"
                >
                  <option value="">Choose…</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>{displayName(c.name, c.role)}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-[var(--color-ink-soft)]">Character B</span>
                <select
                  value={pendingB}
                  onChange={(e) => setPendingB(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2 text-sm"
                >
                  <option value="">Choose…</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>{displayName(c.name, c.role)}</option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleAdd}
                disabled={!pendingA || !pendingB || pendingA === pendingB}
                className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
                style={{ background: meta.accent }}
              >
                + Link
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {story.relationships.map((r) => (
              <div key={r.id} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-3 font-serif text-lg text-[var(--color-ink)]">
                  {displayName(
                    characters.find((c) => c.id === r.characterAId)?.name ?? '',
                    characters.find((c) => c.id === r.characterAId)?.role ?? 'protagonist',
                  )}
                  {' ↔ '}
                  {displayName(
                    characters.find((c) => c.id === r.characterBId)?.name ?? '',
                    characters.find((c) => c.id === r.characterBId)?.role ?? 'protagonist',
                  )}
                </div>
                <div className="space-y-3">
                  <FormField accent={meta.accent} label="Relationship" placeholder="e.g. Mother & Son" value={r.label} onChange={(label) => updateRelationship(r.id, { label })} />
                  <FormField as="textarea" accent={meta.accent} label="Description" value={r.description} onChange={(description) => updateRelationship(r.id, { description })} />
                </div>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => removeRelationship(r.id)}
                    className="text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </ToolShell>
  );
}
