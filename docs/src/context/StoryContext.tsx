import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  BeginningSection,
  BeliefRules,
  BeliefSystem,
  Character,
  CharacterProfile,
  CharacterRole,
  EndSection,
  IdeaSection,
  MagicSystem,
  MiddleSection,
  PlotSection,
  PowerSystemRules,
  QuickNote,
  QuickNoteCategory,
  Relationship,
  SettingSection,
  Story,
  SystemHistory,
  TechnologySystem,
  TimelineEvent,
  WorldCulture,
  WorldGeography,
  WorldSociety,
} from '../types/story';
import {
  emptyBeliefSystem,
  emptyCharacter,
  emptyMagicSystem,
  emptyTechnologySystem,
} from '../types/story';
import { saveStory } from '../lib/storage';

type SystemKey = 'magicSystems' | 'technologySystems' | 'beliefSystems';
type AnySystem = MagicSystem | TechnologySystem | BeliefSystem;

interface StoryContextValue {
  story: Story;
  setTitle: (title: string) => void;
  updateIdea: (patch: Partial<IdeaSection>) => void;
  updateSetting: (patch: Partial<SettingSection>) => void;
  updatePlot: (thread: 'aPlot' | 'bPlot' | 'cPlot', patch: Partial<PlotSection['aPlot']>) => void;
  updateBeginning: (patch: Partial<BeginningSection>) => void;
  updateMiddle: (patch: Partial<MiddleSection>) => void;
  updateEnd: (patch: Partial<EndSection>) => void;
  addCharacter: (role: CharacterRole) => void;
  updateCharacter: (id: string, patch: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  updateCharacterProfile: (id: string, patch: Partial<CharacterProfile>) => void;

  updateWorldGeography: (patch: Partial<WorldGeography>) => void;
  updateWorldSociety: (patch: Partial<WorldSociety>) => void;
  updateWorldCulture: (patch: Partial<WorldCulture>) => void;

  addSystem: (key: SystemKey, name?: string) => void;
  updateSystem: (key: SystemKey, id: string, patch: Partial<AnySystem>) => void;
  updateSystemRules: (key: SystemKey, id: string, patch: Partial<PowerSystemRules & BeliefRules>) => void;
  updateSystemHistory: (key: SystemKey, id: string, patch: Partial<SystemHistory>) => void;
  removeSystem: (key: SystemKey, id: string) => void;

  addTimelineEvent: () => void;
  updateTimelineEvent: (id: string, patch: Partial<TimelineEvent>) => void;
  removeTimelineEvent: (id: string) => void;

  addRelationship: (characterAId: string, characterBId: string) => void;
  updateRelationship: (id: string, patch: Partial<Relationship>) => void;
  removeRelationship: (id: string) => void;

  addQuickNote: (category: QuickNoteCategory) => void;
  updateQuickNote: (id: string, patch: Partial<QuickNote>) => void;
  removeQuickNote: (id: string) => void;
}

const StoryContext = createContext<StoryContextValue | null>(null);

export function StoryProvider({ story: initial, children }: { story: Story; children: ReactNode }) {
  const [story, setStory] = useState<Story>(initial);
  const storyRef = useRef(story);
  storyRef.current = story;

  useEffect(() => {
    setStory(initial);
  }, [initial]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveStory({ ...storyRef.current, updatedAt: new Date().toISOString() });
    }, 300);
    return () => clearTimeout(timeout);
  }, [story]);

  const mutate = useCallback((updater: (draft: Story) => Story) => {
    setStory((prev) => updater({ ...prev, updatedAt: new Date().toISOString() }));
  }, []);

  const setTitle = useCallback(
    (title: string) => mutate((draft) => ({ ...draft, title })),
    [mutate],
  );

  const updateIdea = useCallback(
    (patch: Partial<IdeaSection>) => mutate((draft) => ({ ...draft, idea: { ...draft.idea, ...patch } })),
    [mutate],
  );

  const updateSetting = useCallback(
    (patch: Partial<SettingSection>) =>
      mutate((draft) => ({ ...draft, setting: { ...draft.setting, ...patch } })),
    [mutate],
  );

  const updatePlot = useCallback(
    (thread: 'aPlot' | 'bPlot' | 'cPlot', patch: Partial<PlotSection['aPlot']>) =>
      mutate((draft) => ({
        ...draft,
        plot: { ...draft.plot, [thread]: { ...draft.plot[thread], ...patch } },
      })),
    [mutate],
  );

  const updateBeginning = useCallback(
    (patch: Partial<BeginningSection>) =>
      mutate((draft) => ({ ...draft, beginning: { ...draft.beginning, ...patch } })),
    [mutate],
  );

  const updateMiddle = useCallback(
    (patch: Partial<MiddleSection>) =>
      mutate((draft) => ({ ...draft, middle: { ...draft.middle, ...patch } })),
    [mutate],
  );

  const updateEnd = useCallback(
    (patch: Partial<EndSection>) => mutate((draft) => ({ ...draft, end: { ...draft.end, ...patch } })),
    [mutate],
  );

  const addCharacter = useCallback(
    (role: CharacterRole) =>
      mutate((draft) => ({ ...draft, characters: [...draft.characters, emptyCharacter(role)] })),
    [mutate],
  );

  const updateCharacter = useCallback(
    (id: string, patch: Partial<Character>) =>
      mutate((draft) => ({
        ...draft,
        characters: draft.characters.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      })),
    [mutate],
  );

  const removeCharacter = useCallback(
    (id: string) =>
      mutate((draft) => ({ ...draft, characters: draft.characters.filter((c) => c.id !== id) })),
    [mutate],
  );

  const updateCharacterProfile = useCallback(
    (id: string, patch: Partial<CharacterProfile>) =>
      mutate((draft) => ({
        ...draft,
        characters: draft.characters.map((c) =>
          c.id === id ? { ...c, profile: { ...c.profile, ...patch } } : c,
        ),
      })),
    [mutate],
  );

  const updateWorldGeography = useCallback(
    (patch: Partial<WorldGeography>) =>
      mutate((draft) => ({
        ...draft,
        world: { ...draft.world, geography: { ...draft.world.geography, ...patch } },
      })),
    [mutate],
  );

  const updateWorldSociety = useCallback(
    (patch: Partial<WorldSociety>) =>
      mutate((draft) => ({
        ...draft,
        world: { ...draft.world, society: { ...draft.world.society, ...patch } },
      })),
    [mutate],
  );

  const updateWorldCulture = useCallback(
    (patch: Partial<WorldCulture>) =>
      mutate((draft) => ({
        ...draft,
        world: { ...draft.world, culture: { ...draft.world.culture, ...patch } },
      })),
    [mutate],
  );

  const makeEmptySystem = (key: SystemKey, name?: string): AnySystem => {
    if (key === 'magicSystems') return emptyMagicSystem(name);
    if (key === 'technologySystems') return emptyTechnologySystem(name);
    return emptyBeliefSystem(name);
  };

  const addSystem = useCallback(
    (key: SystemKey, name?: string) =>
      mutate((draft) => ({
        ...draft,
        [key]: [...draft[key], makeEmptySystem(key, name)],
      })),
    [mutate],
  );

  const updateSystem = useCallback(
    (key: SystemKey, id: string, patch: Partial<AnySystem>) =>
      mutate((draft) => ({
        ...draft,
        [key]: (draft[key] as AnySystem[]).map((s) => (s.id === id ? { ...s, ...patch } : s)),
      })),
    [mutate],
  );

  const updateSystemRules = useCallback(
    (key: SystemKey, id: string, patch: Partial<PowerSystemRules & BeliefRules>) =>
      mutate((draft) => ({
        ...draft,
        [key]: (draft[key] as AnySystem[]).map((s) =>
          s.id === id ? { ...s, rules: { ...s.rules, ...patch } } : s,
        ),
      })),
    [mutate],
  );

  const updateSystemHistory = useCallback(
    (key: SystemKey, id: string, patch: Partial<SystemHistory>) =>
      mutate((draft) => ({
        ...draft,
        [key]: (draft[key] as AnySystem[]).map((s) =>
          s.id === id ? { ...s, history: { ...s.history, ...patch } } : s,
        ),
      })),
    [mutate],
  );

  const removeSystem = useCallback(
    (key: SystemKey, id: string) =>
      mutate((draft) => ({
        ...draft,
        [key]: (draft[key] as AnySystem[]).filter((s) => s.id !== id),
      })),
    [mutate],
  );

  const addTimelineEvent = useCallback(
    () =>
      mutate((draft) => ({
        ...draft,
        timeline: [
          ...draft.timeline,
          { id: crypto.randomUUID(), title: '', when: '', description: '', characterIds: [] },
        ],
      })),
    [mutate],
  );

  const updateTimelineEvent = useCallback(
    (id: string, patch: Partial<TimelineEvent>) =>
      mutate((draft) => ({
        ...draft,
        timeline: draft.timeline.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      })),
    [mutate],
  );

  const removeTimelineEvent = useCallback(
    (id: string) =>
      mutate((draft) => ({ ...draft, timeline: draft.timeline.filter((e) => e.id !== id) })),
    [mutate],
  );

  const addRelationship = useCallback(
    (characterAId: string, characterBId: string) =>
      mutate((draft) => ({
        ...draft,
        relationships: [
          ...draft.relationships,
          { id: crypto.randomUUID(), characterAId, characterBId, label: '', description: '' },
        ],
      })),
    [mutate],
  );

  const updateRelationship = useCallback(
    (id: string, patch: Partial<Relationship>) =>
      mutate((draft) => ({
        ...draft,
        relationships: draft.relationships.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      })),
    [mutate],
  );

  const removeRelationship = useCallback(
    (id: string) =>
      mutate((draft) => ({ ...draft, relationships: draft.relationships.filter((r) => r.id !== id) })),
    [mutate],
  );

  const addQuickNote = useCallback(
    (category: QuickNoteCategory) =>
      mutate((draft) => ({
        ...draft,
        quickNotes: [
          ...draft.quickNotes,
          { id: crypto.randomUUID(), category, title: '', body: '', createdAt: new Date().toISOString() },
        ],
      })),
    [mutate],
  );

  const updateQuickNote = useCallback(
    (id: string, patch: Partial<QuickNote>) =>
      mutate((draft) => ({
        ...draft,
        quickNotes: draft.quickNotes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
      })),
    [mutate],
  );

  const removeQuickNote = useCallback(
    (id: string) =>
      mutate((draft) => ({ ...draft, quickNotes: draft.quickNotes.filter((n) => n.id !== id) })),
    [mutate],
  );

  const value: StoryContextValue = {
    story,
    setTitle,
    updateIdea,
    updateSetting,
    updatePlot,
    updateBeginning,
    updateMiddle,
    updateEnd,
    addCharacter,
    updateCharacter,
    removeCharacter,
    updateCharacterProfile,
    updateWorldGeography,
    updateWorldSociety,
    updateWorldCulture,
    addSystem,
    updateSystem,
    updateSystemRules,
    updateSystemHistory,
    removeSystem,
    addTimelineEvent,
    updateTimelineEvent,
    removeTimelineEvent,
    addRelationship,
    updateRelationship,
    removeRelationship,
    addQuickNote,
    updateQuickNote,
    removeQuickNote,
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error('useStory must be used within a StoryProvider');
  return ctx;
}
