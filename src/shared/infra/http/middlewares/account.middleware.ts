import { NextFunction, Request, Response } from 'express';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

export const AccountMiddleware = (accountType: ProfileAccountType) => {
  return (
    async (request: Partial<Request>, response: Partial<Response>, next: NextFunction): Promise<Response|void> => {
      const profileAccountType: string = request.userAccountType;
      
      if (profileAccountType !== accountType) {
        return response
          .status?.(401)
          .send({
            code: 401,
            error: `Insufficient permissions, account type not authorized`
          });
      }
      
      next();
    }
  );
}