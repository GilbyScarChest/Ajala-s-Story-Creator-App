import { ROLE_LABEL } from '../types/story';
import type { Character, CharacterRole } from '../types/story';

const ROLE_ORDER: CharacterRole[] = ['protagonist', 'deuteragonist', 'tertiary', 'antagonist'];

const SHORT_ROLE_LABEL: Record<CharacterRole, string> = {
  protagonist: 'Protagonist',
  deuteragonist: 'Secondary',
  tertiary: 'Tertiary',
  antagonist: 'Antagonist',
};

function Silhouette({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
      <circle cx={20} cy={14} r={7.5} fill={color} />
      <path d="M5 40 C5 29, 11.5 24.5, 20 24.5 C28.5 24.5, 35 29, 35 40 Z" fill={color} />
    </svg>
  );
}

interface CharacterQuickNavProps {
  characters: Character[];
  currentRole: CharacterRole;
  focusedId?: string;
  accent: string;
  onSelect: (character: Character) => void;
}

export function CharacterQuickNav({ characters, currentRole, focusedId, accent, onSelect }: CharacterQuickNavProps) {
  const ordered = ROLE_ORDER.flatMap((role) => characters.filter((c) => c.role === role));
  if (ordered.length === 0) return null;

  return (
    <nav aria-label="Your characters" className="sticky top-0 z-10 mb-8 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-soft)] px-4 py-3 shadow-[var(--shadow-card)]">
      <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
        Your characters
      </div>
      <ul className="flex gap-3 overflow-x-auto pb-1">
        {ordered.map((c) => {
          const inRole = c.role === currentRole;
          const focused = c.id === focusedId;
          const displayName = c.name.trim() || 'Unnamed';
          return (
            <li key={c.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(c)}
                title={`${displayName} — ${ROLE_LABEL[c.role]}`}
                aria-current={focused ? 'true' : undefined}
                className="group flex w-24 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-center transition hover:bg-[var(--color-card)]"
              >
                <span
                  className="block h-12 w-12 overflow-hidden rounded-full border-2 transition group-hover:scale-105"
                  style={{
                    borderColor: focused ? accent : inRole ? `color-mix(in srgb, ${accent} 45%, transparent)` : 'var(--color-line)',
                    background: inRole ? `color-mix(in srgb, ${accent} 10%, var(--color-card))` : 'var(--color-card)',
                  }}
                >
                  <Silhouette color={inRole ? accent : 'var(--color-line-strong)'} />
                </span>
                <span
                  className="w-full truncate text-xs"
                  style={{
                    color: c.name.trim() ? 'var(--color-ink)' : 'var(--color-ink-faint)',
                    fontWeight: focused || inRole ? 600 : 500,
                    fontStyle: c.name.trim() ? undefined : 'italic',
                  }}
                >
                  {displayName}
                </span>
                <span className="w-full truncate text-[0.6rem] uppercase tracking-wider text-[var(--color-ink-faint)]">
                  {SHORT_ROLE_LABEL[c.role]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
