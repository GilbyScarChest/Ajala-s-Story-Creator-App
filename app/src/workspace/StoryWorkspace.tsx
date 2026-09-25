import { useState } from 'react';
import { StoryProvider } from '../context/StoryContext';
import type { Story } from '../types/story';
import type { ToolId } from './tools';
import { HubScreen } from './HubScreen';
import { BuilderApp } from '../builder/BuilderApp';
import { WorldBuilderApp } from '../tools/world/WorldBuilderApp';
import { SystemBuilderApp } from '../tools/system/SystemBuilderApp';
import { CharacterProfilerApp } from '../tools/character-profiler/CharacterProfilerApp';
import { TimelineApp } from '../tools/timeline/TimelineApp';
import { CharacterWebApp } from '../tools/character-web/CharacterWebApp';
import { GuideApp } from '../tools/guide/GuideApp';
import { QuickNoteOverlay } from '../tools/quick-notes/QuickNoteOverlay';

interface StoryWorkspaceProps {
  story: Story;
  onBackToDashboard: () => void;
}

export function StoryWorkspace({ story, onBackToDashboard }: StoryWorkspaceProps) {
  const [tool, setTool] = useState<ToolId>('hub');
  const toHub = () => setTool('hub');

  return (
    <StoryProvider story={story}>
      {tool === 'hub' && <HubScreen onOpenTool={setTool} onBackToDashboard={onBackToDashboard} />}
      {tool === 'story-builder' && <BuilderApp onExit={toHub} />}
      {tool === 'world-builder' && <WorldBuilderApp onBack={toHub} />}
      {tool === 'magic-builder' && <SystemBuilderApp systemType="magic" onBack={toHub} />}
      {tool === 'belief-builder' && <SystemBuilderApp systemType="belief" onBack={toHub} />}
      {tool === 'technology-builder' && <SystemBuilderApp systemType="technology" onBack={toHub} />}
      {tool === 'character-profiler' && <CharacterProfilerApp onBack={toHub} />}
      {tool === 'timeline' && <TimelineApp onBack={toHub} />}
      {tool === 'character-web' && <CharacterWebApp onBack={toHub} />}
      {tool === 'guide' && <GuideApp onBack={toHub} />}

      <QuickNoteOverlay />
    </StoryProvider>
  );
}
