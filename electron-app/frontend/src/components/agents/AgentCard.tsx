import { motion } from 'framer-motion';
import { AgentPersonality } from '../../config/agent-personalities';

interface AgentCardProps {
  agent: AgentPersonality;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const statusColors = {
    idle: 'bg-muted',
    thinking: 'bg-yellow-500 animate-pulse',
    working: 'bg-blue-500 animate-pulse-slow',
    done: 'bg-green-500',
  };

  const statusLabels = {
    idle: 'Idle',
    thinking: 'Thinking...',
    working: 'Working...',
    done: 'Done!',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-lg border-2 bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/10"
      style={{ borderColor: agent.color }}
    >
      {/* Proactive Badge */}
      {agent.proactive && (
        <div className="absolute -right-2 -top-2 rounded-full bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
          PROACTIVE
        </div>
      )}

      {/* Agent Avatar */}
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-4xl ring-4"
          style={{ 
            backgroundColor: agent.color + '20',
            borderColor: agent.color,
          }}
        >
          {agent.avatar}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
            {statusLabels[agent.status]}
          </div>
        </div>
      </div>

      {/* Personality */}
      <p className="mb-3 text-sm font-medium text-foreground opacity-90">
        {agent.personality}
      </p>

      {/* Specialty */}
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Specialty
        </span>
        <p className="mt-1 text-sm text-foreground/80">{agent.specialty}</p>
      </div>

      {/* Last Message */}
      {agent.lastMessage && (
        <div className="rounded-md bg-secondary/50 p-3">
          <p className="text-xs text-secondary-foreground/80">
            💬 {agent.lastMessage}
          </p>
        </div>
      )}

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${agent.color}10 0%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
}
