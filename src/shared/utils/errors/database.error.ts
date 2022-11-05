export type ErrorType = 'DUPLICATED' | 'INVALID' | 'UNKNOWN';

interface ErrorOptions {
  description?: string;
  type?: ErrorType;
}

export class DatabaseError extends Error {
  public readonly message: string;
  public readonly description?: string;
  public readonly type: ErrorType; 

  constructor(message: string, options?: ErrorOptions) {
    super(message);

    this.message = message;
    this.description = options.description;
    this.type = options.type;
  }
}

export class DatabaseInternalError extends DatabaseError {}

export class DatabaseValidationError extends DatabaseError {}

export class DatabaseUnknownClientError extends DatabaseError {}