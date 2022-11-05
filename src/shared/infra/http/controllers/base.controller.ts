import { Response } from 'express';

import { ApiError, ApiErrorProps } from '@/src/shared/utils/errors/api.error';
import { 
  DatabaseError, 
  DatabaseUnknownClientError, 
  DatabaseValidationError 
} from '@/src/shared/utils/errors/database.error';

import { Logger } from '@/src/shared/utils/logger';

interface ErrorResponse {
  code: number;
  error: string;
  description?: string;
}

export class BaseController {
  private logger: Logger;

  constructor() {
    this.logger = Logger.it(this.constructor.name);
  }

  protected sendErrorResponse(response: Response, error: any): Response {
    if (
      error instanceof DatabaseValidationError ||
      error instanceof DatabaseUnknownClientError
    ) {
      const {
        code,
        error: message,
        description
      }: ErrorResponse = this.handleClientErrors(error);

      return this.createErrorResponse(response, {
        code,
        message,
        description
      });
    }

    this.logger.error('Internal error: ', error);

    return this.createErrorResponse(response, {
      code: 500,
      message: 'Something went wrong'
    });
  }

  private createErrorResponse(response: Response, apiError: ApiErrorProps): Response {
    return response.status(apiError.code).send(
      ApiError.format(
        apiError
      )
    );
  }

  private handleClientErrors(error: DatabaseError): ErrorResponse {
    if (error instanceof DatabaseValidationError) {
      return {
        code: 409,
        error: error.message,
        description: error.description
      }
    }

    return {
      code: 400,
      error: error.message,
      description: error.description
    }
  }
}