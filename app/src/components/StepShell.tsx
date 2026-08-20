import type { ReactNode } from 'react';
import { STEPS, stepIndex } from '../builder/steps';
import type { StepId } from '../builder/steps';

interface StepShellProps {
  id: StepId;
  onNavigate: (id: StepId) => void;
  children: ReactNode;
}

export function StepShell({ id, onNavigate, children }: StepShellProps) {
  const idx = stepIndex(id);
  const prev = idx > 0 ? STEPS[idx - 1] : null;
  const next = idx < STEPS.length - 1 ? STEPS[idx + 1] : null;

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-10 py-10">
      <div className="flex-1">{children}</div>
      <div className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-6">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.id)}
            className="rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            ← {prev.label}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button
            onClick={() => onNavigate(next.id)}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: 'var(--color-ink)' }}
          >
            {next.label} →
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
