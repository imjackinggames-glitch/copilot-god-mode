import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos
export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatar: string;
  enabled: boolean;
  status: 'idle' | 'working' | 'waiting' | 'done' | 'error';
  progress?: number;
}

export interface WorkflowNode {
  id: string;
  type: 'agent' | 'input' | 'output' | 'condition';
  agentId?: string;
  label: string;
  position: { x: number; y: number };
  data?: any;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkflowState {
  // Workflows
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  
  // Agentes
  agents: Agent[];
  
  // Estado de execução
  isRunning: boolean;
  currentStep: number;
  totalSteps: number;
  results: Record<string, any>;
  
  // Ações - Workflows
  createWorkflow: (name: string, description: string) => void;
  loadWorkflow: (id: string) => void;
  updateWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  
  // Ações - Nós e Conexões
  addNode: (node: WorkflowNode) => void;
  updateNode: (id: string, data: Partial<WorkflowNode>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: WorkflowEdge) => void;
  removeEdge: (id: string) => void;
  
  // Ações - Execução
  startWorkflow: () => Promise<void>;
  stopWorkflow: () => void;
  updateAgentStatus: (agentId: string, status: Agent['status'], progress?: number) => void;
  setResult: (nodeId: string, result: any) => void;
  
  // Ações - Agentes
  toggleAgent: (agentId: string) => void;
  updateAgentConfig: (agentId: string, config: Partial<Agent>) => void;
}

// Agentes padrão do sistema
const defaultAgents: Agent[] = [
  {
    id: 'architect',
    name: 'Architect',
    role: 'System Designer',
    description: 'Designs high-level architecture and technical specifications',
    color: '#3B82F6',
    avatar: 'architect',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'builder',
    name: 'Builder',
    role: 'Code Generator',
    description: 'Generates production-ready code with best practices',
    color: '#10B981',
    avatar: 'builder',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'analyzer',
    name: 'Analyzer',
    role: 'Code Analyzer',
    description: 'Analyzes code quality, complexity, and patterns',
    color: '#8B5CF6',
    avatar: 'analyzer',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'designer',
    name: 'Designer',
    role: 'UI/UX Designer',
    description: 'Creates beautiful, accessible user interfaces',
    color: '#EC4899',
    avatar: 'designer',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'security',
    name: 'Security',
    role: 'Security Expert',
    description: 'Ensures security best practices and vulnerability prevention',
    color: '#EF4444',
    avatar: 'security',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'performance',
    name: 'Performance',
    role: 'Performance Expert',
    description: 'Optimizes code for speed, efficiency, and scalability',
    color: '#F59E0B',
    avatar: 'performance',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'integration',
    name: 'Integration',
    role: 'Integration Specialist',
    description: 'Handles API integrations and third-party services',
    color: '#14B8A6',
    avatar: 'integration',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'dataengineer',
    name: 'Data Engineer',
    role: 'Data Specialist',
    description: 'Designs databases, migrations, and data pipelines',
    color: '#6366F1',
    avatar: 'dataengineer',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    role: 'AI/ML Engineer',
    description: 'Implements machine learning models and AI features',
    color: '#A855F7',
    avatar: 'aiml',
    enabled: true,
    status: 'idle',
  },
];

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      workflows: [],
      currentWorkflow: null,
      agents: defaultAgents,
      isRunning: false,
      currentStep: 0,
      totalSteps: 0,
      results: {},

      // Criar novo workflow
      createWorkflow: (name: string, description: string) => {
        const newWorkflow: Workflow = {
          id: `workflow-${Date.now()}`,
          name,
          description,
          nodes: [],
          edges: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set(state => ({
          workflows: [...state.workflows, newWorkflow],
          currentWorkflow: newWorkflow,
        }));
      },

      // Carregar workflow
      loadWorkflow: (id: string) => {
        const workflow = get().workflows.find(w => w.id === id);
        if (workflow) {
          set({ currentWorkflow: workflow });
        }
      },

      // Atualizar workflow
      updateWorkflow: (workflow: Workflow) => {
        set(state => ({
          workflows: state.workflows.map(w =>
            w.id === workflow.id ? { ...workflow, updatedAt: new Date() } : w
          ),
          currentWorkflow:
            state.currentWorkflow?.id === workflow.id
              ? { ...workflow, updatedAt: new Date() }
              : state.currentWorkflow,
        }));
      },

      // Deletar workflow
      deleteWorkflow: (id: string) => {
        set(state => ({
          workflows: state.workflows.filter(w => w.id !== id),
          currentWorkflow:
            state.currentWorkflow?.id === id ? null : state.currentWorkflow,
        }));
      },

      // Adicionar nó
      addNode: (node: WorkflowNode) => {
        const { currentWorkflow } = get();
        if (currentWorkflow) {
          const updated = {
            ...currentWorkflow,
            nodes: [...currentWorkflow.nodes, node],
          };
          get().updateWorkflow(updated);
        }
      },

      // Atualizar nó
      updateNode: (id: string, data: Partial<WorkflowNode>) => {
        const { currentWorkflow } = get();
        if (currentWorkflow) {
          const updated = {
            ...currentWorkflow,
            nodes: currentWorkflow.nodes.map(node =>
              node.id === id ? { ...node, ...data } : node
            ),
          };
          get().updateWorkflow(updated);
        }
      },

      // Remover nó
      removeNode: (id: string) => {
        const { currentWorkflow } = get();
        if (currentWorkflow) {
          const updated = {
            ...currentWorkflow,
            nodes: currentWorkflow.nodes.filter(node => node.id !== id),
            edges: currentWorkflow.edges.filter(
              edge => edge.source !== id && edge.target !== id
            ),
          };
          get().updateWorkflow(updated);
        }
      },

      // Adicionar conexão
      addEdge: (edge: WorkflowEdge) => {
        const { currentWorkflow } = get();
        if (currentWorkflow) {
          const updated = {
            ...currentWorkflow,
            edges: [...currentWorkflow.edges, edge],
          };
          get().updateWorkflow(updated);
        }
      },

      // Remover conexão
      removeEdge: (id: string) => {
        const { currentWorkflow } = get();
        if (currentWorkflow) {
          const updated = {
            ...currentWorkflow,
            edges: currentWorkflow.edges.filter(edge => edge.id !== id),
          };
          get().updateWorkflow(updated);
        }
      },

      // Iniciar execução do workflow
      startWorkflow: async () => {
        const { currentWorkflow, agents } = get();
        if (!currentWorkflow) return;

        set({
          isRunning: true,
          currentStep: 0,
          totalSteps: currentWorkflow.nodes.length,
          results: {},
        });

        // Simular execução (TODO: implementar execução real)
        for (let i = 0; i < currentWorkflow.nodes.length; i++) {
          const node = currentWorkflow.nodes[i];
          
          if (node.type === 'agent' && node.agentId) {
            // Marcar agente como trabalhando
            get().updateAgentStatus(node.agentId, 'working', 0);

            // Simular progresso
            for (let progress = 0; progress <= 100; progress += 20) {
              await new Promise(resolve => setTimeout(resolve, 500));
              get().updateAgentStatus(node.agentId!, 'working', progress);
            }

            // Marcar como concluído
            get().updateAgentStatus(node.agentId, 'done', 100);
            get().setResult(node.id, { success: true, data: 'Mock result' });
          }

          set(state => ({ currentStep: i + 1 }));
        }

        set({ isRunning: false });
      },

      // Parar execução
      stopWorkflow: () => {
        set({
          isRunning: false,
          agents: get().agents.map(agent => ({ ...agent, status: 'idle' })),
        });
      },

      // Atualizar status do agente
      updateAgentStatus: (agentId: string, status: Agent['status'], progress?: number) => {
        set(state => ({
          agents: state.agents.map(agent =>
            agent.id === agentId ? { ...agent, status, progress } : agent
          ),
        }));
      },

      // Definir resultado
      setResult: (nodeId: string, result: any) => {
        set(state => ({
          results: { ...state.results, [nodeId]: result },
        }));
      },

      // Habilitar/desabilitar agente
      toggleAgent: (agentId: string) => {
        set(state => ({
          agents: state.agents.map(agent =>
            agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent
          ),
        }));
      },

      // Atualizar configuração do agente
      updateAgentConfig: (agentId: string, config: Partial<Agent>) => {
        set(state => ({
          agents: state.agents.map(agent =>
            agent.id === agentId ? { ...agent, ...config } : agent
          ),
        }));
      },
    }),
    {
      name: 'workflow-storage',
      partialize: (state) => ({
        workflows: state.workflows,
        agents: state.agents,
      }),
    }
  )
);
