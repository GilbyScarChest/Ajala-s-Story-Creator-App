import { useState } from 'react';
import { BuilderSidebar } from '../components/BuilderSidebar';
import type { StepId } from './steps';
import type { Character, CharacterRole } from '../types/story';
import { IdeaScreen } from '../screens/IdeaScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { CharacterScreen } from '../screens/CharacterScreen';
import type { CharacterFocus } from '../screens/CharacterScreen';
import { PlotScreen } from '../screens/PlotScreen';
import { BeginningScreen } from '../screens/BeginningScreen';
import { MiddleScreen } from '../screens/MiddleScreen';
import { EndScreen } from '../screens/EndScreen';
import { ReferenceScreen } from '../screens/ReferenceScreen';
import { StoryWriterScreen } from '../screens/StoryWriterScreen';

const CHARACTER_STEPS: CharacterRole[] = ['protagonist', 'deuteragonist', 'tertiary', 'antagonist'];

interface BuilderAppProps {
  onExit: () => void;
}

export function BuilderApp({ onExit }: BuilderAppProps) {
  const [step, setStep] = useState<StepId>('idea');
  const [focus, setFocus] = useState<CharacterFocus | null>(null);

  const navigate = (id: StepId) => {
    setFocus(null);
    setStep(id);
  };

  const selectCharacter = (character: Character) => {
    setStep(character.role);
    setFocus({ id: character.id, nonce: Date.now() });
  };

  const characterRole = CHARACTER_STEPS.find((r) => r === step);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <BuilderSidebar current={step} onNavigate={navigate} onBack={onExit} />
      <main className="flex-1 overflow-y-auto">
        {step === 'idea' && <IdeaScreen onNavigate={navigate} />}
        {step === 'setting' && <SettingScreen onNavigate={navigate} />}
        {characterRole && (
          <CharacterScreen
            key={characterRole}
            role={characterRole}
            focus={focus}
            onNavigate={navigate}
            onSelectCharacter={selectCharacter}
          />
        )}
        {step === 'plot' && <PlotScreen onNavigate={navigate} />}
        {step === 'beginning' && <BeginningScreen onNavigate={navigate} />}
        {step === 'middle' && <MiddleScreen onNavigate={navigate} />}
        {step === 'end' && <EndScreen onNavigate={navigate} />}
        {step === 'reference' && <ReferenceScreen onNavigate={navigate} />}
        {step === 'writer' && <StoryWriterScreen onNavigate={navigate} />}
      </main>
    </div>
  );
}
