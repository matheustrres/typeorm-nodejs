import { NextFunction, Request, Response } from 'express';

import { AuthProvider } from '@/src/shared/container/providers/auth.provider';

export const AuthMiddleware = (request: Partial<Request>, response: Partial<Response>, next: NextFunction): Response|void => {
  const tokenInHeader: string = request.headers.authorization;

  if (!tokenInHeader) {
    return response
      .status?.(401)
      .send({
        code: 401,
        error: 'Invalid token'
      });
  }
  
  const [, token] = tokenInHeader.split(' ');
  
  try {
    const { accountType, sub } = AuthProvider.decodeToken(token);

    request.userId = sub;
    request.userAccountType = accountType;
    
    return next();
  } catch (error) {
    if (error instanceof Error) {
      response
        .status?.(401)
        .send({
          code: 401,
          error: error.message
        });
    } else {
      response
        .status?.(401)
        .send({
          code: 401,
          error: 'Unknown auth error'
        });
    }
  }
}