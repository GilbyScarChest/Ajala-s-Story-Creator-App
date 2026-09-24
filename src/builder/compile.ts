import { ROLE_LABEL } from '../types/story';
import type { Story, Character, PlotThread } from '../types/story';

function section(title: string, lines: (string | null | undefined)[]): string {
  const body = lines.filter(Boolean).join('\n');
  if (!body.trim()) return '';
  return `## ${title}\n\n${body}\n`;
}

function characterBlock(c: Character): string {
  const who = [c.name, c.sex, c.age, c.race, c.profession].filter(Boolean).join(', ');
  const lines = [
    who && `**Who:** ${who}`,
    c.strength && `**Strength:** ${c.strength}${c.strengthReason ? ` — ${c.strengthReason}` : ''}`,
    c.weakness && `**Weakness:** ${c.weakness}${c.weaknessReason ? ` — ${c.weaknessReason}` : ''}`,
    c.innerConflict && `**Inner Conflict:** ${c.innerConflict}${c.innerConflictReason ? ` — ${c.innerConflictReason}` : ''}`,
    c.establishedNorm && `**Established Norm:** ${c.establishedNorm}`,
    c.goal && `**Goal:** ${c.goal}${c.goalReason ? ` — ${c.goalReason}` : ''}`,
    c.dynamic && `**Dynamic:** ${c.dynamic}`,
    c.significance && `**Significance to protagonist:** ${c.significance}`,
    c.similarity && `**Similarity to protagonist:** ${c.similarity}`,
    c.arcType && `**Character Arc:** ${c.arcType.charAt(0).toUpperCase()}${c.arcType.slice(1)} Arc${c.arcSummary ? ` — ${c.arcSummary}` : ''}`,
  ].filter(Boolean);
  return `### ${ROLE_LABEL[c.role]}${c.name ? `: ${c.name}` : ''}\n\n${lines.join('\n\n')}\n`;
}

function plotBlock(label: string, p: PlotThread): string {
  const lines = [
    p.intention && `**Intention:** ${p.intention}`,
    p.obstacle && `**Obstacle:** ${p.obstacle}`,
    p.stakes && `**Stakes:** ${p.stakes}`,
    p.timeframe && `**Timeframe:** ${p.timeframe}`,
  ].filter(Boolean);
  if (!lines.length) return '';
  return `### ${label}\n\n${lines.join('\n\n')}\n`;
}

export function compileStory(story: Story): string {
  const parts: string[] = [`# ${story.title || 'Untitled Story'}\n`];

  parts.push(
    section('Idea', [
      story.idea.whatIf && `**What if:** ${story.idea.whatIf}`,
      story.idea.theme && `**Theme:** ${story.idea.theme}`,
      story.idea.audienceExperience && `**Audience should feel:** ${story.idea.audienceExperience}`,
    ]),
  );

  parts.push(
    section('Setting', [
      story.setting.when && `**When:** ${story.setting.when}`,
      story.setting.where && `**Where:** ${story.setting.where}`,
      story.setting.unique && `**What makes it unique:** ${story.setting.unique}`,
      story.setting.why && `**Why this place:** ${story.setting.why}`,
    ]),
  );

  const characterBlocks = story.characters.map(characterBlock).filter((b) => b.trim().length > 0);
  if (characterBlocks.length) {
    parts.push(`## Characters\n\n${characterBlocks.join('\n')}`);
  }

  const plotBlocks = [
    plotBlock('A Plot', story.plot.aPlot),
    plotBlock('B Plot', story.plot.bPlot),
    plotBlock('C Plot', story.plot.cPlot),
  ].filter((b) => b.trim().length > 0);
  if (plotBlocks.length) {
    parts.push(`## Plot\n\n${plotBlocks.join('\n')}`);
  }

  parts.push(
    section('Beginning — Exposition', [
      story.beginning.establishedNorm && `**Established Norm:** ${story.beginning.establishedNorm}`,
      story.beginning.incitingIncident && `**Inciting Incident:** ${story.beginning.incitingIncident}`,
    ]),
  );

  parts.push(
    section('Middle — Conflict', [
      story.middle.risingAction && `**Rising Action:** ${story.middle.risingAction}`,
      story.middle.risingReaction && `**Rising Reaction:** ${story.middle.risingReaction}`,
    ]),
  );

  parts.push(
    section('End — Conclusion', [
      story.end.climax && `**Climax:** ${story.end.climax}`,
      story.end.fallingAction && `**Falling Action:** ${story.end.fallingAction}`,
      story.end.resolution && `**Resolution:** ${story.end.resolution}`,
    ]),
  );

  return parts.filter((p) => p.trim().length > 0).join('\n');
}
