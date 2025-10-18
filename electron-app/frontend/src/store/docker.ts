import { create } from 'zustand';

interface DockerContainer {
  name: string;
  state: string;
  status: string;
}

interface DockerState {
  // Estado
  running: boolean;
  containers: DockerContainer[];
  loading: boolean;
  error: string | null;
  lastChecked: Date | null;

  // Ações
  checkStatus: () => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useDockerStore = create<DockerState>((set, get) => ({
  // Estado inicial
  running: false,
  containers: [],
  loading: false,
  error: null,
  lastChecked: null,

  // Verificar status do Docker
  checkStatus: async () => {
    set({ loading: true, error: null });

    try {
      const status = await window.electron.docker.getStatus();
      set({
        running: status.running,
        containers: status.containers,
        lastChecked: new Date(),
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to check Docker status',
        loading: false,
      });
    }
  },

  // Iniciar containers Docker
  start: async () => {
    set({ loading: true, error: null });

    try {
      await window.electron.docker.start();
      
      // Aguardar 2 segundos e verificar status
      await new Promise(resolve => setTimeout(resolve, 2000));
      await get().checkStatus();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start Docker',
        loading: false,
      });
    }
  },

  // Parar containers Docker
  stop: async () => {
    set({ loading: true, error: null });

    try {
      await window.electron.docker.stop();
      
      // Aguardar 1 segundo e verificar status
      await new Promise(resolve => setTimeout(resolve, 1000));
      await get().checkStatus();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to stop Docker',
        loading: false,
      });
    }
  },

  // Definir erro
  setError: (error: string | null) => {
    set({ error });
  },
}));
