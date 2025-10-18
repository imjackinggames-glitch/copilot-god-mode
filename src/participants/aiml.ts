import { Participant, ParticipantContext } from '../types/participant';
import * as vscode from 'vscode';

/**
 * AIML Participant
 * Responsible for AI/ML code, model integration, and data science workflows.
 */
export class AIML implements Participant {
  readonly id = 'aiml';
  readonly name = 'AIML';
  readonly description = 'Handles AI/ML code, model integration, and data science workflows.';

  async handle(context: ParticipantContext): Promise<void> {
    // TODO: Implement AI/ML logic
    context.logger.info(`[AIML] Integrating AI/ML models...`);
    // ...AI/ML logic...
  }
}

export default AIML;

export class AIMLParticipant {
  private participant: vscode.ChatParticipant;
  constructor(private context: vscode.ExtensionContext) {
    this.participant = vscode.chat.createChatParticipant(
      'copilot-god-mode.aiml',
      this.handleRequest.bind(this)
    );
    this.participant.iconPath = vscode.Uri.joinPath(
      context.extensionUri,
      'assets',
      'aiml-icon.png'
    );
  }
  private async handleRequest(
    request: vscode.ChatRequest,
    _chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    _token: vscode.CancellationToken
  ): Promise<vscode.ChatResult> {
    const logic = new AIML();
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
