import { useRef } from 'react';
import type { Character, CharacterArcType } from '../types/story';
import { arcClause, composeArcSummary } from '../builder/arc';

type ArcKind = Exclude<CharacterArcType, ''>;
type ArcPart = 'arcStart' | 'arcChallenge' | 'arcEnd';
interface Point {
  x: number;
  y: number;
}

/** Points in a 300×110 box. Higher on the chart (smaller y) reads as "lighter" / better off. */
const ARCS: Record<
  ArcKind,
  {
    label: string;
    blurb: string;
    points: [Point, Point, Point];
    bookExample: string;
    placeholders: Record<ArcPart, string>;
  }
> = {
  growth: {
    label: 'Growth Arc',
    blurb: 'Begins dark, is challenged, becomes a better person.',
    points: [{ x: 20, y: 78 }, { x: 150, y: 92 }, { x: 280, y: 16 }],
    bookExample:
      'LaSonia spends her days believing that violence is how you earn respect. By the end of the story she understands that love is how you earn respect.',
    placeholders: {
      arcStart: 'e.g. he has to carry everyone alone and can never ask for help',
      arcChallenge: "e.g. a pile-up he can't handle alone forces him to lean on his partner",
      arcEnd: 'e.g. letting people help him is its own kind of strength',
    },
  },
  change: {
    label: 'Change Arc',
    blurb: 'Begins as one type of person, becomes a different type.',
    points: [{ x: 20, y: 72 }, { x: 150, y: 28 }, { x: 280, y: 46 }],
    bookExample:
      'LaSonia spends her days believing that telling people what they want to hear is how you earn respect. By the end of the story she understands that telling people the truth is how you earn respect.',
    placeholders: {
      arcStart: 'e.g. keeping everyone calm is the most important part of the job',
      arcChallenge: 'e.g. he uncovers a hospital cover-up where staying calm means staying quiet',
      arcEnd: 'e.g. sometimes doing the right thing means making a lot of noise',
    },
  },
  fall: {
    label: 'Fall Arc',
    blurb: 'Begins good, is worn down, becomes darker.',
    points: [{ x: 20, y: 22 }, { x: 150, y: 42 }, { x: 280, y: 94 }],
    bookExample:
      'LaSonia spends her days believing that being kind is how you earn respect. By the end of the story she understands that fear is how you earn respect.',
    placeholders: {
      arcStart: 'e.g. everyone is worth saving, no matter what they have done',
      arcChallenge: 'e.g. a man he pulls from a wreck goes on to hurt his little sister',
      arcEnd: "e.g. some people aren't worth the risk, and he gets to decide who",
    },
  },
  flat: {
    label: 'Flat Arc',
    blurb: 'Believes something so strongly that nothing changes them.',
    points: [{ x: 20, y: 40 }, { x: 150, y: 86 }, { x: 280, y: 40 }],
    bookExample:
      'LaSonia spends her days believing that love is how you earn respect. By the end of the story she understands that love truly is how you earn respect.',
    placeholders: {
      arcStart: 'e.g. every life is worth fighting for',
      arcChallenge: 'e.g. budget cuts and burnout push his whole crew to start cutting corners',
      arcEnd: 'e.g. every life is still worth fighting for, and his crew starts to believe it too',
    },
  },
};

const ARC_ORDER: ArcKind[] = ['growth', 'change', 'fall', 'flat'];

const STAGES: { part: ArcPart; label: string; short: string }[] = [
  { part: 'arcStart', label: 'In the beginning', short: 'Beginning' },
  { part: 'arcChallenge', label: 'What challenges them', short: 'Challenge' },
  { part: 'arcEnd', label: 'By the end', short: 'End' },
];

function arcPath([s, m, e]: [Point, Point, Point]) {
  return `M ${s.x} ${s.y} C ${s.x + 60} ${s.y}, ${m.x - 60} ${m.y}, ${m.x} ${m.y} S ${e.x - 60} ${e.y}, ${e.x} ${e.y}`;
}

function ArcSparkline({ kind, color, className }: { kind: ArcKind; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 110" className={className} aria-hidden>
      <path d={arcPath(ARCS[kind].points)} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
    </svg>
  );
}

interface CharacterArcBuilderProps {
  character: Character;
  accent: string;
  onChange: (patch: Partial<Character>) => void;
}

export function CharacterArcBuilder({ character: c, accent, onChange }: CharacterArcBuilderProps) {
  const fieldRefs = useRef<Partial<Record<ArcPart, HTMLTextAreaElement | null>>>({});
  const kind: ArcKind = c.arcType || 'growth';
  const arc = ARCS[kind];
  const name = c.name.trim();
  const pronounName = name || 'they';

  const updatePart = (part: ArcPart, value: string) => {
    const next = { arcStart: c.arcStart, arcChallenge: c.arcChallenge, arcEnd: c.arcEnd, [part]: value };
    onChange({ [part]: value, arcSummary: composeArcSummary(c.name, next.arcStart, next.arcChallenge, next.arcEnd) });
  };

  const insertInspiration = (part: ArcPart, text: string) => {
    const current = c[part].trim();
    updatePart(part, current ? `${current} ${arcClause(text)}` : arcClause(text));
    fieldRefs.current[part]?.focus();
  };

  const inspirations: Record<ArcPart, { label: string; text: string }[]> = {
    arcStart: [
      { label: 'Weakness', text: c.weakness },
      { label: 'Inner conflict', text: c.innerConflict },
    ],
    arcChallenge: [
      { label: 'Goal', text: c.goal },
      { label: 'Inner conflict reason', text: c.innerConflictReason },
    ],
    arcEnd: [
      { label: 'Strength', text: c.strength },
      { label: 'Goal reason', text: c.goalReason },
    ],
  };

  const filledCount = STAGES.filter((s) => c[s.part].trim()).length;
  const hasParts = filledCount > 0;
  const preview = hasParts
    ? composeArcSummary(c.name, c.arcStart, c.arcChallenge, c.arcEnd)
    : c.arcSummary;

  return (
    <div className="mt-6">
      <span className="mb-1 block font-serif text-[1.05rem] text-[var(--color-ink)]">Character Arc</span>
      <span className="mb-3 block text-sm italic leading-snug text-[var(--color-ink-faint)]">
        Pick the shape of {name ? `${name}'s` : 'their'} journey, then fill in where they start, what tests them, and
        where they land.
      </span>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ARC_ORDER.map((value) => {
          const selected = c.arcType === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange({ arcType: selected ? '' : value })}
              className="rounded-lg border px-3 py-2 text-left text-xs transition hover:-translate-y-0.5"
              style={{
                borderColor: selected ? accent : 'var(--color-line)',
                background: selected ? `color-mix(in srgb, ${accent} 8%, transparent)` : 'transparent',
              }}
            >
              <ArcSparkline
                kind={value}
                color={selected ? accent : 'var(--color-line-strong)'}
                className="mb-1.5 h-7 w-full"
              />
              <div className="font-semibold text-[var(--color-ink)]">{ARCS[value].label}</div>
              <div className="mt-0.5 leading-snug text-[var(--color-ink-faint)]">{ARCS[value].blurb}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-4">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>
            {c.arcType ? arc.label : 'Choose an arc above'} · {filledCount}/3 stages
          </span>
          <span className="text-[0.68rem] text-[var(--color-ink-faint)]">Click a point to jump to that stage</span>
        </div>

        <svg viewBox="0 0 300 110" className="h-28 w-full overflow-visible" role="img" aria-label={`${arc.label} diagram`}>
          <line x1={0} y1={106} x2={300} y2={106} stroke="var(--color-line)" strokeWidth={1} />
          <path
            d={arcPath(arc.points)}
            fill="none"
            stroke={c.arcType ? accent : 'var(--color-line-strong)'}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={c.arcType ? undefined : '6 6'}
            style={{ transition: 'd 400ms ease' }}
          />
          {STAGES.map((stage, i) => {
            const p = arc.points[i];
            const filled = !!c[stage.part].trim();
            return (
              <g
                key={stage.part}
                className="cursor-pointer"
                onClick={() => fieldRefs.current[stage.part]?.focus()}
                style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: 'transform 400ms ease' }}
              >
                <circle r={11} fill="transparent" />
                <circle
                  r={6}
                  fill={filled ? accent : 'var(--color-card)'}
                  stroke={c.arcType ? accent : 'var(--color-line-strong)'}
                  strokeWidth={2}
                />
                <text
                  y={p.y > 60 ? -12 : 20}
                  textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'}
                  x={i === 0 ? -8 : i === 2 ? 8 : 0}
                  className="fill-[var(--color-ink-soft)] text-[9px] font-semibold uppercase tracking-wider"
                >
                  {stage.short}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {STAGES.map((stage) => (
            <div key={stage.part}>
              <label htmlFor={`${c.id}-${stage.part}`} className="mb-1 block text-sm font-semibold text-[var(--color-ink)]">
                {stage.label}
                {stage.part === 'arcStart' && <span className="font-normal">, {pronounName} {name ? 'believes' : 'believe'}…</span>}
                {stage.part === 'arcEnd' && <span className="font-normal">, {pronounName} {name ? 'understands' : 'understand'}…</span>}
              </label>
              <textarea
                id={`${c.id}-${stage.part}`}
                ref={(el) => {
                  fieldRefs.current[stage.part] = el;
                }}
                rows={3}
                value={c[stage.part]}
                placeholder={arc.placeholders[stage.part]}
                onChange={(e) => updatePart(stage.part, e.target.value)}
                className="w-full resize-y rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2 text-sm leading-relaxed text-[var(--color-ink)] shadow-sm outline-none transition focus:border-transparent focus:ring-2"
                style={{ ['--tw-ring-color' as string]: accent }}
              />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {inspirations[stage.part]
                  .filter((insp) => insp.text.trim())
                  .map((insp) => (
                    <button
                      key={insp.label}
                      type="button"
                      title={insp.text}
                      onClick={() => insertInspiration(stage.part, insp.text)}
                      className="rounded-full border border-[var(--color-line-strong)] px-2 py-0.5 text-[0.68rem] text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
                    >
                      + Use {insp.label.toLowerCase()}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-[var(--color-line)] pt-3">
          <div className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
            Arc summary
          </div>
          {preview ? (
            <p className="m-0 font-serif text-[0.97rem] leading-relaxed text-[var(--color-ink)]">“{preview}”</p>
          ) : (
            <p className="m-0 text-sm italic text-[var(--color-ink-faint)]">
              Your arc sentence builds itself as you fill in the stages. From the book: {arc.bookExample}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
