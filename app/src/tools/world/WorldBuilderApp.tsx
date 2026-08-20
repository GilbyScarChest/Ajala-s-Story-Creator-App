import { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { FormField } from '../../components/FormField';
import { ExampleCallout } from '../../components/ExampleCallout';
import { useStory } from '../../context/StoryContext';
import { toolMeta } from '../../workspace/tools';
import worldBuilderIcon from '../../assets/icons/world-builder.png';

type Section = 'geography' | 'society' | 'culture';

export function WorldBuilderApp({ onBack }: { onBack: () => void }) {
  const { story, updateWorldGeography, updateWorldSociety, updateWorldCulture } = useStory();
  const [section, setSection] = useState<Section>('geography');
  const meta = toolMeta('world-builder');
  const { geography, society, culture } = story.world;

  return (
    <ToolShell
      title="World Builder"
      icon={worldBuilderIcon}
      accent={meta.accent}
      subtitle="There are three main elements to a world: geography, society, and culture. Geography affects society and culture more than the other way around, so build macro to micro."
      onBack={onBack}
      tabs={[
        { id: 'geography', label: 'Geography' },
        { id: 'society', label: 'Society' },
        { id: 'culture', label: 'Culture' },
      ]}
      activeTab={section}
      onTabChange={setSection}
    >
      {section === 'geography' && (
        <div className="space-y-7">
          <ExampleCallout label="Warning">
            You don't have to go into every single detail. This isn't an almanac, just a reference tool.
            Choose things and follow the logic train.
          </ExampleCallout>
          <FormField accent={meta.accent} label="Name" prompt="The name of the entire world or universe." value={geography.name} onChange={(name) => updateWorldGeography({ name })} />
          <FormField accent={meta.accent} label="Country" prompt="The country or land where the majority of major events occur." value={geography.country} onChange={(country) => updateWorldGeography({ country })} />
          <FormField accent={meta.accent} label="State / Province" value={geography.stateProvince} onChange={(stateProvince) => updateWorldGeography({ stateProvince })} />
          <FormField accent={meta.accent} label="Capital / Major City" value={geography.capital} onChange={(capital) => updateWorldGeography({ capital })} />
          <FormField as="textarea" accent={meta.accent} label="Resources" prompt="What the location has to offer or is known for. This will draw societies together, or cause disputes." value={geography.resources} onChange={(resources) => updateWorldGeography({ resources })} />
          <FormField as="textarea" accent={meta.accent} label="Major Locations" prompt="Other important locations, especially when characters travel or come from different places." value={geography.majorLocations} onChange={(majorLocations) => updateWorldGeography({ majorLocations })} />
          <FormField as="textarea" accent={meta.accent} label="Major Location Resources" value={geography.majorLocationResources} onChange={(majorLocationResources) => updateWorldGeography({ majorLocationResources })} />
          <FormField as="textarea" accent={meta.accent} label="Climate" prompt="Tropical, Arid, Mediterranean, Temperate, Continental, Polar, Artificial, Nuclear Winter, or Uninhabitable." value={geography.climate} onChange={(climate) => updateWorldGeography({ climate })} />
          <FormField as="textarea" accent={meta.accent} label="Terrain" prompt="Plateau, Mountain, Plain, Valley, Tundra, Oasis, Grassland, Desert, Swamp, Forest, Hilly, or Artificial." value={geography.terrain} onChange={(terrain) => updateWorldGeography({ terrain })} />
          <FormField as="textarea" accent={meta.accent} label="Wildlife" prompt="Pets, predators, livestock, and general fauna of the world." value={geography.wildlife} onChange={(wildlife) => updateWorldGeography({ wildlife })} />
          <FormField as="textarea" accent={meta.accent} label="Flora" prompt="The major plant life present in the world." value={geography.flora} onChange={(flora) => updateWorldGeography({ flora })} />
          <FormField as="textarea" accent={meta.accent} label="Magic" prompt="Rare, Common, or non-existent in your world — and how it works, in brief." value={geography.magic} onChange={(magic) => updateWorldGeography({ magic })} />
          <FormField as="textarea" accent={meta.accent} label="Technology" prompt="Hyper Advanced, Advanced, Modern, Era Specific, Industrial, Medieval, Ancient, Primitive, Various, or None." value={geography.technology} onChange={(technology) => updateWorldGeography({ technology })} />
        </div>
      )}

      {section === 'society' && (
        <div className="space-y-7">
          <FormField as="textarea" accent={meta.accent} label="Government" prompt="Unitary State, Federation, Confederation, Anarchy, Democracy, Oligarchy, Autocracy, Empire, Theocracy, or Chiefdom. These can be combined." value={society.government} onChange={(government) => updateWorldSociety({ government })} />
          <FormField as="textarea" accent={meta.accent} label="Social System" prompt="Monarchy, Republic, Tribalism, Feudalism, Colonialism, Capitalism, Socialism, Communism, or Totalitarianism." value={society.socialSystem} onChange={(socialSystem) => updateWorldSociety({ socialSystem })} />
          <FormField as="textarea" accent={meta.accent} label="Social Class" prompt="The social hierarchy — how power or authority is recognized. Patriarchy, Matriarchy, Geriarchy, etc." value={society.socialClass} onChange={(socialClass) => updateWorldSociety({ socialClass })} />
          <FormField as="textarea" accent={meta.accent} label="Religion / Beliefs" prompt="The primary religious, faith-based, or spiritual systems the population believes in." value={society.beliefs} onChange={(beliefs) => updateWorldSociety({ beliefs })} />
          <FormField as="textarea" accent={meta.accent} label="Military" value={society.military} onChange={(military) => updateWorldSociety({ military })} />
          <FormField as="textarea" accent={meta.accent} label="Races" prompt="The demographics of racial nationalities present." value={society.races} onChange={(races) => updateWorldSociety({ races })} />
          <FormField as="textarea" accent={meta.accent} label="Languages" value={society.languages} onChange={(languages) => updateWorldSociety({ languages })} />
          <FormField as="textarea" accent={meta.accent} label="Food Supply" prompt="How a nation feeds itself is telling of its wealth and trade dependence." value={society.foodSupply} onChange={(foodSupply) => updateWorldSociety({ foodSupply })} />
        </div>
      )}

      {section === 'culture' && (
        <div className="space-y-7">
          <FormField as="textarea" accent={meta.accent} label="Art" prompt="What artistic expression has this society created? Art speaks to what a society holds important." value={culture.art} onChange={(art) => updateWorldCulture({ art })} />
          <FormField as="textarea" accent={meta.accent} label="Architecture" value={culture.architecture} onChange={(architecture) => updateWorldCulture({ architecture })} />
          <FormField as="textarea" accent={meta.accent} label="Cultural Beliefs" prompt="Collective ideologies about how life functions and should function — the type of belief a culture is 'known for.'" value={culture.culturalBeliefs} onChange={(culturalBeliefs) => updateWorldCulture({ culturalBeliefs })} />
          <FormField as="textarea" accent={meta.accent} label="Education" value={culture.education} onChange={(education) => updateWorldCulture({ education })} />
          <FormField as="textarea" accent={meta.accent} label="Leisure" prompt="What does this culture do to unwind?" value={culture.leisure} onChange={(leisure) => updateWorldCulture({ leisure })} />
          <FormField as="textarea" accent={meta.accent} label="Clothing" value={culture.clothing} onChange={(clothing) => updateWorldCulture({ clothing })} />
          <FormField as="textarea" accent={meta.accent} label="History" prompt="The basic timeline of important events, from the first to the most current." value={culture.history} onChange={(history) => updateWorldCulture({ history })} />
        </div>
      )}
    </ToolShell>
  );
}
