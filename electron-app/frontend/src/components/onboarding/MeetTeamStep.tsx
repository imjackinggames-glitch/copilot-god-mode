import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAgents, type AgentPersonality } from '../../config/agent-personalities';
import { X, ChevronRight } from 'lucide-react';

interface MeetTeamStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function MeetTeamStep({ onNext, onBack }: MeetTeamStepProps) {
  const agents = getAllAgents();
  const [selectedAgent, setSelectedAgent] = useState<AgentPersonality | null>(null);
  
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
          Meet Your AI Development Team
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Each agent specializes in different aspects of software development.
          Click any agent to learn more about their expertise.
        </motion.p>
      </div>
      
      {/* Agent Grid */}
      <motion.div
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {agents.map((agent, index) => (
          <motion.button
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className="group flex items-center gap-4 rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-opacity-100 hover:shadow-lg"
            style={{ borderColor: selectedAgent?.id === agent.id ? agent.color : undefined }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Agent Avatar */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl transition-all group-hover:scale-110"
              style={{ borderColor: agent.color, backgroundColor: `${agent.color}20` }}
            >
              {agent.avatar}
            </div>
            
            {/* Agent Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{agent.name}</h3>
              <p className="text-xs text-muted-foreground">{agent.specialty}</p>
            </div>
            
            {/* Arrow */}
            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        ))}
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
        
        <motion.button
          onClick={onNext}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue →
        </motion.button>
      </div>
      
      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-lg border-2 bg-background p-8 shadow-2xl"
              style={{ borderColor: selectedAgent.color }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute right-4 top-4 rounded-lg p-2 text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Agent Avatar Large */}
              <div className="mb-6 flex justify-center">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-5xl"
                  style={{ borderColor: selectedAgent.color, backgroundColor: `${selectedAgent.color}20` }}
                >
                  {selectedAgent.avatar}
                </div>
              </div>
              
              {/* Agent Name */}
              <h3 className="mb-2 text-center text-2xl font-bold text-foreground">
                {selectedAgent.name}
              </h3>
              
              {/* Agent Personality */}
              <p className="mb-6 text-center text-muted-foreground">
                {selectedAgent.personality}
              </p>
              
              {/* Specialty Badge */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-foreground">Specialty:</p>
                <div className="flex justify-center">
                  <motion.span
                    className="rounded-full px-4 py-2 text-sm font-medium"
                    style={{ 
                      backgroundColor: `${selectedAgent.color}20`, 
                      color: selectedAgent.color,
                      borderWidth: '1px',
                      borderColor: selectedAgent.color
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {selectedAgent.specialty}
                  </motion.span>
                </div>
              </div>
              
              {/* Greeting */}
              <div
                className="rounded-lg border-l-4 bg-muted/50 p-4 italic text-muted-foreground"
                style={{ borderLeftColor: selectedAgent.color }}
              >
                "{selectedAgent.greeting}"
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
