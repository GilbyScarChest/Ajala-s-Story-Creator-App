import { TOOLS } from './tools';
import type { ToolId } from './tools';
import { useStory } from '../context/StoryContext';
import storyBuilderIcon from '../assets/icons/story.png';
import worldBuilderIcon from '../assets/icons/world-builder.png';
import magicBuilderIcon from '../assets/icons/magic-builder.png';
import beliefBuilderIcon from '../assets/icons/belief-builder.png';
import technologyBuilderIcon from '../assets/icons/technology-builder.png';
import characterProfilerIcon from '../assets/icons/character-builder.png';
import storyCreatorLogo from '../assets/logos/story-creator-logo.png';

const TOOL_ICON: Partial<Record<ToolId, string>> = {
  'story-builder': storyBuilderIcon,
  'world-builder': worldBuilderIcon,
  'magic-builder': magicBuilderIcon,
  'belief-builder': beliefBuilderIcon,
  'technology-builder': technologyBuilderIcon,
  'character-profiler': characterProfilerIcon,
};

interface HubScreenProps {
  onOpenTool: (id: ToolId) => void;
  onBackToDashboard: () => void;
}

export function HubScreen({ onOpenTool, onBackToDashboard }: HubScreenProps) {
  const { story, setTitle } = useStory();

  return (
    <div className="mx-auto max-w-5xl px-10 py-12">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <button
            onClick={onBackToDashboard}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-600)]"
          >
            ← All Stories
          </button>
          <input
            value={story.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Story"
            className="block border-b border-transparent bg-transparent font-serif text-4xl text-[var(--color-ink)] outline-none transition focus:border-[var(--color-line-strong)]"
          />
        </div>
        <img src={storyCreatorLogo} alt="" className="h-20 w-auto object-contain opacity-90" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onOpenTool(tool.id)}
            className="group flex flex-col items-start rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            style={{ borderTopColor: tool.accent, borderTopWidth: 3 }}
          >
            {TOOL_ICON[tool.id] && (
              <img src={TOOL_ICON[tool.id]} alt="" className="mb-4 h-12 w-auto object-contain" />
            )}
            <h2 className="m-0 text-2xl text-[var(--color-ink)]">{tool.label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
