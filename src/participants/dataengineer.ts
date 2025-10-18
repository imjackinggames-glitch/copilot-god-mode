import { Participant, ParticipantContext } from '../types/participant';
import * as vscode from 'vscode';

/**
 * DataEngineer Participant
 * Responsible for data pipelines, ETL, and database management.
 */
export class DataEngineer implements Participant {
  readonly id = 'dataengineer';
  readonly name = 'DataEngineer';
  readonly description = 'Manages data pipelines, ETL, and database operations.';

  async handle(context: ParticipantContext): Promise<void> {
    // TODO: Implement data engineering logic
    context.logger.info(`[DataEngineer] Managing data pipelines...`);
    // ...data engineering logic...
  }
}

export default DataEngineer;

export class DataEngineerParticipant {
  private participant: vscode.ChatParticipant;
  constructor(private context: vscode.ExtensionContext) {
    this.participant = vscode.chat.createChatParticipant(
      'copilot-god-mode.dataengineer',
      this.handleRequest.bind(this)
    );
    this.participant.iconPath = vscode.Uri.joinPath(
      context.extensionUri,
      'assets',
      'dataengineer-icon.png'
    );
  }
  private async handleRequest(
    request: vscode.ChatRequest,
    _chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    _token: vscode.CancellationToken
  ): Promise<vscode.ChatResult> {
    const logic = new DataEngineer();
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
