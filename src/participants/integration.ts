import { Participant, ParticipantContext } from '../types/participant';
import * as vscode from 'vscode';

/**
 * Integration Participant
 * Responsible for integrating external APIs, services, and tools.
 */
export class Integration implements Participant {
  readonly id = 'integration';
  readonly name = 'Integration';
  readonly description = 'Integrates external APIs, services, and tools.';

  async handle(context: ParticipantContext): Promise<void> {
    // TODO: Implement integration logic
    context.logger.info(`[Integration] Integrating external services...`);
    // ...integration logic...
  }
}

export default Integration;

export class IntegrationParticipant {
  private participant: vscode.ChatParticipant;
  constructor(private context: vscode.ExtensionContext) {
    this.participant = vscode.chat.createChatParticipant(
      'copilot-god-mode.integration',
      this.handleRequest.bind(this)
    );
    this.participant.iconPath = vscode.Uri.joinPath(
      context.extensionUri,
      'assets',
      'integration-icon.png'
    );
  }
  private async handleRequest(
    request: vscode.ChatRequest,
    _chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    _token: vscode.CancellationToken
  ): Promise<vscode.ChatResult> {
    const logic = new Integration();
    const logger = {
      info: (msg: string) => stream.markdown(`${msg}\n`),
      warn: (msg: string) => stream.markdown(`> ⚠️ ${msg}\n`),
      error: (msg: string) => stream.markdown(`> ❌ ${msg}\n`),
    };
    await logic.handle({ message: request.prompt, memory: {}, logger });
    return { metadata: {} };
  }
  public register(): vscode.Disposable { return this.participant; }
}
