import { useState } from 'react';
import { Users, GitBranch, Container, FolderGit2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ProactiveNotifications } from '../components/dashboard/ProactiveNotifications';
import { StatCard } from '../components/dashboard/StatCard';
import { AgentGrid } from '../components/agents/AgentGrid';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { ChatInterface } from '../components/dashboard/ChatInterface';
import { getAllAgents, getAgent } from '../config/agent-personalities';
import type { AgentPersonality } from '../config/agent-personalities';

export default function DashboardPage() {
  const agents = getAllAgents();
  const [selectedAgent, setSelectedAgent] = useState<AgentPersonality | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock notifications
  const mockNotifications = [
    {
      id: '1',
      agent: getAgent('architect')!,
      message: 'New architectural pattern detected',
      actions: [
        {
          label: 'Review Suggestion',
          onClick: () => console.log('Review architectural pattern'),
        },
        { label: 'Dismiss', onClick: () => handleNotificationDismiss('1') },
      ],
    },
    {
      id: '2',
      agent: getAgent('security')!,
      message: 'Security vulnerability found',
      actions: [
        { label: 'Fix Now', onClick: () => console.log('Fix vulnerabilities') },
        { label: 'View Details', onClick: () => console.log('View details') },
      ],
    },
  ];

  // Mock activities
  const mockActivities = [
    {
      id: '1',
      agent: getAgent('builder')!,
      action: 'Generated 5 React components with TypeScript',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'success' as const,
    },
    {
      id: '2',
      agent: getAgent('analyzer')!,
      action: 'Analyzed project structure and dependencies',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      status: 'info' as const,
    },
    {
      id: '3',
      agent: getAgent('security')!,
      action: 'Found 3 security vulnerabilities',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'warning' as const,
    },
    {
      id: '4',
      agent: getAgent('performance')!,
      action: 'Optimized bundle size by 23%',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'success' as const,
    },
    {
      id: '5',
      agent: getAgent('designer')!,
      action: 'Generated responsive UI mockups',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'success' as const,
    },
  ];

  const handleNotificationDismiss = (notificationId: string) => {
    console.log('Dismiss notification:', notificationId);
    // Handle dismiss logic here
  };

  const handleAgentClick = (agent: AgentPersonality) => {
    setSelectedAgent(agent);
    // Initialize chat with greeting
    setChatMessages([
      {
        id: '1',
        role: 'agent',
        content: agent.greeting,
        timestamp: new Date(),
        agentId: agent.id,
      },
    ]);
  };

  const handleCloseChat = () => {
    setSelectedAgent(null);
    setChatMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    // Simulate agent typing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add agent response
    const agentMessage = {
      id: (Date.now() + 1).toString(),
      role: 'agent' as const,
      content: `I understand you said: "${content}". Let me help you with that!`,
      timestamp: new Date(),
      agentId: selectedAgent?.id,
    };
    setChatMessages((prev) => [...prev, agentMessage]);
    setIsTyping(false);
  };

  return (
    <>
      <PageContainer>
        {/* Proactive Notifications */}
        <ProactiveNotifications
          notifications={mockNotifications}
          onDismiss={handleNotificationDismiss}
        />

        {/* Statistics Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Agents"
            value="5/9"
            icon={<Users className="h-6 w-6" />}
            color="#22c55e"
            trend={{ value: '+2 today', isPositive: true }}
          />
          <StatCard
            title="Workflows Running"
            value="3"
            icon={<GitBranch className="h-6 w-6" />}
            color="#3b82f6"
          />
          <StatCard
            title="Docker Status"
            value="Running"
            icon={<Container className="h-6 w-6" />}
            color="#22c55e"
          />
          <StatCard
            title="Projects"
            value="12"
            icon={<FolderGit2 className="h-6 w-6" />}
            color="#8b5cf6"
            trend={{ value: '+3 this week', isPositive: true }}
          />
        </div>

        {/* Agent Grid */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Your AI Development Team
          </h2>
          <AgentGrid agents={agents} onAgentClick={handleAgentClick} />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <ActivityFeed activities={mockActivities} />
        </div>
      </PageContainer>

      {/* Chat Interface Overlay */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative h-[600px] w-full max-w-2xl rounded-lg border-2 border-border bg-background shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleCloseChat}
              className="absolute right-4 top-4 z-10 rounded-lg p-2 text-foreground hover:bg-muted"
            >
              ✕
            </button>
            <ChatInterface
              agent={selectedAgent}
              messages={chatMessages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
}
