import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Middleware,
  Post
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { SubjectService } from '@/src/services/subject.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';
import { AdminMiddleware } from '@/src/shared/infra/http/middlewares/admin.middleware';

@Controller('subjects')
export class SubjectController extends BaseController {
  constructor(private service: SubjectService) {
    super();
  }

  @Get(':id')
  @Middleware(AuthMiddleware)
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const subjectId: string = request.params.id;
      const subject: SubjectEntity = await this.service.findById(subjectId);

      return response.status(200).send(subject);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }

  @Post('')
  @Middleware([
    AuthMiddleware,
    AdminMiddleware
  ])
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateSubjectDto = request.body;
      const subjectRecord: SubjectEntity = await this.service.create(body);

      return response.status(201).send(subjectRecord);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Post('enroll/:subjectId')
  @Middleware(AuthMiddleware)
  public async createStudentSubjectEnrollment(request: Request, response: Response): Promise<Response> {
    try {
      const studentId: string = request.userId;
      const subjectId: string = request.params.subjectId;
      
      const enroll = await this.service.createStudentSubjectEnrollment(studentId, subjectId);
      
      return response.status(201).send(enroll);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Post('enroll/:subjectId/cancel')
  @Middleware(AuthMiddleware)
  public async cancelStudentSubjectEnrollment(request: Request, response: Response): Promise<Response> {
    try {
      const studentId: string = request.userId;
      const subjectId: string = request.params.subjectId;
  
      await this.service.cancelStudentSubjectEnrollment(studentId, subjectId);
  
      return response.status(200).send({
        code: 200,
        message: 'Enrollment successfully canceled'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}