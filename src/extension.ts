import * as vscode from 'vscode';
import { AnalyzerParticipant } from './participants/analyzer';
import { DesignerParticipant } from './participants/designer';
import { ArchitectParticipant } from './participants/architect';
import { SecurityParticipant } from './participants/security';
import { AIMLParticipant } from './participants/aiml';
import { PerformanceParticipant } from './participants/performance';
import { IntegrationParticipant } from './participants/integration';
import { DataEngineerParticipant } from './participants/dataengineer';
import { BuilderParticipant } from './participants/builder';
import * as cp from 'child_process';
import * as path from 'path';
import axios from 'axios';

/**
 * 🌌 COPILOT GOD MODE v5.0 - VS Code Extension
 * Entry point - Registra os chat participants
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('🌌 Copilot God Mode is now active!');

    try {
        // ═══════════════════════════════════════════════════════════
        // REGISTER CHAT PARTICIPANTS
        // ═══════════════════════════════════════════════════════════

        // 1. @analyzer - Omniscient Oracle
        const analyzer = new AnalyzerParticipant(context);
        context.subscriptions.push(analyzer.register());
        console.log('✅ @analyzer registered');

        // 2. @designer - Aesthetic Genius
        const designer = new DesignerParticipant(context);
        context.subscriptions.push(designer.register());
        console.log('✅ @designer registered');

    // 3. @architect - System Master
    const architect = new ArchitectParticipant(context);
    context.subscriptions.push(architect.register());
    console.log('✅ @architect registered');

    // 4. @security - Guardian Absolute
    const security = new SecurityParticipant(context);
    context.subscriptions.push(security.register());
    console.log('✅ @security registered');

    // 5. @aiml - Intelligence Architect
    const aiml = new AIMLParticipant(context);
    context.subscriptions.push(aiml.register());
    console.log('✅ @aiml registered');

    // 6. @performance - Speed Demon
    const performance = new PerformanceParticipant(context);
    context.subscriptions.push(performance.register());
    console.log('✅ @performance registered');

    // 7. @integration - Connection Master
    const integration = new IntegrationParticipant(context);
    context.subscriptions.push(integration.register());
    console.log('✅ @integration registered');

    // 8. @dataengineer - Data Wizard
    const dataEngineer = new DataEngineerParticipant(context);
    context.subscriptions.push(dataEngineer.register());
    console.log('✅ @dataengineer registered');

    // 9. @builder - Code Deity
    const builder = new BuilderParticipant(context);
    context.subscriptions.push(builder.register());
    console.log('✅ @builder registered');

        // Show welcome message
        showWelcomeMessage(context);

        // Register extension commands
        registerCommands(context);

        console.log('🎉 Chat participants registered successfully!');
    } catch (error) {
        console.error('❌ Error activating Copilot God Mode:', error);
        vscode.window.showErrorMessage(
            `Copilot God Mode activation failed: ${error}`
        );
    }
}

/**
 * Show welcome message to first-time users
 */
function showWelcomeMessage(context: vscode.ExtensionContext) {
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            '🌌 Welcome to Copilot God Mode! AI agents ready to build anything.',
            'Open Documentation',
            'Got it'
        ).then(selection => {
            if (selection === 'Open Documentation') {
                vscode.env.openExternal(
                    vscode.Uri.parse('https://github.com/imjackinggames-glitch/copilot-god-mode#readme')
                );
            }
        });
        
        context.globalState.update('hasShownWelcome', true);
    }
}

export function deactivate() {
    console.log('👋 Copilot God Mode deactivated');
}

/**
 * Register extension commands declared in package.json
 */
function registerCommands(context: vscode.ExtensionContext) {
    const output = vscode.window.createOutputChannel('Copilot God Mode');

    const runShell = async (command: string, cwd?: string) => {
        return new Promise<void>((resolve, reject) => {
            output.appendLine(`$ ${command}`);
            const child = cp.spawn(command, {
                shell: true,
                cwd: cwd ?? context.extensionUri.fsPath,
            });
            child.stdout.on('data', (d) => output.append(d.toString()));
            child.stderr.on('data', (d) => output.append(d.toString()));
            child.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`${command} exited with code ${code}`));
                }
            });
        });
    };

    const setupDisposable = vscode.commands.registerCommand(
        'copilot-god-mode.setupServices',
        async () => {
            output.show(true);
            try {
                // Pull latest images defined in docker-compose
                await runShell('docker-compose pull');
                vscode.window.showInformationMessage('God Mode: Services pulled successfully.');
            } catch (err) {
                vscode.window.showErrorMessage(`Setup failed: ${err}`);
            }
        }
    );

    const startDisposable = vscode.commands.registerCommand(
        'copilot-god-mode.startServices',
        async () => {
            output.show(true);
            try {
                await runShell('npm run start-services');
                vscode.window.showInformationMessage('God Mode: Services started.');
            } catch (err) {
                vscode.window.showErrorMessage(`Start failed: ${err}`);
            }
        }
    );

    const stopDisposable = vscode.commands.registerCommand(
        'copilot-god-mode.stopServices',
        async () => {
            output.show(true);
            try {
                await runShell('npm run stop-services');
                vscode.window.showInformationMessage('God Mode: Services stopped.');
            } catch (err) {
                vscode.window.showErrorMessage(`Stop failed: ${err}`);
            }
        }
    );

    const openDashboardDisposable = vscode.commands.registerCommand(
        'copilot-god-mode.openDashboard',
        async () => {
            // Open a simple webview showing service statuses
            const panel = vscode.window.createWebviewPanel(
                'godModeDashboard',
                'Copilot God Mode • Dashboard',
                vscode.ViewColumn.Active,
                { enableScripts: true }
            );

            const getConfig = (key: string, fallback?: string | boolean) =>
                vscode.workspace.getConfiguration('copilot-god-mode').get<string | boolean>(key, fallback as any);

            const ollamaUrl = String(getConfig('ollamaUrl', 'http://localhost:11434'));
            const sdUrl = String(getConfig('stableDiffusionUrl', 'http://localhost:7860'));
            const chromaUrl = String(getConfig('chromaUrl', 'http://localhost:8000'));

            const fetchStatuses = async () => {
                const checks: Array<{ name: string; url: string; up: boolean; details: string }> = [];
                const tryGet = async (name: string, url: string) => {
                    try {
                        const res = await axios.get(url, { timeout: 2500 }).catch(async (e) => {
                            // Some services require specific paths; try a common health path fallback
                            try {
                                return await axios.get(url.replace(/\/$/, '') + '/health', { timeout: 2500 });
                            } catch {
                                throw e;
                            }
                        });
                        checks.push({ name, url, up: res.status < 500, details: `${res.status} ${res.statusText}` });
                    } catch (e: any) {
                        checks.push({ name, url, up: false, details: e?.message ?? 'error' });
                    }
                };

                await Promise.all([
                    tryGet('Ollama', ollamaUrl),
                    tryGet('Stable Diffusion', sdUrl),
                    tryGet('Chroma DB', chromaUrl),
                ]);
                return checks;
            };

            const render = (rows: Array<{ name: string; url: string; up: boolean; details: string }>) => {
                const statusRows = rows
                    .map(
                        (r) => `
                        <tr>
                          <td>${r.name}</td>
                          <td><code>${r.url}</code></td>
                          <td style="color:${r.up ? '#16a34a' : '#dc2626'}">${r.up ? 'UP' : 'DOWN'}</td>
                          <td>${r.details}</td>
                        </tr>`
                    )
                    .join('');

                panel.webview.html = `
                  <!doctype html>
                  <html>
                    <head>
                      <meta charset="utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      <style>
                        body { font-family: system-ui, sans-serif; padding: 16px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 8px 12px; border-bottom: 1px solid #eee; }
                        h1 { margin-top: 0; }
                        .actions { margin: 12px 0; display: flex; gap: 8px; }
                        button { padding: 6px 12px; }
                      </style>
                    </head>
                    <body>
                      <h1>Copilot God Mode • Services</h1>
                      <div class="actions">
                        <button id="refresh">Refresh</button>
                        <button id="start">Start Services</button>
                        <button id="stop">Stop Services</button>
                      </div>
                      <table>
                        <thead>
                          <tr><th>Service</th><th>URL</th><th>Status</th><th>Details</th></tr>
                        </thead>
                        <tbody>
                          ${statusRows}
                        </tbody>
                      </table>
                      <script>
                        const vscode = acquireVsCodeApi();
                        document.getElementById('refresh').addEventListener('click', () => vscode.postMessage({ type: 'refresh' }));
                        document.getElementById('start').addEventListener('click', () => vscode.postMessage({ type: 'start' }));
                        document.getElementById('stop').addEventListener('click', () => vscode.postMessage({ type: 'stop' }));
                        window.addEventListener('message', event => {
                          const html = event.data && event.data.html;
                          if (html) document.body.innerHTML = html;
                        });
                      </script>
                    </body>
                  </html>`;
            };

            // Initial render
            const rows = await fetchStatuses();
            render(rows);

            panel.webview.onDidReceiveMessage(async (msg) => {
                if (msg?.type === 'refresh') {
                    const r = await fetchStatuses();
                    render(r);
                } else if (msg?.type === 'start') {
                    await vscode.commands.executeCommand('copilot-god-mode.startServices');
                    const r = await fetchStatuses();
                    render(r);
                } else if (msg?.type === 'stop') {
                    await vscode.commands.executeCommand('copilot-god-mode.stopServices');
                    const r = await fetchStatuses();
                    render(r);
                }
            });
        }
    );

    context.subscriptions.push(setupDisposable, startDisposable, stopDisposable, openDashboardDisposable);
}
