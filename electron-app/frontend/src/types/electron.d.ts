/**
 * Global type definitions for Electron API
 */

import { ElectronAPI } from '../electron/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
