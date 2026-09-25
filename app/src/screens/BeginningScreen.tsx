import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';

export function BeginningScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updateBeginning } = useStory();
  const meta = stepMeta('beginning');

  return (
    <StepShell id="beginning" onNavigate={onNavigate}>
      <PageHeader
        eyebrow="The Beginning — Exposition"
        title="Beginning"
        accent={meta.accent}
        subtitle="Know your ending before you start the beginning. The beginning introduces the setting and characters, then sets up the plot by introducing the crisis. It should leave your audience asking a simple how."
      />

      <div className="space-y-7">
        <FormField
          as="textarea"
          rows={5}
          accent={meta.accent}
          label="Established Norm"
          prompt="The life of your characters before the Inciting Incident — who they are, where they are, what they want day to day, and why we care."
          value={story.beginning.establishedNorm}
          onChange={(establishedNorm) => updateBeginning({ establishedNorm })}
        />
        <FormField
          as="textarea"
          rows={5}
          accent={meta.accent}
          label="Inciting Incident"
          prompt="The first major plot point that breaks the protagonist away from the Established Norm and introduces the Intention, Obstacle, Stakes, and Timeframe."
          value={story.beginning.incitingIncident}
          onChange={(incitingIncident) => updateBeginning({ incitingIncident })}
        />

        <ExampleCallout>
          The O'Hara sisters have collected magic for decades, disguising themselves as white women to
          survive. They build a doula company, harvesting giggles for magic. When Gentleman discovers the
          fabled Well of Ascension on his first day in the city, the sisters realize this is their chance at
          god-like power — but the Witch Hunters know about the Well too, and Long Eye Joe is already on
          their trail.
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
