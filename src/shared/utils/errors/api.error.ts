import httpStatusCodes from 'http-status-codes';

export interface ApiErrorProps {
  code: number;
  message: string;
  codeAsString?: string;
}

export interface ApiErrorResponse extends Omit<ApiErrorProps, 'codeAsString'> {
  error: string;
}

export class ApiError {
  public static format(error: ApiErrorProps): ApiErrorResponse {
    return {
      ...{
        code: error.code,
        message: error.message,
        error: httpStatusCodes.getStatusText(error.code)
      }
    }
  }
}