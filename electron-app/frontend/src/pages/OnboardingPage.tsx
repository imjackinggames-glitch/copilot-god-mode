
import React, { useState, useCallback } from 'react';
import { Stepper, type Step } from '../components/onboarding/Stepper';
import { WelcomeStep } from '../components/onboarding/WelcomeStep';
import { MeetTeamStep } from '../components/onboarding/MeetTeamStep';
import { DockerCheckStep } from '../components/onboarding/DockerCheckStep';
import { CopilotCheckStep } from '../components/onboarding/CopilotCheckStep';
import { CompletionStep } from '../components/onboarding/CompletionStep';
import { AnimatePresence } from 'framer-motion';

const steps: Step[] = [
  {
    id: 'welcome',
    label: 'Welcome',
  },
  {
    id: 'meet-team',
    label: 'Meet the Team',
  },
  {
    id: 'docker-check',
    label: 'Docker Check',
  },
  {
    id: 'copilot-check',
    label: 'Copilot Check',
  },
  {
    id: 'complete',
    label: 'Complete',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Optionally allow stepper click to revisit previous steps
  const handleStepClick = (stepIdx: number) => {
    if (stepIdx <= currentStep) {
      setCurrentStep(stepIdx);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
        <Stepper 
          steps={steps} 
          currentStep={currentStep} 
          maxStep={currentStep}
          onStep={handleStepClick}
        >
          <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 0 && (
            <WelcomeStep key="welcome" onNext={goNext} />
          )}
          {currentStep === 1 && (
            <MeetTeamStep key="meet-team" onNext={goNext} onBack={goBack} />
          )}
          {currentStep === 2 && (
            <DockerCheckStep key="docker-check" onNext={goNext} onBack={goBack} />
          )}
          {currentStep === 3 && (
            <CopilotCheckStep key="copilot-check" onNext={goNext} onBack={goBack} />
          )}
          {currentStep === 4 && (
            <CompletionStep key="complete" onBack={goBack} />
          )}
        </AnimatePresence>
      </div>
        </Stepper>
    </div>
  );
}
