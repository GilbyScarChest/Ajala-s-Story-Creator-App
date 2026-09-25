interface PageHeaderProps {
  icon?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
}

export function PageHeader({ icon, eyebrow, title, subtitle, accent = 'var(--color-gold-500)' }: PageHeaderProps) {
  return (
    <header className="mb-8 flex items-start gap-5">
      {icon && (
        <img
          src={icon}
          alt=""
          className="h-20 w-auto max-w-[9rem] shrink-0 object-contain object-left mt-1"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.06))' }}
        />
      )}
      <div>
        {eyebrow && (
          <div
            className="text-xs font-semibold uppercase tracking-[0.16em] mb-1"
            style={{ color: accent }}
          >
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl text-[var(--color-ink)] m-0">{title}</h1>
        <div className="h-[3px] w-14 rounded-full mt-3" style={{ background: accent }} />
        {subtitle && <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed">{subtitle}</p>}
      </div>
    </header>
  );
}
