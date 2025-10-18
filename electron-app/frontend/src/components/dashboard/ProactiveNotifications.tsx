import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AgentPersonality } from '../../config/agent-personalities';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ProactiveNotification {
  id: string;
  agent: AgentPersonality;
  message: string;
  actions: Array<{
    label: string;
    onClick: () => void;
  }>;
}

interface ProactiveNotificationsProps {
  notifications: ProactiveNotification[];
  onDismiss: (id: string) => void;
}

export function ProactiveNotifications({
  notifications,
  onDismiss,
}: ProactiveNotificationsProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          >
            <Card
              className="relative overflow-hidden p-4 shadow-lg"
              style={{ borderColor: notification.agent.color }}
            >
              {/* Agent Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: notification.agent.color + '20' }}
                  >
                    {notification.agent.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {notification.agent.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      Proactive Suggestion
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(notification.id)}
                  className="h-8 w-8 rounded-full p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

            {/* Message */}
            <p className="mb-4 text-sm text-foreground/90">
              {notification.message}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  size="sm"
                  className="transition-colors hover:brightness-110"
                  style={{
                    backgroundColor: notification.agent.color,
                    color: '#ffffff',
                  }}
                >
                  {action.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(notification.id)}
              >
                Dismiss
              </Button>
            </div>

            {/* Animated Glow */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  `radial-gradient(circle at 0% 0%, ${notification.agent.color} 0%, transparent 50%)`,
                  `radial-gradient(circle at 100% 100%, ${notification.agent.color} 0%, transparent 50%)`,
                  `radial-gradient(circle at 0% 0%, ${notification.agent.color} 0%, transparent 50%)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
