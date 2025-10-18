import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="mb-12">
      {/* Progress Bar Background */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-border" />
        
        {/* Progress Bar Fill */}
        <motion.div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary"
          initial={{ width: '0%' }}
          animate={{ 
            width: currentStep === 0 ? '0%' : `${(currentStep / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Step Dots */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = onStepClick && index <= currentStep;
            
            return (
              <motion.button
                key={step.id}
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={`
                  relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-background
                  transition-all duration-300
                  ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                  ${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
                  ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                `}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
                
                {/* Pulse Animation for Current Step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary opacity-75"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep;
          
          return (
            <motion.div
              key={`${step.id}-label`}
              className="flex-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <p
                className={`
                  text-sm font-medium transition-colors
                  ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}
                `}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
