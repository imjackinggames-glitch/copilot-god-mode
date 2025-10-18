import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { AgentPersonality } from '../../config/agent-personalities';
import { MessageBubble } from './MessageBubble';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentId?: string;
}

interface ChatInterfaceProps {
  agent: AgentPersonality;
  messages: ChatMessage[];
  isTyping?: boolean;
  onSendMessage: (content: string) => void;
}

export function ChatInterface({
  agent,
  messages,
  isTyping = false,
  onSendMessage,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-lg">
      {/* Agent Header */}
      <div
        className="border-b-2 px-4 py-3"
        style={{ borderColor: agent.color }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
            style={{ backgroundColor: agent.color + '20' }}
          >
            {agent.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">{agent.specialty}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: agent.color }}
            />
            <span className="text-xs font-medium text-muted-foreground">
              {agent.status}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Proactive Greeting */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-4xl"
              style={{ backgroundColor: agent.color + '20' }}
            >
              {agent.avatar}
            </div>
            <h4 className="mb-2 text-lg font-bold text-foreground">
              {agent.greeting}
            </h4>
            <p className="text-sm text-muted-foreground">{agent.personality}</p>
          </motion.div>
        )}

        {/* Message History */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            agent={message.role === 'agent' ? agent : undefined}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: agent.color + '20' }}
            >
              {agent.avatar}
            </div>
            <div
              className="rounded-lg rounded-bl-none px-4 py-2"
              style={{ backgroundColor: agent.color + '20' }}
            >
              <div className="flex gap-1">
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: agent.color }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: agent.color }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: agent.color }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-2 p-4" style={{ borderColor: agent.color }}>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${agent.name}...`}
            className="flex-1"
            style={{ borderColor: agent.color + '40' }}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="h-10 w-10 p-0 transition-colors"
            style={{
              backgroundColor: inputValue.trim() ? agent.color : '#3a3a4e',
              color: '#ffffff',
            }}
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
