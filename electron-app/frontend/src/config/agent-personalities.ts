// 🌌 SINTRA AI-INSPIRED AGENT PERSONALITIES
// Each agent has a unique personality, avatar, color, and specialty

export interface AgentPersonality {
  id: string;
  name: string;
  avatar: string;
  color: string;
  personality: string;
  greeting: string;
  specialty: string;
  proactive: boolean;
  status: 'idle' | 'thinking' | 'working' | 'done';
  lastMessage?: string;
}

export const AGENT_PERSONALITIES: Record<string, AgentPersonality> = {
  analyzer: {
    id: 'analyzer',
    name: 'Alex Analyzer',
    avatar: '🧠',
    color: '#8b5cf6', // purple
    personality: 'Analytical Oracle - Reads your mind before you finish typing',
    greeting: 'Hey! I can already tell what you\'re building... 👀',
    specialty: 'Intent analysis, market research, tech stack decisions',
    proactive: true,
    status: 'idle',
    lastMessage: 'Ready to analyze your next big idea!',
  },
  
  designer: {
    id: 'designer',
    name: 'Diana Designer',
    avatar: '🎨',
    color: '#ec4899', // pink
    personality: 'Aesthetic Genius - Creates 20+ mockups in seconds',
    greeting: 'Ready to make something beautiful? Let\'s design! ✨',
    specialty: 'UI/UX, mockups, brand identity, accessibility',
    proactive: true,
    status: 'idle',
    lastMessage: 'Want me to generate some mockups?',
  },
  
  architect: {
    id: 'architect',
    name: 'Arthur Architect',
    avatar: '🏗️',
    color: '#3b82f6', // blue
    personality: 'System Mastermind - Designs bulletproof architectures',
    greeting: 'Let\'s build something that scales to millions 🚀',
    specialty: 'System design, microservices, cloud architecture',
    proactive: true,
    status: 'idle',
    lastMessage: 'I can design the perfect architecture for you!',
  },
  
  builder: {
    id: 'builder',
    name: 'Ben Builder',
    avatar: '🔨',
    color: '#22c55e', // green
    personality: 'Code Generator - Builds production-ready apps in minutes',
    greeting: 'Time to turn designs into reality! 💪',
    specialty: 'Code generation, scaffolding, implementation',
    proactive: true,
    status: 'idle',
    lastMessage: 'Ready to generate some code?',
  },
  
  security: {
    id: 'security',
    name: 'Sarah Security',
    avatar: '🛡️',
    color: '#f59e0b', // amber
    personality: 'Guardian Angel - Protects your app 24/7',
    greeting: 'I\'ll keep your app safe from all threats 🔒',
    specialty: 'Security audits, OWASP compliance, vulnerability scanning',
    proactive: true,
    status: 'idle',
    lastMessage: 'Want me to scan for vulnerabilities?',
  },
  
  performance: {
    id: 'performance',
    name: 'Pete Performance',
    avatar: '⚡',
    color: '#06b6d4', // cyan
    personality: 'Speed Demon - Makes everything blazingly fast',
    greeting: 'Let\'s make this app fly! ⚡️',
    specialty: 'Performance optimization, caching, load testing',
    proactive: true,
    status: 'idle',
    lastMessage: 'I can optimize your app\'s performance!',
  },
  
  dataengineer: {
    id: 'dataengineer',
    name: 'Dana DataEngineer',
    avatar: '📊',
    color: '#a855f7', // purple
    personality: 'Data Wizard - Designs perfect database schemas',
    greeting: 'Your data deserves the best structure 📈',
    specialty: 'Database design, migrations, data pipelines',
    proactive: true,
    status: 'idle',
    lastMessage: 'Need help with your database schema?',
  },
  
  integration: {
    id: 'integration',
    name: 'Ian Integration',
    avatar: '🔌',
    color: '#10b981', // emerald
    personality: 'Connection Master - Connects everything seamlessly',
    greeting: 'Let\'s integrate all your favorite tools! 🔗',
    specialty: 'API integration, webhooks, third-party services',
    proactive: true,
    status: 'idle',
    lastMessage: 'Which tools do you want to integrate?',
  },
  
  aiml: {
    id: 'aiml',
    name: 'Amy AI/ML',
    avatar: '🤖',
    color: '#f97316', // orange
    personality: 'AI Prodigy - Adds intelligence to everything',
    greeting: 'Ready to add some AI magic? 🪄',
    specialty: 'Machine learning, AI models, predictive analytics',
    proactive: true,
    status: 'idle',
    lastMessage: 'Want to add AI features to your app?',
  },
};

// Helper function to get agent by id
export function getAgent(id: string): AgentPersonality | undefined {
  return AGENT_PERSONALITIES[id];
}

// Get all agents as array
export function getAllAgents(): AgentPersonality[] {
  return Object.values(AGENT_PERSONALITIES);
}

// Get agents by status
export function getAgentsByStatus(status: AgentPersonality['status']): AgentPersonality[] {
  return getAllAgents().filter(agent => agent.status === status);
}

// Get proactive agents
export function getProactiveAgents(): AgentPersonality[] {
  return getAllAgents().filter(agent => agent.proactive);
}
