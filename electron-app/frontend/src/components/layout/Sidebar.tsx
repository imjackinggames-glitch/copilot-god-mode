import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Puzzle,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { getAllAgents } from '../../config/agent-personalities';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navLinks = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/agents', icon: Users, label: 'Agents' },
  { to: '/workflow', icon: GitBranch, label: 'Workflow Canvas' },
  { to: '/integrations', icon: Puzzle, label: 'Integrations' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const agents = getAllAgents();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 border-r-2 border-border bg-card lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          {/* Close Button (mobile only) */}
          <div className="flex h-16 items-center justify-between border-b-2 border-border px-4 lg:hidden">
            <h2 className="text-lg font-bold text-foreground">Menu</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            ))}

            {/* Divider */}
            <div className="my-4 border-t-2 border-border" />

            {/* Agent Quick Access */}
            <div className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Quick Access
            </div>
            {agents.slice(0, 5).map((agent) => (
              <button
                key={agent.id}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: agent.color + '20' }}
                >
                  {agent.avatar}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium text-foreground">
                    {agent.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {agent.status}
                  </p>
                </div>
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: agent.color,
                    opacity: agent.status === 'idle' ? 0.5 : 1,
                  }}
                />
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t-2 border-border p-4">
            <div className="rounded-lg bg-muted p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="text-xs font-bold text-foreground">
                  System Status
                </span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Docker</span>
                  <span className="text-accent">✓ Running</span>
                </div>
                <div className="flex justify-between">
                  <span>Copilot</span>
                  <span className="text-accent">✓ Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>Agents</span>
                  <span className="text-foreground">5/9 Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
