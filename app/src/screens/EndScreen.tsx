import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import theEndIcon from '../assets/icons/the-end.png';

export function EndScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updateEnd } = useStory();
  const meta = stepMeta('end');

  return (
    <StepShell id="end" onNavigate={onNavigate}>
      <PageHeader
        icon={theEndIcon}
        eyebrow="The End — Conclusion"
        title="End"
        accent={meta.accent}
        subtitle="How does it end? Start here, before you write a word of the beginning or the middle. An ending is comprised of your Climax, Falling Action, and Resolution — the big thing that happens, its fallout, and the life after."
      />

      <div className="space-y-7">
        <FormField
          as="textarea"
          rows={4}
          accent={meta.accent}
          label="Climax"
          prompt="The turning point that changes the protagonist's fate for good or bad — the final action, deploying everything they have."
          value={story.end.climax}
          onChange={(climax) => updateEnd({ climax })}
        />
        <FormField
          as="textarea"
          rows={4}
          accent={meta.accent}
          label="Falling Action"
          prompt="The conclusion of the conflict — success or failure of the intention. This answers the question posed at the beginning."
          value={story.end.fallingAction}
          onChange={(fallingAction) => updateEnd({ fallingAction })}
        />
        <FormField
          as="textarea"
          rows={4}
          accent={meta.accent}
          label="Resolution"
          prompt="The establishment of the new normal. Whether or not they achieved their intention, your characters now live with the result."
          value={story.end.resolution}
          onChange={(resolution) => updateEnd({ resolution })}
        />

        <ExampleCallout>
          The O'Hara's battle the Witch Hunters beneath Chicago. As the sisters turn on each other for the
          power, Gentleman is badly wounded — so they let go of their egos and channel the power into him
          instead. He redirects it to give the oppressed people of the midwest a taste of magic. Long Eye
          gives up his crusade, the sisters stop pretending to be white, and everyone refocuses on the
          families and communities they'd been neglecting.
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
