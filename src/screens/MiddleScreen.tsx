import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';

export function MiddleScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updateMiddle } = useStory();
  const meta = stepMeta('middle');

  return (
    <StepShell id="middle" onNavigate={onNavigate}>
      <PageHeader
        eyebrow="The Middle — Conflict"
        title="Middle"
        accent={meta.accent}
        subtitle="The bulk of the story, where conflict rises both internally and externally. Show what steps the characters take to achieve their goals, and the consequences of those actions."
      />

      <div className="space-y-7">
        <FormField
          as="textarea"
          rows={5}
          accent={meta.accent}
          label="Rising Action"
          prompt="The series of events after the Inciting Incident that directly affect the characters and advance the plot — the first steps toward the intention."
          value={story.middle.risingAction}
          onChange={(risingAction) => updateMiddle({ risingAction })}
        />
        <FormField
          as="textarea"
          rows={5}
          accent={meta.accent}
          label="Rising Reaction"
          prompt="The consequences following the Rising Action. Characters adapt to new or intensified issues — inner conflict reaches its peak."
          value={story.middle.risingReaction}
          onChange={(risingReaction) => updateMiddle({ risingReaction })}
        />

        <ExampleCallout>
          The Giggle Witches send Gentleman to find clues to the Well's location while they distract the
          witch hunters. Gentleman must navigate Chicago's criminal underworld and then the wilds of the
          midwest, pursued by Long Eye. Yemina leaves her sanctuary to save her son while the other two
          witches gather enough babies for a spell to channel the Well's power.
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
