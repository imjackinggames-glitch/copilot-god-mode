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

export function activate(context: vscode.ExtensionContext) {
    console.log('🌌 Copilot God Mode is now active!');

    // Register all 9 chat participants
    const participants = [
        new AnalyzerParticipant(context),
        new DesignerParticipant(context),
        new ArchitectParticipant(context),
        new SecurityParticipant(context),
        new AIMLParticipant(context),
        new PerformanceParticipant(context),
        new IntegrationParticipant(context),
        new DataEngineerParticipant(context),
        new BuilderParticipant(context)
    ];

    participants.forEach(participant => {
        context.subscriptions.push(participant.register());
    });

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-god-mode.setupServices', async () => {
            await setupServices();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-god-mode.startServices', async () => {
            await startServices();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-god-mode.stopServices', async () => {
            await stopServices();
        })
    );

    // Show welcome message
    showWelcomeMessage(context);
}

async function setupServices() {
    const terminal = vscode.window.createTerminal('God Mode Setup');
    terminal.show();
    terminal.sendText('bash scripts/setup.sh');
}

async function startServices() {
    const terminal = vscode.window.createTerminal('God Mode Services');
    terminal.show();
    terminal.sendText('docker-compose up -d');
    vscode.window.showInformationMessage('🚀 Starting all services...');
}

async function stopServices() {
    const terminal = vscode.window.createTerminal('God Mode Services');
    terminal.show();
    terminal.sendText('docker-compose down');
    vscode.window.showInformationMessage('🛑 Stopping all services...');
}

function showWelcomeMessage(context: vscode.ExtensionContext) {
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            '🌌 Welcome to Copilot God Mode! 9 omniscient AI agents ready to build anything.',
            'Setup Services',
            'Open Documentation'
        ).then(selection => {
            if (selection === 'Setup Services') {
                vscode.commands.executeCommand('copilot-god-mode.setupServices');
            } else if (selection === 'Open Documentation') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/imjackinggames-glitch/copilot-god-mode#readme'));
            }
        });
        
        context.globalState.update('hasShownWelcome', true);
    }
}

export function deactivate() {
    console.log('👋 Copilot God Mode deactivated');
}