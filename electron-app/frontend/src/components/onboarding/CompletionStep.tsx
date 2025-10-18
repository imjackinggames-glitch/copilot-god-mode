import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompletionStepProps {
  onBack: () => void;
}

export function CompletionStep({ onBack }: CompletionStepProps) {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  const completionItems = [
    { label: 'Docker Environment', icon: '🐳', status: 'ready' },
    { label: 'GitHub Copilot', icon: '🤖', status: 'ready' },
    { label: '9 AI Agents', icon: '👥', status: 'ready' },
    { label: 'Development Tools', icon: '🛠️', status: 'ready' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center"
    >
      {/* Celebration Animation */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        {/* Main Success Icon */}
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-primary/20"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(34, 197, 94, 0.4)',
              '0 0 0 20px rgba(34, 197, 94, 0)',
              '0 0 0 0 rgba(34, 197, 94, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </motion.div>
        
        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 6) * 80],
              y: [0, Math.sin((i * Math.PI * 2) / 6) * 80],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Success Message */}
      <motion.h2
        className="mb-3 text-center text-4xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        You're All Set! 🎉
      </motion.h2>
      
      <motion.p
        className="mb-8 text-center text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Your AI-powered development environment is ready to go.
      </motion.p>
      
      {/* Completion Checklist */}
      <motion.div
        className="mb-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-3 rounded-lg border-2 border-border bg-card p-6">
          {completionItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-green-500">✓ Ready</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Features Preview */}
      <motion.div
        className="mb-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="mb-4 text-center text-sm font-semibold text-foreground">
          What you can do now:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Chat with Agents',
              description: 'Ask questions and get expert advice',
              color: '#8b5cf6',
            },
            {
              title: 'Generate Code',
              description: 'Production-ready code in seconds',
              color: '#3b82f6',
            },
            {
              title: 'Analyze Projects',
              description: 'Get insights and suggestions',
              color: '#22c55e',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-lg border-2 border-border bg-card p-4 text-center transition-all hover:scale-105"
              style={{ borderColor: `${feature.color}40` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{
                borderColor: feature.color,
                boxShadow: `0 0 20px ${feature.color}40`,
              }}
            >
              <h4
                className="mb-2 text-sm font-semibold"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA Button */}
      <motion.button
        onClick={handleComplete}
        className="group relative mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-lg font-bold text-primary-foreground shadow-xl transition-all hover:shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        <span className="relative flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Go to Dashboard
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
      
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        ← Back
      </motion.button>
    </motion.div>
  );
}
