import type { Story, CharacterRole } from '../types/story';
import type { StepId } from './steps';

function has(value: string | undefined | null) {
  return !!value && value.trim().length > 0;
}

function characterOf(story: Story, role: CharacterRole) {
  return story.characters.find((c) => c.role === role);
}

function characterDone(story: Story, role: CharacterRole) {
  const c = characterOf(story, role);
  if (!c) return false;
  return has(c.name) && has(c.goal) && has(c.strength) && has(c.weakness);
}

export function isStepComplete(story: Story, id: StepId): boolean {
  switch (id) {
    case 'idea':
      return has(story.idea.whatIf);
    case 'setting':
      return has(story.setting.when) && has(story.setting.where);
    case 'protagonist':
      return characterDone(story, 'protagonist');
    case 'deuteragonist':
      return characterDone(story, 'deuteragonist');
    case 'tertiary':
      return characterDone(story, 'tertiary');
    case 'antagonist':
      return characterDone(story, 'antagonist');
    case 'plot':
      return has(story.plot.aPlot.intention) && has(story.plot.aPlot.obstacle);
    case 'beginning':
      return has(story.beginning.establishedNorm) && has(story.beginning.incitingIncident);
    case 'middle':
      return has(story.middle.risingAction) && has(story.middle.risingReaction);
    case 'end':
      return has(story.end.climax) && has(story.end.resolution);
    case 'reference':
      return true;
    case 'writer':
      return true;
    default:
      return false;
  }
}
