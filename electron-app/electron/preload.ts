/**
 * Electron Preload Script
 * Expõe APIs seguras para o renderer process via contextBridge
 */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Tipos para as APIs expostas
export interface ElectronAPI {
  // Database
  db: {
    query: (query: string, params?: any[]) => Promise<any>;
  };

  // Docker
  docker: {
    getStatus: () => Promise<{ running: boolean; containers: any[] }>;
    start: () => Promise<void>;
    stop: () => Promise<void>;
  };

  // File System
  fs: {
    save: (filePath: string, content: string) => Promise<void>;
    read: (filePath: string) => Promise<string>;
    showSaveDialog: (options: any) => Promise<any>;
    showOpenDialog: (options: any) => Promise<any>;
  };

  // System
  system: {
    getInfo: () => Promise<{
      platform: string;
      arch: string;
      version: string;
      electronVersion: string;
      nodeVersion: string;
    }>;
  };

  // Crypto
  crypto: {
    encrypt: (data: string, password: string) => Promise<{ encrypted: string }>;
    decrypt: (encrypted: string, password: string) => Promise<{ decrypted: string }>;
  };

  // Events
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void;
  off: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void;
  send: (channel: string, ...args: any[]) => void;
}

// Lista de canais permitidos para comunicação
const ALLOWED_CHANNELS = [
  'menu:new-workflow',
  'menu:save-workflow',
  'menu:export',
  'menu:agents',
  'menu:docs',
  'menu:shortcuts',
  'menu:logs',
  'workflow:load',
];

// Expor APIs seguras via contextBridge
const electronAPI: ElectronAPI = {
  db: {
    query: (query: string, params?: any[]) => 
      ipcRenderer.invoke('db:query', query, params),
  },

  docker: {
    getStatus: () => ipcRenderer.invoke('docker:status'),
    start: () => ipcRenderer.invoke('docker:start'),
    stop: () => ipcRenderer.invoke('docker:stop'),
  },

  fs: {
    save: (filePath: string, content: string) => 
      ipcRenderer.invoke('fs:save', filePath, content),
    read: (filePath: string) => 
      ipcRenderer.invoke('fs:read', filePath),
    showSaveDialog: (options: any) => 
      ipcRenderer.invoke('fs:dialog', { ...options, title: 'Save' }),
    showOpenDialog: (options: any) => 
      ipcRenderer.invoke('fs:dialog', options),
  },

  system: {
    getInfo: () => ipcRenderer.invoke('system:info'),
  },

  crypto: {
    encrypt: (data: string, password: string) => 
      ipcRenderer.invoke('crypto:encrypt', data, password),
    decrypt: (encrypted: string, password: string) => 
      ipcRenderer.invoke('crypto:decrypt', encrypted, password),
  },

  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    if (ALLOWED_CHANNELS.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }
  },

  off: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    if (ALLOWED_CHANNELS.includes(channel)) {
      ipcRenderer.off(channel, callback);
    }
  },

  send: (channel: string, ...args: any[]) => {
    if (ALLOWED_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },
};

// Expor API para o renderer
contextBridge.exposeInMainWorld('electron', electronAPI);

// Tipos globais para TypeScript no renderer
declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
