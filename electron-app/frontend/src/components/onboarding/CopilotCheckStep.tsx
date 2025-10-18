import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, ExternalLink, RefreshCw, Sparkles } from 'lucide-react';

interface CopilotCheckStepProps {
  onNext: () => void;
  onBack: () => void;
}

type CopilotStatus = 'checking' | 'installed' | 'not-installed';

export function CopilotCheckStep({ onNext, onBack }: CopilotCheckStepProps) {
  const [copilotStatus, setCopilotStatus] = useState<CopilotStatus>('checking');
  const [isRetrying, setIsRetrying] = useState(false);
  
  const checkCopilotStatus = async () => {
    setCopilotStatus('checking');
    
    // Simulate Copilot check (in real app, this would check VS Code extensions or electron IPC)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock result: 70% chance of installed
    const isInstalled = Math.random() > 0.3;
    setCopilotStatus(isInstalled ? 'installed' : 'not-installed');
  };
  
  useEffect(() => {
    checkCopilotStatus();
  }, []);
  
  const handleRetry = async () => {
    setIsRetrying(true);
    await checkCopilotStatus();
    setIsRetrying(false);
  };
  
  const handleSkip = () => {
    // GitHub Copilot is optional, allow skip
    onNext();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.h2
          className="mb-3 text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GitHub Copilot Check
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          GitHub Copilot enhances your experience with AI-powered code suggestions.
        </motion.p>
      </div>
      
      {/* Status Card */}
      <motion.div
        className="mb-8 rounded-lg border-2 border-border bg-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Checking State */}
        {copilotStatus === 'checking' && (
          <div className="flex flex-col items-center">
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="h-10 w-10 text-primary" />
            </motion.div>
            <p className="text-lg text-muted-foreground">Checking GitHub Copilot...</p>
          </div>
        )}
        
        {/* Installed State */}
        {copilotStatus === 'installed' && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Check className="h-10 w-10 text-green-500" />
              <motion.div
                className="absolute -right-1 -top-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-green-500">Copilot Ready!</h3>
            <p className="mb-4 text-center text-muted-foreground">
              GitHub Copilot is installed and ready to assist you.
            </p>
            <div className="rounded-lg bg-primary/10 px-4 py-2">
              <p className="text-sm text-primary">
                💡 Copilot God Mode works seamlessly with GitHub Copilot
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Not Installed State */}
        {copilotStatus === 'not-installed' && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <AlertTriangle className="h-10 w-10 text-yellow-500" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-yellow-500">Copilot Not Detected</h3>
            <p className="mb-6 text-center text-muted-foreground">
              GitHub Copilot extension doesn't appear to be installed.
            </p>
            
            {/* Info Box */}
            <div className="mb-6 w-full rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">Why install Copilot?</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">•</span>
                  <span>AI-powered code completions as you type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">•</span>
                  <span>Works alongside our 9 specialized AI agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">•</span>
                  <span>Enhanced by Copilot God Mode's context awareness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">•</span>
                  <span>Free for students, teachers, and open source maintainers</span>
                </li>
              </ul>
            </div>
            
            {/* Installation Instructions */}
            <div className="w-full rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">To install GitHub Copilot:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">1.</span>
                  <span>Open VS Code Extensions (Ctrl+Shift+X or Cmd+Shift+X)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Search for "GitHub Copilot"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Click "Install" and sign in with your GitHub account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">4.</span>
                  <span>
                    Or visit{' '}
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      VS Code Marketplace
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </span>
                </li>
              </ol>
            </div>
            
            {/* Note */}
            <div className="mt-4 rounded-lg bg-amber-500/10 px-4 py-2">
              <p className="text-sm text-amber-500">
                ℹ️ Copilot is optional but recommended for the best experience
              </p>
            </div>
            
            {/* Retry Button */}
            <motion.button
              onClick={handleRetry}
              disabled={isRetrying}
              className="mt-6 flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
              whileHover={{ scale: isRetrying ? 1 : 1.05 }}
              whileTap={{ scale: isRetrying ? 1 : 0.95 }}
            >
              <RefreshCw className={`h-5 w-5 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Checking...' : 'Check Again'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <motion.button
          onClick={onBack}
          className="rounded-lg border-2 border-border px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
        
        <div className="flex gap-3">
          {copilotStatus === 'not-installed' && (
            <motion.button
              onClick={handleSkip}
              className="rounded-lg border-2 border-border px-6 py-3 font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip for Now
            </motion.button>
          )}
          
          <motion.button
            onClick={onNext}
            disabled={copilotStatus === 'checking'}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            whileHover={{ scale: copilotStatus === 'checking' ? 1 : 1.05 }}
            whileTap={{ scale: copilotStatus === 'checking' ? 1 : 0.95 }}
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
