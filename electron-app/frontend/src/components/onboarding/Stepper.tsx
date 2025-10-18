import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  maxStep: number;
  onStep: (step: number) => void;
  children: React.ReactNode;
}

export function Stepper({ steps, currentStep, maxStep, onStep, children }: StepperProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-8 flex w-full max-w-2xl items-center justify-center gap-2">
        {steps.map((step, i) => (
          <Button
            key={step.id}
            onClick={() => onStep(i)}
            className={cn(
              'flex-1 rounded-lg border-2 px-4 py-2 font-semibold transition-all',
              i === currentStep
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:bg-muted'
            )}
            disabled={i > maxStep}
            variant={i === currentStep ? 'default' : 'outline'}
          >
            {step.icon && <span className="mr-2 inline-block align-middle">{step.icon}</span>}
            {step.label}
          </Button>
        ))}
      </div>
      <Card className="w-full max-w-2xl p-6">
        {children}
      </Card>
    </div>
  );
}

