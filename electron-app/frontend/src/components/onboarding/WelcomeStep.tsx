import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Code2, Users } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Hero Icon */}
      <motion.div
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="h-12 w-12 text-primary" />
        </motion.div>
      </motion.div>
      
      {/* Title */}
      <motion.h1
        className="mb-4 text-4xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to <span className="text-primary">Copilot God Mode</span>
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p
        className="mb-12 max-w-2xl text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Your AI-powered development team is ready to supercharge your coding workflow.
        Let's get you set up in just a few simple steps.
      </motion.p>
      
      {/* Feature Grid */}
      <motion.div
        className="mb-12 grid gap-6 sm:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Feature 1 */}
        <motion.div
          className="flex flex-col items-center rounded-lg border-2 border-border bg-card p-6"
          whileHover={{ scale: 1.05, borderColor: 'rgb(139, 92, 246)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">
            Generate production-ready code in seconds
          </p>
        </motion.div>
        
        {/* Feature 2 */}
        <motion.div
          className="flex flex-col items-center rounded-lg border-2 border-border bg-card p-6"
          whileHover={{ scale: 1.05, borderColor: 'rgb(139, 92, 246)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">Best Practices</h3>
          <p className="text-sm text-muted-foreground">
            SOLID principles, clean code, zero errors
          </p>
        </motion.div>
        
        {/* Feature 3 */}
        <motion.div
          className="flex flex-col items-center rounded-lg border-2 border-border bg-card p-6"
          whileHover={{ scale: 1.05, borderColor: 'rgb(139, 92, 246)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">9 AI Agents</h3>
          <p className="text-sm text-muted-foreground">
            Each specialized for different tasks
          </p>
        </motion.div>
      </motion.div>
      
      {/* CTA Button */}
      <motion.button
        onClick={onNext}
        className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        <span className="relative flex items-center gap-2">
          Let's Get Started
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
      
      {/* Skip Link */}
      <motion.button
        onClick={() => window.location.hash = '#/dashboard'}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Skip onboarding
      </motion.button>
    </motion.div>
  );
}
