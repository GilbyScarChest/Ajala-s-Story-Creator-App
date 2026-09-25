import type { ReactNode } from 'react';

export interface TabDef<T extends string> {
  id: T;
  label: string;
}

interface ToolShellProps<T extends string> {
  title: string;
  icon?: string;
  accent: string;
  subtitle?: string;
  onBack: () => void;
  tabs?: TabDef<T>[];
  activeTab?: T;
  onTabChange?: (id: T) => void;
  headerExtra?: ReactNode;
  children: ReactNode;
}

export function ToolShell<T extends string>({
  title,
  icon,
  accent,
  subtitle,
  onBack,
  tabs,
  activeTab,
  onTabChange,
  headerExtra,
  children,
}: ToolShellProps<T>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-line)] bg-[var(--color-paper-soft)] px-10 py-6">
        <button
          onClick={onBack}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          ← Hub
        </button>
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            {icon && <img src={icon} alt="" className="h-12 w-auto max-w-[7rem] object-contain" />}
            <div>
              <h1 className="m-0 text-3xl text-[var(--color-ink)]">{title}</h1>
              {subtitle && <p className="mt-1 max-w-2xl text-sm text-[var(--color-ink-soft)]">{subtitle}</p>}
            </div>
          </div>
          {headerExtra}
        </div>

        {tabs && tabs.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold transition"
                style={{
                  background: activeTab === tab.id ? accent : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--color-ink-soft)',
                  border: `1px solid ${activeTab === tab.id ? accent : 'var(--color-line-strong)'}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-3xl px-10 py-10">{children}</main>
    </div>
  );
}
