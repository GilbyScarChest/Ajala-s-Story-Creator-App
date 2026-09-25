import { useMemo } from 'react';
import { STEPS } from '../builder/steps';
import type { StepId } from '../builder/steps';
import { isStepComplete } from '../builder/completion';
import { useStory } from '../context/StoryContext';

interface BuilderSidebarProps {
  current: StepId;
  onNavigate: (id: StepId) => void;
  onBack: () => void;
}

export function BuilderSidebar({ current, onNavigate, onBack }: BuilderSidebarProps) {
  const { story, setTitle } = useStory();

  const groups = useMemo(() => {
    const map = new Map<string, typeof STEPS>();
    for (const step of STEPS) {
      const list = map.get(step.group) ?? [];
      list.push(step);
      map.set(step.group, list as typeof STEPS);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-paper-soft)]">
      <div className="px-6 pt-7 pb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-left">
          <span
            className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
            style={{ color: 'var(--color-gold-600)' }}
          >
            ← Hub
          </span>
        </button>
      </div>

      <div className="px-6 pb-4">
        <input
          value={story.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Story"
          className="w-full border-b border-transparent bg-transparent font-serif text-lg text-[var(--color-ink)] outline-none transition focus:border-[var(--color-line-strong)]"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {groups.map(([group, steps]) => (
          <div key={group} className="mb-5">
            <div className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
              {group}
            </div>
            <ul className="space-y-0.5">
              {steps.map((step) => {
                const active = step.id === current;
                const done = isStepComplete(story, step.id);
                return (
                  <li key={step.id}>
                    <button
                      onClick={() => onNavigate(step.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition"
                      style={{
                        background: active ? step.accentSoft : 'transparent',
                        color: active ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: done ? step.accent : 'var(--color-line-strong)' }}
                      />
                      <span className="flex-1">{step.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
