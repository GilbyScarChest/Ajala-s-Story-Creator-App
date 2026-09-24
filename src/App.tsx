import { useState } from 'react';
import { DashboardScreen } from './screens/DashboardScreen';
import { StoryWorkspace } from './workspace/StoryWorkspace';
import { emptyStory } from './types/story';
import type { Story } from './types/story';
import { loadStory, saveStory } from './lib/storage';

export default function App() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const handleCreate = () => {
    const story = emptyStory();
    saveStory(story);
    setActiveStory(story);
  };

  const handleOpen = (id: string) => {
    const story = loadStory(id);
    if (story) setActiveStory(story);
  };

  if (activeStory) {
    return <StoryWorkspace story={activeStory} onBackToDashboard={() => setActiveStory(null)} />;
  }

  return <DashboardScreen onOpen={handleOpen} onCreate={handleCreate} />;
}
