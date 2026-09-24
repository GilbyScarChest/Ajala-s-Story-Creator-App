import { useState } from 'react';
import { useStory } from '../../context/StoryContext';
import { QUICK_NOTE_LABEL } from '../../types/story';
import type { QuickNoteCategory } from '../../types/story';

const CATEGORIES: QuickNoteCategory[] = ['people', 'places', 'events', 'misc'];

export function QuickNoteOverlay() {
  const { story, addQuickNote, updateQuickNote, removeQuickNote } = useStory();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<QuickNoteCategory>('people');

  const notesInCategory = story.quickNotes.filter((n) => n.category === category);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-[var(--shadow-lift)] transition hover:opacity-90"
        style={{ background: 'var(--color-gold-600)' }}
        aria-label="Quick notes"
      >
        {open ? '×' : '✎'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex max-h-[70vh] w-96 flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] shadow-[var(--shadow-lift)]">
          <div className="border-b border-[var(--color-line)] px-5 py-4">
            <h3 className="m-0 text-lg text-[var(--color-ink)]">Quick Notes</h3>
            <p className="m-0 mt-0.5 text-xs text-[var(--color-ink-faint)]">
              Jot something down before you lose it — file it later.
            </p>
          </div>

          <div className="flex border-b border-[var(--color-line)]">
            {CATEGORIES.map((cat) => {
              const count = story.quickNotes.filter((n) => n.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="flex-1 border-b-2 px-2 py-2.5 text-xs font-semibold transition"
                  style={{
                    borderColor: category === cat ? 'var(--color-gold-600)' : 'transparent',
                    color: category === cat ? 'var(--color-gold-700)' : 'var(--color-ink-faint)',
                  }}
                >
                  {QUICK_NOTE_LABEL[cat]}
                  {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <button
              onClick={() => addQuickNote(category)}
              className="mb-4 w-full rounded-lg border border-dashed border-[var(--color-line-strong)] py-2 text-xs font-medium text-[var(--color-ink-soft)] transition hover:border-[var(--color-gold-600)] hover:text-[var(--color-gold-700)]"
            >
              + New {QUICK_NOTE_LABEL[category].toLowerCase()} note
            </button>

            {notesInCategory.length === 0 && (
              <p className="text-center text-sm text-[var(--color-ink-faint)]">Nothing here yet.</p>
            )}

            <div className="space-y-3">
              {notesInCategory.map((note) => (
                <div key={note.id} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-3">
                  <input
                    value={note.title}
                    onChange={(e) => updateQuickNote(note.id, { title: e.target.value })}
                    placeholder="Title"
                    className="mb-1.5 w-full bg-transparent font-serif text-sm text-[var(--color-ink)] outline-none"
                  />
                  <textarea
                    value={note.body}
                    onChange={(e) => updateQuickNote(note.id, { body: e.target.value })}
                    placeholder="Details…"
                    rows={2}
                    className="w-full resize-none bg-transparent text-xs text-[var(--color-ink-soft)] outline-none"
                  />
                  <div className="mt-1 text-right">
                    <button
                      onClick={() => removeQuickNote(note.id)}
                      className="text-[0.68rem] font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-character-500)]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
