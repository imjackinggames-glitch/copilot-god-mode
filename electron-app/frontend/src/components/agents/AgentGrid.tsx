import { AgentPersonality } from '../../config/agent-personalities';
import { AgentCard } from './AgentCard';

interface AgentGridProps {
  agents: AgentPersonality[];
  onAgentClick?: (agent: AgentPersonality) => void;
}

export function AgentGrid({ agents, onAgentClick }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onClick={() => onAgentClick?.(agent)}
        />
      ))}
    </div>
  );
}
