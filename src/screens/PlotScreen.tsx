import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import plotIcon from '../assets/icons/plot.png';

const THREADS = [
  {
    key: 'aPlot' as const,
    label: 'A Plot',
    desc: 'Takes precedence over all other plots. Mainly concerns the Protagonist and the Antagonist.',
  },
  {
    key: 'bPlot' as const,
    label: 'B Plot',
    desc: 'Directly affects and informs the A plot. Mainly concerns the Deuteragonist and/or the Protagonist.',
  },
  {
    key: 'cPlot' as const,
    label: 'C Plot',
    desc: 'Indirectly affects and informs the A plot. Mainly concerns Tertiary characters and/or the Protagonist.',
  },
];

export function PlotScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updatePlot } = useStory();
  const meta = stepMeta('plot');
  const [active, setActive] = useState<'aPlot' | 'bPlot' | 'cPlot'>('aPlot');
  const thread = story.plot[active];
  const activeThread = THREADS.find((t) => t.key === active)!;

  return (
    <StepShell id="plot" onNavigate={onNavigate}>
      <PageHeader
        icon={plotIcon}
        eyebrow="Step 4 — What Had Happened Was…"
        title="Plot"
        accent={meta.accent}
        subtitle="Plot, aka the Story Arc, is the major events in a story concerning the Intention, Obstacle, Stakes, and Timeframe. Know these four parts before you start writing."
      />

      <div className="mb-6 flex gap-2">
        {THREADS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold transition"
            style={{
              background: active === t.key ? meta.accent : 'transparent',
              color: active === t.key ? '#fff' : 'var(--color-ink-soft)',
              border: `1px solid ${active === t.key ? meta.accent : 'var(--color-line-strong)'}`,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mb-6 -mt-2 text-sm italic text-[var(--color-ink-faint)]">{activeThread.desc}</p>

      <div className="space-y-7">
        <FormField
          as="textarea"
          rows={2}
          accent={meta.accent}
          label="Intention"
          prompt="Also known as the super objective — the motivating factor for the plot. Life and death, internally or externally."
          value={thread.intention}
          onChange={(intention) => updatePlot(active, { intention })}
        />
        <FormField
          as="textarea"
          rows={2}
          accent={meta.accent}
          label="Obstacle"
          prompt="The major source of conflict. It must be deeply personal and unavoidable — a wall the characters simply have to get past."
          value={thread.obstacle}
          onChange={(obstacle) => updatePlot(active, { obstacle })}
        />
        <FormField
          as="textarea"
          rows={2}
          accent={meta.accent}
          label="Stakes"
          prompt="The major consequences of success or failure. Without stakes, there's no reason to care."
          value={thread.stakes}
          onChange={(stakes) => updatePlot(active, { stakes })}
        />
        <FormField
          accent={meta.accent}
          label="Timeframe"
          prompt="How much time before the intention can no longer be achieved. The ticking clock."
          value={thread.timeframe}
          onChange={(timeframe) => updatePlot(active, { timeframe })}
        />

        <ExampleCallout>
          <strong>Intention:</strong> Find the Well of Ascension, which holds vast enough power to turn her into a god.
          <br />
          <strong>Obstacle:</strong> The witch hunter, who is trying to kill the giggle witches, is on her trail!
          <br />
          <strong>Stakes:</strong> If they fail, they lose their magic and are killed. If they succeed, they gain the power/respect they seek.
          <br />
          <strong>Timeframe:</strong> Until the next full moon — seven days.
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
