import { useState } from 'react';
import { BuilderSidebar } from '../components/BuilderSidebar';
import type { StepId } from './steps';
import { IdeaScreen } from '../screens/IdeaScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { CharacterScreen } from '../screens/CharacterScreen';
import { PlotScreen } from '../screens/PlotScreen';
import { BeginningScreen } from '../screens/BeginningScreen';
import { MiddleScreen } from '../screens/MiddleScreen';
import { EndScreen } from '../screens/EndScreen';
import { ReferenceScreen } from '../screens/ReferenceScreen';
import { StoryWriterScreen } from '../screens/StoryWriterScreen';

interface BuilderAppProps {
  onExit: () => void;
}

export function BuilderApp({ onExit }: BuilderAppProps) {
  const [step, setStep] = useState<StepId>('idea');

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <BuilderSidebar current={step} onNavigate={setStep} onBack={onExit} />
      <main className="flex-1 overflow-y-auto">
        {step === 'idea' && <IdeaScreen onNavigate={setStep} />}
        {step === 'setting' && <SettingScreen onNavigate={setStep} />}
        {step === 'protagonist' && <CharacterScreen role="protagonist" onNavigate={setStep} />}
        {step === 'deuteragonist' && <CharacterScreen role="deuteragonist" onNavigate={setStep} />}
        {step === 'tertiary' && <CharacterScreen role="tertiary" onNavigate={setStep} />}
        {step === 'antagonist' && <CharacterScreen role="antagonist" onNavigate={setStep} />}
        {step === 'plot' && <PlotScreen onNavigate={setStep} />}
        {step === 'beginning' && <BeginningScreen onNavigate={setStep} />}
        {step === 'middle' && <MiddleScreen onNavigate={setStep} />}
        {step === 'end' && <EndScreen onNavigate={setStep} />}
        {step === 'reference' && <ReferenceScreen onNavigate={setStep} />}
        {step === 'writer' && <StoryWriterScreen onNavigate={setStep} />}
      </main>
    </div>
  );
}
