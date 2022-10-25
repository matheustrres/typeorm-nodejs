export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseInternalError extends DatabaseError {}

export class DatabaseValidationError extends DatabaseError {}

export class DatabaseUnknownClientError extends DatabaseError {}