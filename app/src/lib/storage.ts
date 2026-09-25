import type { Story } from '../types/story';
import { emptyStory, emptyCharacterProfile } from '../types/story';

const INDEX_KEY = 'story-creator:index';

/** Backfills fields added in later app versions onto stories saved by earlier ones. */
function migrateStory(raw: Story): Story {
  const defaults = emptyStory();
  return {
    ...defaults,
    ...raw,
    characters: (raw.characters ?? []).map((c) => ({
      ...c,
      profile: { ...emptyCharacterProfile(), ...c.profile },
    })),
    world: {
      geography: { ...defaults.world.geography, ...raw.world?.geography },
      society: { ...defaults.world.society, ...raw.world?.society },
      culture: { ...defaults.world.culture, ...raw.world?.culture },
    },
    magicSystems: raw.magicSystems ?? [],
    technologySystems: raw.technologySystems ?? [],
    beliefSystems: raw.beliefSystems ?? [],
    timeline: raw.timeline ?? [],
    relationships: raw.relationships ?? [],
    quickNotes: raw.quickNotes ?? [],
  };
}
const storyKey = (id: string) => `story-creator:story:${id}`;

export interface StorySummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

function readIndex(): StorySummary[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as StorySummary[]) : [];
  } catch {
    return [];
  }
}

function writeIndex(index: StorySummary[]) {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}

export function listStories(): StorySummary[] {
  return readIndex().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function loadStory(id: string): Story | null {
  try {
    const raw = localStorage.getItem(storyKey(id));
    return raw ? migrateStory(JSON.parse(raw) as Story) : null;
  } catch {
    return null;
  }
}

export function saveStory(story: Story) {
  localStorage.setItem(storyKey(story.id), JSON.stringify(story));
  const index = readIndex();
  const existing = index.findIndex((s) => s.id === story.id);
  const summary: StorySummary = {
    id: story.id,
    title: story.title || 'Untitled Story',
    createdAt: story.createdAt,
    updatedAt: story.updatedAt,
  };
  if (existing >= 0) {
    index[existing] = summary;
  } else {
    index.push(summary);
  }
  writeIndex(index);
}

export function deleteStory(id: string) {
  localStorage.removeItem(storyKey(id));
  writeIndex(readIndex().filter((s) => s.id !== id));
}
