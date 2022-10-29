import { NextFunction, Request, Response } from 'express';

import { AuthProvider } from '@/src/shared/container/providers/auth.provider';

export const AuthMiddleware = (request: Partial<Request>, response: Partial<Response>, next: NextFunction): void => {
  const tokenInHeader: string = request.headers.authorization;
  const [, token] = tokenInHeader.split(' ');
  
  try {
    const { sub } = AuthProvider.decodeToken(token);
    
    request.userId = sub;
    
    next();
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