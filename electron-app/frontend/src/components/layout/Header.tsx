import { motion } from 'framer-motion';
import { Menu, Bell, User } from 'lucide-react';
import { getAllAgents } from '../../config/agent-personalities';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const agents = getAllAgents();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-2xl">
              🌌
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">
                Copilot God Mode
              </h1>
              <p className="text-xs text-muted-foreground">
                Your AI Development Team
              </p>
            </div>
          </div>
        </div>

        {/* Center: Agent Status Indicators */}
        <div className="hidden items-center gap-2 lg:flex">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group relative cursor-pointer"
              title={agent.name}
            >
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: agent.color }}
                animate={{
                  scale: agent.status === 'working' ? [1, 1.2, 1] : 1,
                  opacity: agent.status === 'idle' ? 0.5 : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: agent.status === 'working' ? Infinity : 0,
                }}
              />

              {/* Tooltip */}
              <div className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-3 py-2 text-xs shadow-lg group-hover:block">
                <div className="flex items-center gap-2">
                  <span>{agent.avatar}</span>
                  <span className="font-medium text-foreground">
                    {agent.name}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{agent.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 transition-colors hover:bg-muted">
            <Bell className="h-5 w-5 text-foreground" />
            <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden text-sm font-medium text-foreground md:block">
              User
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
