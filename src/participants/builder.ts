import { Participant, ParticipantContext } from '../types/participant';
import * as vscode from 'vscode';

/**
 * Builder Participant
 * Responsible for code generation, scaffolding, and implementation.
 */
export class Builder implements Participant {
  readonly id = 'builder';
  readonly name = 'Builder';
  readonly description = 'Generates code, scaffolds projects, and implements features.';

  async handle(context: ParticipantContext): Promise<void> {
    // TODO: Implement code generation and scaffolding logic
    context.logger.info(`[Builder] Building code and features...`);
    // ...build logic...
  }
}

export default Builder;

export class BuilderParticipant {
  private participant: vscode.ChatParticipant;
  constructor(private context: vscode.ExtensionContext) {
    this.participant = vscode.chat.createChatParticipant(
      'copilot-god-mode.builder',
      this.handleRequest.bind(this)
    );
    this.participant.iconPath = vscode.Uri.joinPath(
      context.extensionUri,
      'assets',
      'builder-icon.png'
    );
  }
  private async handleRequest(
    request: vscode.ChatRequest,
    _chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    _token: vscode.CancellationToken
  ): Promise<vscode.ChatResult> {
    const logic = new Builder();
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
