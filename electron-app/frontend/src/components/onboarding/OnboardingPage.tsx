import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stepper } from "./Stepper";
import { WelcomeStep } from "./WelcomeStep";
import { MeetTeamStep } from "./MeetTeamStep";
import { DockerCheckStep } from "./DockerCheckStep";
import { CopilotCheckStep } from "./CopilotCheckStep";
import { CompletionStep } from "./CompletionStep";

// Define the step order and metadata
const steps = [
  {
    id: "welcome",
    label: "Bem-vindo",
    description: "Introdução e visão geral",
  },
  {
    id: "team",
    label: "Conheça o Time",
    description: "Apresentação dos agentes",
  },
  {
    id: "docker",
    label: "Verificação Docker",
    description: "Checagem do ambiente Docker",
  },
  {
    id: "copilot",
    label: "Verificação Copilot",
    description: "Checagem do Copilot e permissões",
  },
  {
    id: "complete",
    label: "Pronto!",
    description: "Onboarding finalizado",
  },
];

export default function OnboardingPage() {
  // Navigation state
  const [currentStep, setCurrentStep] = useState(0);

  // Step navigation handlers
  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const goTo = (idx: number) => setCurrentStep(idx);

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={goNext} />;
      case 1:
        return <MeetTeamStep onNext={goNext} onBack={goBack} />;
      case 2:
        return <DockerCheckStep onNext={goNext} onBack={goBack} />;
      case 3:
        return <CopilotCheckStep onNext={goNext} onBack={goBack} />;
      case 4:
        return <CompletionStep onBack={goBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        maxStep={steps.length - 1}
        onStep={goTo}
      >
        <div className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Stepper>
    </div>
  );
}
