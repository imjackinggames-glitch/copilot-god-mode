import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface DockerCheckStepProps {
  onNext: () => void;
  onBack: () => void;
}

type DockerStatus = 'checking' | 'installed' | 'not-installed' | 'error';

export function DockerCheckStep({ onNext, onBack }: DockerCheckStepProps) {
  const [dockerStatus, setDockerStatus] = useState<DockerStatus>('checking');
  const [isRetrying, setIsRetrying] = useState(false);
  
  const checkDockerStatus = async () => {
    setDockerStatus('checking');
    
    // Simulate Docker check (in real app, this would call an API or electron IPC)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock result: 50% chance of installed
    const isInstalled = Math.random() > 0.3;
    setDockerStatus(isInstalled ? 'installed' : 'not-installed');
  };
  
  useEffect(() => {
    checkDockerStatus();
  }, []);
  
  const handleRetry = async () => {
    setIsRetrying(true);
    await checkDockerStatus();
    setIsRetrying(false);
  };
  
  const handleSkip = () => {
    // Mark as skipped and continue
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
          Docker Setup Check
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Docker is required to run local AI models and development containers.
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
        {dockerStatus === 'checking' && (
          <div className="flex flex-col items-center">
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="h-10 w-10 text-primary" />
            </motion.div>
            <p className="text-lg text-muted-foreground">Checking Docker installation...</p>
          </div>
        )}
        
        {/* Installed State */}
        {dockerStatus === 'installed' && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Check className="h-10 w-10 text-green-500" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-green-500">Docker is Running!</h3>
            <p className="text-center text-muted-foreground">
              Your Docker installation is active and ready to use.
            </p>
          </motion.div>
        )}
        
        {/* Not Installed State */}
        {dockerStatus === 'not-installed' && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <AlertCircle className="h-10 w-10 text-amber-500" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-amber-500">Docker Not Found</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Docker doesn't appear to be installed or running on your system.
            </p>
            
            {/* Installation Instructions */}
            <div className="w-full rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">To install Docker:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">1.</span>
                  <span>
                    Visit{' '}
                    <a
                      href="https://www.docker.com/products/docker-desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Docker Desktop
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Download the installer for your operating system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Run the installer and follow the setup wizard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">4.</span>
                  <span>Start Docker Desktop after installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">5.</span>
                  <span>Click "Check Again" below to verify installation</span>
                </li>
              </ol>
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
          {dockerStatus === 'not-installed' && (
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
            disabled={dockerStatus === 'checking'}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            whileHover={{ scale: dockerStatus === 'checking' ? 1 : 1.05 }}
            whileTap={{ scale: dockerStatus === 'checking' ? 1 : 0.95 }}
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
