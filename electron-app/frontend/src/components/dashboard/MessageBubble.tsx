import { motion } from 'framer-motion';
import { AgentPersonality } from '../../config/agent-personalities';
import { ChatMessage } from './ChatInterface';

interface MessageBubbleProps {
  message: ChatMessage;
  agent?: AgentPersonality;
}

export function MessageBubble({ message, agent }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isUser && agent && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: agent.color + '20' }}
        >
          {agent.avatar}
        </div>
      )}

      {/* Message Bubble */}
      <div className={`flex max-w-[70%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? 'rounded-br-none bg-primary text-white'
              : 'rounded-bl-none'
          }`}
          style={
            !isUser && agent
              ? {
                  backgroundColor: agent.color + '20',
                  color: '#e8e8ef',
                }
              : undefined
          }
        >
          <p className="text-sm">{message.content}</p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          👤
        </div>
      )}
    </motion.div>
  );
}
