import { PageHeader } from '../components/PageHeader';
import { FormField } from '../components/FormField';
import { ExampleCallout } from '../components/ExampleCallout';
import { StepShell } from '../components/StepShell';
import { useStory } from '../context/StoryContext';
import { stepMeta } from '../builder/steps';
import type { StepId } from '../builder/steps';
import settingIcon from '../assets/icons/setting.png';

export function SettingScreen({ onNavigate }: { onNavigate: (id: StepId) => void }) {
  const { story, updateSetting } = useStory();
  const meta = stepMeta('setting');

  return (
    <StepShell id="setting" onNavigate={onNavigate}>
      <PageHeader
        icon={settingIcon}
        eyebrow="Step 2 — From Chaos To Order"
        title="Setting"
        accent={meta.accent}
        subtitle="Setting is the background color that helps your picture stand out. It dictates culture — what people do, wear, sound like, act like — all dependent on the when and where."
      />

      <div className="space-y-7">
        <FormField
          accent={meta.accent}
          label="When?"
          prompt="The time period the story takes place in. Is there a major event underway — a war, a pandemic, a revolution?"
          placeholder="e.g. 1930s Chicago"
          value={story.setting.when}
          onChange={(when) => updateSetting({ when })}
        />

        <FormField
          accent={meta.accent}
          label="Where?"
          prompt="The main location(s) of the story. The more specific, the better — it forces you to think about the people in it."
          placeholder="e.g. The cupboard underneath the stairs at 4 Privet Drive, London"
          value={story.setting.where}
          onChange={(where) => updateSetting({ where })}
        />

        <FormField
          as="textarea"
          rows={3}
          accent={meta.accent}
          label="What makes this setting unique?"
          prompt="An interesting bit of history, an important landmark, something personal to a character."
          placeholder="e.g. This house is always creaking."
          value={story.setting.unique}
          onChange={(unique) => updateSetting({ unique })}
        />

        <FormField
          as="textarea"
          rows={3}
          accent={meta.accent}
          label="Why this place and not another?"
          prompt="Does the setting set a character up as a villain, a hero, a thief? Does it mean greater adversity, or a harder fall?"
          value={story.setting.why}
          onChange={(why) => updateSetting({ why })}
        />

        <ExampleCallout>
          <strong>When:</strong> 1930's &nbsp;<strong>Where:</strong> Chicago
          <br />
          <strong>Unique:</strong> Chicago was a growing metropolitan city famous for Italian gangsters.
          <br />
          <strong>Why:</strong> The busiest city in the midwest, close to the great lakes, mobsters
          everywhere — and it's sinking into a swamp. Useful for adventures!
        </ExampleCallout>
      </div>
    </StepShell>
  );
}
