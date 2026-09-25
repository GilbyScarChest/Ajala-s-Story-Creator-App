import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import { compileStory } from '../builder/compile';
import { ROLE_LABEL } from '../types/story';
import storyIcon from '../assets/icons/story.png';

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">{label}</div>
      <div className="text-[0.95rem] leading-relaxed text-[var(--color-ink)]">{value}</div>
    </div>
  );
}

export function StoryWriterScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story } = useStory();
  const meta = stepMeta('writer');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(compileStory(story));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const blob = new Blob([compileStory(story)], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(story.title || 'untitled-story').replace(/\s+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <StepShell id="writer" onNavigate={onNavigate}>
      <PageHeader
        icon={storyIcon}
        eyebrow="1st Draft"
        title="Story Writer"
        accent={meta.accent}
        subtitle="Everything you've built, connected into one outline. Read it through — does it inspire you? If so, you're ready to write."
      />

      <div className="mb-8 flex gap-3">
        <button
          onClick={handleCopy}
          className="rounded-full border border-[var(--color-line-strong)] px-5 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
        >
          {copied ? 'Copied!' : 'Copy outline'}
        </button>
        <button
          onClick={handleDownload}
          className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          style={{ background: 'var(--color-ink)' }}
        >
          Download .md
        </button>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-lift)]">
        <h2 className="mb-6 text-3xl">{story.title || 'Untitled Story'}</h2>

        <h3 className="text-lg text-[var(--color-idea-600)]">Idea</h3>
        <Row label="What if" value={story.idea.whatIf} />
        <Row label="Theme" value={story.idea.theme} />
        <Row label="Audience should feel" value={story.idea.audienceExperience} />

        <h3 className="mt-6 text-lg text-[var(--color-setting-600)]">Setting</h3>
        <Row label="When" value={story.setting.when} />
        <Row label="Where" value={story.setting.where} />
        <Row label="What makes it unique" value={story.setting.unique} />
        <Row label="Why this place" value={story.setting.why} />

        {story.characters.length > 0 && (
          <>
            <h3 className="mt-6 text-lg text-[var(--color-character-600)]">Characters</h3>
            {story.characters.map((c) => (
              <div key={c.id} className="mb-4 rounded-lg bg-[var(--color-paper-soft)] p-4">
                <div className="mb-1 font-serif text-base text-[var(--color-ink)]">
                  {ROLE_LABEL[c.role]}
                  {c.name ? `: ${c.name}` : ''}
                </div>
                <Row label="Goal" value={c.goal} />
                <Row label="Strength" value={c.strength} />
                <Row label="Weakness" value={c.weakness} />
                <Row label="Dynamic" value={c.dynamic} />
                <Row label="Arc" value={c.arcSummary || (c.arcType ? `${c.arcType} arc` : undefined)} />
              </div>
            ))}
          </>
        )}

        <h3 className="mt-6 text-lg text-[var(--color-plot-600)]">Plot</h3>
        <Row label="Intention (A)" value={story.plot.aPlot.intention} />
        <Row label="Obstacle (A)" value={story.plot.aPlot.obstacle} />
        <Row label="Stakes (A)" value={story.plot.aPlot.stakes} />
        <Row label="Timeframe (A)" value={story.plot.aPlot.timeframe} />
        <Row label="Intention (B)" value={story.plot.bPlot.intention} />
        <Row label="Intention (C)" value={story.plot.cPlot.intention} />

        <h3 className="mt-6 text-lg text-[var(--color-gold-700)]">Beginning</h3>
        <Row label="Established Norm" value={story.beginning.establishedNorm} />
        <Row label="Inciting Incident" value={story.beginning.incitingIncident} />

        <h3 className="mt-6 text-lg text-[var(--color-gold-700)]">Middle</h3>
        <Row label="Rising Action" value={story.middle.risingAction} />
        <Row label="Rising Reaction" value={story.middle.risingReaction} />

        <h3 className="mt-6 text-lg text-[var(--color-gold-700)]">End</h3>
        <Row label="Climax" value={story.end.climax} />
        <Row label="Falling Action" value={story.end.fallingAction} />
        <Row label="Resolution" value={story.end.resolution} />
      </div>
    </StepShell>
  );
}
