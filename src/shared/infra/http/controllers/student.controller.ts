import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Middleware,
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { StudentService } from '@/src/services/student.service';

import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';

@Controller('students')
export class StudentController extends BaseController {
  constructor(private service: StudentService) {
    super();
  }
  
  @Get('me')
  @Middleware(AuthMiddleware)
  public async me(request: Request, response: Response): Promise<Response> {
    try {
      const userId: string = request.userId;
      const me: StudentEntity = await this.service.findById(userId);
      
      return response.status(200).send(me);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}