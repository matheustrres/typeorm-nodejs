import { NextFunction, Request, Response } from 'express';

import { ProfileService } from '@/src/services/profile.service';

export const AdminMiddleware = async (request: Partial<Request>, response: Partial<Response>, next: NextFunction): Promise<Response|void> => {
  const profileService = new ProfileService();
  
  const userId: string = request.userId;
  const profile = await profileService.findById(userId);
  
  if (profile.accountType !== 'admin') {
    return response
      .status?.(401)
      .send({
        code: 401,
        error: 'Insufficient permissions'
      });
  }
  
  next();
}