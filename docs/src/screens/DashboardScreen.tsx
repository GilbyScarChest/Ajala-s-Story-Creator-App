import { useState } from 'react';
import { listStories, deleteStory } from '../lib/storage';
import type { StorySummary } from '../lib/storage';
import storyCreatorLogo from '../assets/logos/story-creator-logo.png';

interface DashboardScreenProps {
  onOpen: (id: string) => void;
  onCreate: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DashboardScreen({ onOpen, onCreate }: DashboardScreenProps) {
  const [stories, setStories] = useState<StorySummary[]>(() => listStories());

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Delete this story? This cannot be undone.')) return;
    deleteStory(id);
    setStories(listStories());
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-16">
      <img src={storyCreatorLogo} alt="Story Creator" className="mb-4 h-40 w-auto object-contain" />
      <p className="mb-10 max-w-md text-center text-[var(--color-ink-soft)]">
        The macro to micro method for building better stories — from a spark of an idea to a finished
        outline.
      </p>

      <button
        onClick={onCreate}
        className="mb-14 rounded-full px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-lift)] transition hover:opacity-90"
        style={{ background: 'var(--color-gold-600)' }}
      >
        + New Story
      </button>

      {stories.length > 0 && (
        <div className="w-full">
          <h2 className="mb-4 text-xl text-[var(--color-ink)]">Your Stories</h2>
          <div className="space-y-3">
            {stories.map((s) => (
              <button
                key={s.id}
                onClick={() => onOpen(s.id)}
                className="group flex w-full items-center justify-between rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-6 py-4 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--color-gold-500)]"
              >
                <div>
                  <div className="font-serif text-lg text-[var(--color-ink)]">{s.title}</div>
                  <div className="text-xs text-[var(--color-ink-faint)]">Updated {formatDate(s.updatedAt)}</div>
                </div>
                <span
                  onClick={(e) => handleDelete(e, s.id)}
                  className="opacity-0 text-xs font-medium text-[var(--color-ink-faint)] transition group-hover:opacity-100 hover:text-[var(--color-character-500)]"
                >
                  Delete
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
