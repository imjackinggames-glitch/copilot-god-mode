import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { AgentPersonality } from '../../config/agent-personalities';

export interface Activity {
  id: string;
  agent: AgentPersonality;
  action: string;
  timestamp: Date;
  status: 'success' | 'info' | 'warning' | 'error';
}

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

const statusIcons = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✗',
};

const statusColors = {
  success: '#22c55e',
  info: '#3b82f6',
  warning: '#f59e0b',
  error: '#ef4444',
};

export function ActivityFeed({
  activities,
  maxItems = 10,
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="rounded-lg border-2 border-border bg-card p-6 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {displayedActivities.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No recent activity
          </p>
        ) : (
          displayedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 rounded-lg border-2 border-border bg-background p-3 transition-colors hover:bg-muted"
            >
              {/* Agent Avatar */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: activity.agent.color + '20' }}
              >
                {activity.agent.avatar}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.agent.name.split(' ')[0]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{
                      backgroundColor: statusColors[activity.status],
                    }}
                  >
                    {statusIcons[activity.status]}
                  </div>
                </div>

                {/* Timestamp */}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* View All Link */}
      {activities.length > maxItems && (
        <button className="mt-4 w-full rounded-lg border-2 border-border bg-muted py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80">
          View All Activity ({activities.length})
        </button>
      )}
    </div>
  );
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
