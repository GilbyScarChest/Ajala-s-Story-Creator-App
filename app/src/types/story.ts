// Data model for the Story Creator method, transcribed directly from the book
// ("Story Building", "7-Essential Story Elements", "World Building",
// "Magic/Beliefs/Technology", "Character Building" chapters) and cross-checked
// against the field labels in the original Adobe XD design file.

export type CharacterRole = 'protagonist' | 'deuteragonist' | 'tertiary' | 'antagonist';

export type CharacterArcType = 'growth' | 'change' | 'fall' | 'flat' | '';

export type MoralAlignment = 'lawful' | 'neutral' | 'chaotic' | '';
export type EthicalAlignment = 'good' | 'neutral' | 'evil' | '';

/** The deep-dive Character Profiler fields — extends the quick Story Builder character sheet. */
export interface CharacterProfile {
  // Background
  height: string;
  bodyType: string;
  nationality: string;
  birthPlace: string;
  raised: string;
  languages: string;
  family: string;
  socioeconomicChild: string;
  educationLevel: string;
  // Current Living Status
  currentResidence: string;
  currentProfession: string;
  currentSocioeconomic: string;
  // Relationship Status
  romanticBeliefs: string;
  sexualOrientation: string;
  attraction: string;
  significantOther: string;
  // Unique Traits
  talentsSkills: string;
  hobbies: string;
  lifeGoal: string;
  // Personality Traits
  personalityType: string;
  intelligence: string;
  spirituality: string;
  emotionality: string;
  coreValues: string;
  socialValues: string;
  perceivedStrength: string;
  actualStrength: string;
  perceivedWeakness: string;
  actualWeakness: string;
  moralAlignment: MoralAlignment;
  ethicalAlignment: EthicalAlignment;
  // Backstory & Notes
  backstory: string;
  notes: string;
}

export interface Character {
  id: string;
  role: CharacterRole;
  /** "Who": name, sex, age, race, profession — the birth-certificate basics. */
  name: string;
  sex: string;
  age: string;
  race: string;
  profession: string;
  strength: string;
  strengthReason: string;
  weakness: string;
  weaknessReason: string;
  innerConflict: string;
  innerConflictReason: string;
  establishedNorm: string;
  goal: string;
  goalReason: string;
  dynamic: string;
  /** Non-protagonist only: what makes this character important to the protagonist. */
  significance: string;
  /** Non-protagonist only: what this character has in common with the protagonist. */
  similarity: string;
  arcType: CharacterArcType;
  arcSummary: string;
  profile: CharacterProfile;
}

export const ROLE_LABEL: Record<CharacterRole, string> = {
  protagonist: 'Protagonist',
  deuteragonist: 'Deuteragonist',
  tertiary: 'Tertiary',
  antagonist: 'Antagonist',
};

export interface IdeaSection {
  whatIf: string;
  theme: string;
  audienceExperience: string;
}

export interface SettingSection {
  when: string;
  where: string;
  unique: string;
  why: string;
}

export interface PlotThread {
  intention: string;
  obstacle: string;
  stakes: string;
  timeframe: string;
}

export interface PlotSection {
  aPlot: PlotThread;
  bPlot: PlotThread;
  cPlot: PlotThread;
}

export interface BeginningSection {
  establishedNorm: string;
  incitingIncident: string;
}

export interface MiddleSection {
  risingAction: string;
  risingReaction: string;
}

export interface EndSection {
  climax: string;
  fallingAction: string;
  resolution: string;
}

// ---- World Builder ----------------------------------------------------

export interface WorldGeography {
  name: string;
  country: string;
  stateProvince: string;
  capital: string;
  resources: string;
  majorLocations: string;
  majorLocationResources: string;
  climate: string;
  terrain: string;
  wildlife: string;
  flora: string;
  magic: string;
  technology: string;
}

export interface WorldSociety {
  government: string;
  socialSystem: string;
  socialClass: string;
  beliefs: string;
  military: string;
  races: string;
  languages: string;
  foodSupply: string;
}

export interface WorldCulture {
  art: string;
  architecture: string;
  culturalBeliefs: string;
  education: string;
  leisure: string;
  clothing: string;
  history: string;
}

export interface World {
  geography: WorldGeography;
  society: WorldSociety;
  culture: WorldCulture;
}

// ---- Magic / Technology / Belief Systems -------------------------------

/** Shared "Rules" shape for the two power-based systems (Magic, Technology). */
export interface PowerSystemRules {
  name: string;
  base: string;
  description: string;
  energy: string;
  channel: string;
  trigger: string;
  result: string;
  limits: string;
  consequences: string;
  variations: string;
}

export interface BeliefRules {
  name: string;
  ideology: string;
  rituals: string;
  commandments: string;
  consequences: string;
  sects: string;
}

/** Shared "History" shape across all three systems. */
export interface SystemHistory {
  origin: string;
  timeline: string;
  whoUses: string;
  qualifications: string;
  awareness: string;
  awarenessReason: string;
  culture: string;
  rulingBody: string;
}

export interface MagicSystem {
  id: string;
  name: string;
  rules: PowerSystemRules;
  history: SystemHistory;
}

export interface TechnologySystem {
  id: string;
  name: string;
  rules: PowerSystemRules;
  history: SystemHistory;
}

export interface BeliefSystem {
  id: string;
  name: string;
  rules: BeliefRules;
  history: SystemHistory;
}

// ---- Timeline & Character Web -------------------------------------------

export interface TimelineEvent {
  id: string;
  title: string;
  when: string;
  description: string;
  characterIds: string[];
}

export interface Relationship {
  id: string;
  characterAId: string;
  characterBId: string;
  label: string;
  description: string;
}

// ---- Quick Notes ----------------------------------------------------------

export type QuickNoteCategory = 'people' | 'places' | 'events' | 'misc';

export const QUICK_NOTE_LABEL: Record<QuickNoteCategory, string> = {
  people: 'People',
  places: 'Places',
  events: 'Events',
  misc: 'Misc',
};

export interface QuickNote {
  id: string;
  category: QuickNoteCategory;
  title: string;
  body: string;
  createdAt: string;
}

// ---- Story ------------------------------------------------------------

export interface Story {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  idea: IdeaSection;
  setting: SettingSection;
  characters: Character[];
  plot: PlotSection;
  beginning: BeginningSection;
  middle: MiddleSection;
  end: EndSection;
  world: World;
  magicSystems: MagicSystem[];
  technologySystems: TechnologySystem[];
  beliefSystems: BeliefSystem[];
  timeline: TimelineEvent[];
  relationships: Relationship[];
  quickNotes: QuickNote[];
}

export function emptyPlotThread(): PlotThread {
  return { intention: '', obstacle: '', stakes: '', timeframe: '' };
}

export function emptyCharacterProfile(): CharacterProfile {
  return {
    height: '',
    bodyType: '',
    nationality: '',
    birthPlace: '',
    raised: '',
    languages: '',
    family: '',
    socioeconomicChild: '',
    educationLevel: '',
    currentResidence: '',
    currentProfession: '',
    currentSocioeconomic: '',
    romanticBeliefs: '',
    sexualOrientation: '',
    attraction: '',
    significantOther: '',
    talentsSkills: '',
    hobbies: '',
    lifeGoal: '',
    personalityType: '',
    intelligence: '',
    spirituality: '',
    emotionality: '',
    coreValues: '',
    socialValues: '',
    perceivedStrength: '',
    actualStrength: '',
    perceivedWeakness: '',
    actualWeakness: '',
    moralAlignment: '',
    ethicalAlignment: '',
    backstory: '',
    notes: '',
  };
}

export function emptyCharacter(role: CharacterRole): Character {
  return {
    id: crypto.randomUUID(),
    role,
    name: '',
    sex: '',
    age: '',
    race: '',
    profession: '',
    strength: '',
    strengthReason: '',
    weakness: '',
    weaknessReason: '',
    innerConflict: '',
    innerConflictReason: '',
    establishedNorm: '',
    goal: '',
    goalReason: '',
    dynamic: '',
    significance: '',
    similarity: '',
    arcType: '',
    arcSummary: '',
    profile: emptyCharacterProfile(),
  };
}

export function emptyWorld(): World {
  return {
    geography: {
      name: '',
      country: '',
      stateProvince: '',
      capital: '',
      resources: '',
      majorLocations: '',
      majorLocationResources: '',
      climate: '',
      terrain: '',
      wildlife: '',
      flora: '',
      magic: '',
      technology: '',
    },
    society: {
      government: '',
      socialSystem: '',
      socialClass: '',
      beliefs: '',
      military: '',
      races: '',
      languages: '',
      foodSupply: '',
    },
    culture: {
      art: '',
      architecture: '',
      culturalBeliefs: '',
      education: '',
      leisure: '',
      clothing: '',
      history: '',
    },
  };
}

export function emptySystemHistory(): SystemHistory {
  return {
    origin: '',
    timeline: '',
    whoUses: '',
    qualifications: '',
    awareness: '',
    awarenessReason: '',
    culture: '',
    rulingBody: '',
  };
}

export function emptyPowerSystemRules(): PowerSystemRules {
  return {
    name: '',
    base: '',
    description: '',
    energy: '',
    channel: '',
    trigger: '',
    result: '',
    limits: '',
    consequences: '',
    variations: '',
  };
}

export function emptyBeliefRules(): BeliefRules {
  return { name: '', ideology: '', rituals: '', commandments: '', consequences: '', sects: '' };
}

export function emptyMagicSystem(name = 'New Magic System'): MagicSystem {
  return { id: crypto.randomUUID(), name, rules: emptyPowerSystemRules(), history: emptySystemHistory() };
}

export function emptyTechnologySystem(name = 'New Technology'): TechnologySystem {
  return { id: crypto.randomUUID(), name, rules: emptyPowerSystemRules(), history: emptySystemHistory() };
}

export function emptyBeliefSystem(name = 'New Belief System'): BeliefSystem {
  return { id: crypto.randomUUID(), name, rules: emptyBeliefRules(), history: emptySystemHistory() };
}

export function emptyStory(title = 'Untitled Story'): Story {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    createdAt: now,
    updatedAt: now,
    idea: { whatIf: '', theme: '', audienceExperience: '' },
    setting: { when: '', where: '', unique: '', why: '' },
    characters: [emptyCharacter('protagonist')],
    plot: { aPlot: emptyPlotThread(), bPlot: emptyPlotThread(), cPlot: emptyPlotThread() },
    beginning: { establishedNorm: '', incitingIncident: '' },
    middle: { risingAction: '', risingReaction: '' },
    end: { climax: '', fallingAction: '', resolution: '' },
    world: emptyWorld(),
    magicSystems: [],
    technologySystems: [],
    beliefSystems: [],
    timeline: [],
    relationships: [],
    quickNotes: [],
  };
}
