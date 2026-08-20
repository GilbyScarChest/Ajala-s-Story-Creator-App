import { ToolShell } from '../../components/ToolShell';
import { FormField } from '../../components/FormField';
import { useStory } from '../../context/StoryContext';
import { toolMeta } from '../../workspace/tools';
import { ROLE_LABEL } from '../../types/story';

export function TimelineApp({ onBack }: { onBack: () => void }) {
  const { story, addTimelineEvent, updateTimelineEvent, removeTimelineEvent } = useStory();
  const meta = toolMeta('timeline');

  const toggleCharacter = (eventId: string, characterId: string, current: string[]) => {
    const next = current.includes(characterId)
      ? current.filter((id) => id !== characterId)
      : [...current, characterId];
    updateTimelineEvent(eventId, { characterIds: next });
  };

  return (
    <ToolShell
      title="Timeline"
      accent={meta.accent}
      subtitle="Lay your story's events out in chronological order — the history of your world, or the beats of your plot, whichever you're tracking."
      onBack={onBack}
    >
      <div className="relative space-y-6">
        {story.timeline.length === 0 && (
          <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-10 text-center text-[var(--color-ink-soft)]">
            No events yet. Add the first one below.
          </div>
        )}

        {story.timeline.map((event, i) => (
          <div key={event.id} className="relative flex gap-5">
            <div className="flex flex-col items-center pt-2">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: meta.accent }} />
              {i < story.timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-[var(--color-line-strong)]" />}
            </div>
            <div className="flex-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
              <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                <FormField accent={meta.accent} label="Title" value={event.title} onChange={(title) => updateTimelineEvent(event.id, { title })} />
                <FormField accent={meta.accent} label="When" placeholder="e.g. Day 3, or 1920s" value={event.when} onChange={(when) => updateTimelineEvent(event.id, { when })} />
              </div>
              <FormField as="textarea" rows={3} accent={meta.accent} label="What happens" value={event.description} onChange={(description) => updateTimelineEvent(event.id, { description })} />

              {story.characters.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                    Involves
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {story.characters.map((c) => {
                      const active = event.characterIds.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleCharacter(event.id, c.id, event.characterIds)}
                          className="rounded-full px-3 py-1 text-xs font-medium transition"
                          style={{
                            background: active ? meta.accent : 'transparent',
                            color: active ? '#fff' : 'var(--color-ink-soft)',
                            border: `1px solid ${active ? meta.accent : 'var(--color-line-strong)'}`,
                          }}
                        >
                          {c.name || ROLE_LABEL[c.role]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-4 text-right">
                <button
                  onClick={() => removeTimelineEvent(event.id)}
                  className="text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]"
                >
                  Remove event
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addTimelineEvent}
          className="ml-8 w-[calc(100%-2rem)] rounded-lg border border-dashed border-[var(--color-line-strong)] py-3 text-sm font-medium text-[var(--color-ink-soft)] transition hover:border-current"
          style={{ color: undefined }}
        >
          + Add event
        </button>
      </div>
    </ToolShell>
  );
}
