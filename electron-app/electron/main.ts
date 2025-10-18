/**
 * Electron Main Process
 * Gerencia janela principal, IPC, e integração com sistema
 */

import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class MainProcess {
  private mainWindow: BrowserWindow | null = null;
  private isDev = process.env.NODE_ENV === 'development';

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    // Registrar handlers antes do app estar pronto
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => this.onWindowAllClosed());
    app.on('activate', () => this.onActivate());
  }

  private async onReady(): Promise<void> {
    // Criar janela principal primeiro
    this.createMainWindow();

    // Configurar menu
    this.setupMenu();

    // Registrar IPC handlers
    this.setupIPC();

    // Temporarily disabled Docker to debug UI issues
    // this.checkDockerSetup().catch(err => {
    //   console.warn('⚠️ Docker not available, running in standalone mode:', err.message);
    // });
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1024,
      minHeight: 768,
      backgroundColor: '#0a0a0a',
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#0a0a0a',
        symbolColor: '#ffffff',
        height: 40
      },
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        webSecurity: true,
        allowRunningInsecureContent: false
      },
      show: false, // Não mostrar até estar pronta
      frame: true,
      autoHideMenuBar: true
    });

    // Carregar URL baseado no ambiente
    if (this.isDev) {
      this.mainWindow.loadURL('http://localhost:5173');
      // Temporarily disabled to debug dragEvent error
      // this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../frontend/index.html'));
    }

    // Mostrar quando pronta
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    // Cleanup on close
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private setupMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New Workflow',
            accelerator: 'CmdOrCtrl+N',
            click: () => this.mainWindow?.webContents.send('menu:new-workflow')
          },
          {
            label: 'Open Workflow',
            accelerator: 'CmdOrCtrl+O',
            click: () => this.handleOpenWorkflow()
          },
          {
            label: 'Save Workflow',
            accelerator: 'CmdOrCtrl+S',
            click: () => this.mainWindow?.webContents.send('menu:save-workflow')
          },
          { type: 'separator' },
          {
            label: 'Export',
            submenu: [
              {
                label: 'Export as Markdown',
                click: () => this.mainWindow?.webContents.send('menu:export', 'markdown')
              },
              {
                label: 'Export as PDF',
                click: () => this.mainWindow?.webContents.send('menu:export', 'pdf')
              },
              {
                label: 'Export as PowerPoint',
                click: () => this.mainWindow?.webContents.send('menu:export', 'pptx')
              }
            ]
          },
          { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectAll' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'Agents',
        submenu: [
          {
            label: 'View All Agents',
            accelerator: 'CmdOrCtrl+Shift+A',
            click: () => this.mainWindow?.webContents.send('menu:agents')
          },
          { type: 'separator' },
          {
            label: 'Restart Agent System',
            click: () => this.handleRestartAgents()
          },
          {
            label: 'View Agent Logs',
            click: () => this.handleViewLogs()
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Documentation',
            click: () => this.mainWindow?.webContents.send('menu:docs')
          },
          {
            label: 'Keyboard Shortcuts',
            accelerator: 'CmdOrCtrl+/',
            click: () => this.mainWindow?.webContents.send('menu:shortcuts')
          },
          { type: 'separator' },
          {
            label: 'About',
            click: () => this.handleAbout()
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  private setupIPC(): void {
    // Database operations
    ipcMain.handle('db:query', async (event, query: string, params?: any[]) => {
      return this.handleDatabaseQuery(query, params);
    });

    // Docker agent management
    ipcMain.handle('docker:status', async () => {
      return this.getDockerStatus();
    });

    ipcMain.handle('docker:start', async () => {
      return this.startDockerAgents();
    });

    ipcMain.handle('docker:stop', async () => {
      return this.stopDockerAgents();
    });

    // File system operations
    ipcMain.handle('fs:save', async (event, filePath: string, content: string) => {
      return this.handleFileSave(filePath, content);
    });

    ipcMain.handle('fs:read', async (event, filePath: string) => {
      return this.handleFileRead(filePath);
    });

    ipcMain.handle('fs:dialog', async (event, options: Electron.SaveDialogOptions | Electron.OpenDialogOptions) => {
      if ('title' in options && options.title?.includes('Save')) {
        return dialog.showSaveDialog(this.mainWindow!, options as Electron.SaveDialogOptions);
      } else {
        return dialog.showOpenDialog(this.mainWindow!, options as Electron.OpenDialogOptions);
      }
    });

    // System info
    ipcMain.handle('system:info', async () => {
      return {
        platform: process.platform,
        arch: process.arch,
        version: app.getVersion(),
        electronVersion: process.versions.electron,
        nodeVersion: process.versions.node
      };
    });

    // Encryption operations
    ipcMain.handle('crypto:encrypt', async (event, data: string, password: string) => {
      // Implementar criptografia AES-256
      // TODO: Implementar com node-crypto
      return { encrypted: data };
    });

    ipcMain.handle('crypto:decrypt', async (event, encrypted: string, password: string) => {
      // Implementar descriptografia
      // TODO: Implementar com node-crypto
      return { decrypted: encrypted };
    });
  }

  private async checkDockerSetup(): Promise<void> {
    try {
      const { stdout } = await execAsync('docker --version');
      console.log('✅ Docker detected:', stdout.trim());

      // Verificar se Docker Compose está disponível
      const { stdout: composeVersion } = await execAsync('docker-compose --version');
      console.log('✅ Docker Compose detected:', composeVersion.trim());

      // Verificar se containers estão rodando
      const status = await this.getDockerStatus();
      if (!status.running) {
        console.log('⚠️ Docker agents not running. Starting...');
        await this.startDockerAgents();
      }
    } catch (error) {
      console.warn('⚠️ Docker not available, running in standalone mode');
      // Não mostrar erro - apenas avisar no console
      // A aplicação pode funcionar sem Docker para testes de UI
    }
  }

  private async getDockerStatus(): Promise<{ running: boolean; containers: any[] }> {
    try {
      // docker-compose.yml está na raiz do projeto, não em electron-app/agents
      const projectRoot = path.join(app.getAppPath(), '..');
      const composePath = path.join(projectRoot, 'docker-compose.yml');
      const { stdout } = await execAsync(
        `docker compose -f "${composePath}" ps --format json`
      );

      const containers = stdout
        .trim()
        .split('\n')
        .filter(line => line)
        .map(line => JSON.parse(line));

      const running = containers.length > 0 && containers.every(c => c.State === 'running');

      return { running, containers };
    } catch (error) {
      return { running: false, containers: [] };
    }
  }

  private async startDockerAgents(): Promise<void> {
    try {
      // docker-compose.yml está na raiz do projeto, não em electron-app/agents
      const projectRoot = path.join(app.getAppPath(), '..');
      const composePath = path.join(projectRoot, 'docker-compose.yml');
      await execAsync(`docker compose -f "${composePath}" up -d`);
      console.log('✅ Docker agents started');
    } catch (error) {
      console.error('❌ Failed to start Docker agents:', error);
      throw error;
    }
  }

  private async stopDockerAgents(): Promise<void> {
    try {
      // docker-compose.yml está na raiz do projeto, não em electron-app/agents
      const projectRoot = path.join(app.getAppPath(), '..');
      const composePath = path.join(projectRoot, 'docker-compose.yml');
      await execAsync(`docker compose -f "${composePath}" down`);
      console.log('✅ Docker agents stopped');
    } catch (error) {
      console.error('❌ Failed to stop Docker agents:', error);
      throw error;
    }
  }

  private async handleDatabaseQuery(query: string, params?: any[]): Promise<any> {
    // TODO: Implementar com better-sqlite3
    console.log('Database query:', query, params);
    return { rows: [] };
  }

  private async handleFileSave(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, 'utf-8');
  }

  private async handleFileRead(filePath: string): Promise<string> {
    return fs.readFile(filePath, 'utf-8');
  }

  private async handleOpenWorkflow(): Promise<void> {
    const result = await dialog.showOpenDialog(this.mainWindow!, {
      title: 'Open Workflow',
      filters: [
        { name: 'Workflow Files', extensions: ['cgm', 'json'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const content = await this.handleFileRead(result.filePaths[0]);
      this.mainWindow?.webContents.send('workflow:load', JSON.parse(content));
    }
  }

  private async handleRestartAgents(): Promise<void> {
    await this.stopDockerAgents();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.startDockerAgents();

    dialog.showMessageBox(this.mainWindow!, {
      type: 'info',
      title: 'Agents Restarted',
      message: 'All agents have been successfully restarted.'
    });
  }

  private async handleViewLogs(): Promise<void> {
    this.mainWindow?.webContents.send('menu:logs');
  }

  private handleAbout(): void {
    dialog.showMessageBox(this.mainWindow!, {
      type: 'info',
      title: 'About Copilot God Mode',
      message: 'Copilot God Mode',
      detail: `Version: ${app.getVersion()}\n\nAI-powered multi-agent system for perfect documentation and prompts.\n\n© 2025 imjackinggames-glitch`
    });
  }

  private onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate(): void {
    if (this.mainWindow === null) {
      this.createMainWindow();
    }
  }
}

// Inicializar aplicação
new MainProcess();
