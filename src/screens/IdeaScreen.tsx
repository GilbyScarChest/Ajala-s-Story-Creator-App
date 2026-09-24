import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import ideaIcon from '../assets/icons/idea.png';

export function IdeaScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updateIdea } = useStory();
  const meta = stepMeta('idea');

  return (
    <StepShell id="idea" onNavigate={onNavigate}>
      <PageHeader
        icon={ideaIcon}
        eyebrow="Step 1 — Let There Be Thought"
        title="Idea"
        accent={meta.accent}
        subtitle="An idea is anything. It's the spark that can become a story, and it doesn't matter what that spark is. If it ignites something within you and makes you think, it's a good idea."
      />

      <div className="space-y-7">
        <FormField
          as="textarea"
          rows={3}
          accent={meta.accent}
          label="What if…"
          prompt="Every idea begins with a what-if statement. It can be as small as a character or as big as a theme."
          placeholder="What if toys had lives of their own when we aren't watching?"
          value={story.idea.whatIf}
          onChange={(whatIf) => updateIdea({ whatIf })}
        />

        <FormField
          as="textarea"
          rows={2}
          accent={meta.accent}
          label="Theme (optional)"
          prompt="A theme is a central idea, concept, or philosophy that is explored in a story."
          placeholder="e.g. In the face of innocence, a corrupted soul can find their way back to the light."
          value={story.idea.theme}
          onChange={(theme) => updateIdea({ theme })}
        />

        <FormField
          as="textarea"
          rows={2}
          accent={meta.accent}
          label="What experience do you want your audience left with?"
          placeholder="e.g. A sense that found family matters more than blood."
          value={story.idea.audienceExperience}
          onChange={(audienceExperience) => updateIdea({ audienceExperience })}
        />

        <ExampleCallout>
          <em>Toy Story</em> — What if toys had lives of their own when we aren't watching?
          <br />
          <em>Ender's Game</em> — What if child geniuses had to save humanity from an alien invasion?
          <br />
          <em>Giggle Witch</em> (the book's running example) — What if there was a story about a giggle witch?
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
