import type { ReactNode } from 'react';

export function ExampleCallout({ label = 'From the book', children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-[var(--color-gold-300)]/60 bg-[var(--color-gold-100)] px-4 py-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
      <div className="mb-1 font-semibold uppercase tracking-wide text-[0.68rem] text-[var(--color-gold-700)]">
        {label}
      </div>
      {children}
    </aside>
  );
}
