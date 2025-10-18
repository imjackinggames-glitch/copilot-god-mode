import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingState {
  // Estado
  completed: boolean;
  currentStep: number;
  steps: OnboardingStep[];
  userName: string;
  dockerReady: boolean;
  ollamaReady: boolean;

  // Ações
  nextStep: () => void;
  prevStep: () => void;
  completeStep: (stepId: string) => void;
  setUserName: (name: string) => void;
  setDockerReady: (ready: boolean) => void;
  setOllamaReady: (ready: boolean) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const initialSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Copilot God Mode',
    description: 'Let\'s get you set up with your AI-powered documentation assistant',
    completed: false,
  },
  {
    id: 'profile',
    title: 'Create Your Profile',
    description: 'Tell us a bit about yourself',
    completed: false,
  },
  {
    id: 'docker',
    title: 'Setup Docker',
    description: 'We\'ll verify Docker is installed and running',
    completed: false,
  },
  {
    id: 'ollama',
    title: 'Configure Ollama',
    description: 'Set up your local LLM server',
    completed: false,
  },
  {
    id: 'agents',
    title: 'Meet Your Agents',
    description: 'Discover the 9 specialized AI agents at your service',
    completed: false,
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Ready to start creating amazing documentation',
    completed: false,
  },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      completed: false,
      currentStep: 0,
      steps: initialSteps,
      userName: '',
      dockerReady: false,
      ollamaReady: false,

      // Ir para próximo passo
      nextStep: () => {
        const { currentStep, steps } = get();
        if (currentStep < steps.length - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      // Voltar passo
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      // Completar passo específico
      completeStep: (stepId: string) => {
        const { steps } = get();
        const updatedSteps = steps.map(step =>
          step.id === stepId ? { ...step, completed: true } : step
        );
        set({ steps: updatedSteps });
      },

      // Definir nome do usuário
      setUserName: (name: string) => {
        set({ userName: name });
        get().completeStep('profile');
      },

      // Marcar Docker como pronto
      setDockerReady: (ready: boolean) => {
        set({ dockerReady: ready });
        if (ready) {
          get().completeStep('docker');
        }
      },

      // Marcar Ollama como pronto
      setOllamaReady: (ready: boolean) => {
        set({ ollamaReady: ready });
        if (ready) {
          get().completeStep('ollama');
        }
      },

      // Completar onboarding
      completeOnboarding: () => {
        set({ completed: true });
        get().completeStep('complete');
      },

      // Resetar onboarding
      reset: () => {
        set({
          completed: false,
          currentStep: 0,
          steps: initialSteps,
          userName: '',
          dockerReady: false,
          ollamaReady: false,
        });
      },
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
