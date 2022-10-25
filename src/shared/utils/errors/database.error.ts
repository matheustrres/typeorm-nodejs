export type ErrorType = 'DUPLICATED' | 'INVALID' | 'UNKNOWN';

export class DatabaseError extends Error {
  public readonly message: string;
  public readonly type: ErrorType; 

  constructor(message: string, type?: ErrorType) {
    super(message);

    this.message = message;
    this.type = type;
  }
}

export class DatabaseInternalError extends DatabaseError {}

export class DatabaseValidationError extends DatabaseError {}

export class DatabaseUnknownClientError extends DatabaseError {}