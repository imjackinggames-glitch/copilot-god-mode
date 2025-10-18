/**
 * Participant interface for chat agents.
 */
export interface Participant {
  /** Unique participant ID (e.g., 'analyzer', 'designer', etc.) */
  readonly id: string;
  /** Human-readable name */
  readonly name: string;
  /** Short description of the participant's role */
  readonly description: string;
  /** Main handler for participant logic */
  handle(context: ParticipantContext): Promise<void>;
}

/**
 * Context passed to each participant for processing.
 */
export interface ParticipantContext {
  /** The current user message or command */
  message: string;
  /** Shared memory or state object */
  memory: Record<string, unknown>;
  /** Logger for structured output */
  logger: {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
  };
  /** Any additional context needed */
  [key: string]: unknown;
}
