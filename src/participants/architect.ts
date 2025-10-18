import { Participant, ParticipantContext } from '../types/participant';
import * as vscode from 'vscode';

/**
 * Architect Participant
 * Responsible for defining scalable, maintainable, and secure architectures.
 */
export class Architect implements Participant {
  readonly id = 'architect';
  readonly name = 'Architect';
  readonly description = 'Defines scalable, maintainable, and secure architectures.';

  async handle(context: ParticipantContext): Promise<void> {
    // TODO: Implement architecture definition logic
    context.logger.info(`[Architect] Architecting the solution...`);
    // ...architecture logic...
  }
}

export default Architect;

/**
 * VS Code Chat participant wrapper for Architect
 */
export class ArchitectParticipant {
  private participant: vscode.ChatParticipant;

  constructor(private context: vscode.ExtensionContext) {
    this.participant = vscode.chat.createChatParticipant(
      'copilot-god-mode.architect',
      this.handleRequest.bind(this)
    );

    this.participant.iconPath = vscode.Uri.joinPath(
      context.extensionUri,
      'assets',
      'architect-icon.png'
    );
  }

  private async handleRequest(
    request: vscode.ChatRequest,
    _chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    _token: vscode.CancellationToken
  ): Promise<vscode.ChatResult> {
    const logic = new Architect();

    const logger = {
      info: (msg: string) => stream.markdown(`${msg}\n`),
      warn: (msg: string) => stream.markdown(`> ⚠️ ${msg}\n`),
      error: (msg: string) => stream.markdown(`> ❌ ${msg}\n`),
    };

    const ctx: ParticipantContext = {
      message: request.prompt,
      memory: {},
      logger,
    };

    stream.markdown('## 🏗️ Architect\n');
    await logic.handle(ctx);

    return { metadata: {} };
  }

  public register(): vscode.Disposable {
    return this.participant;
  }
}
