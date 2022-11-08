import { Request, Response } from 'express';
import { Controller, Middleware, Post } from '@overnightjs/core';

import { BaseController } from './base.controller';

import { StudentService } from '@/src/services/student.service';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';
import { AccountMiddleware } from '@/src/shared/infra/http/middlewares/account.middleware';

@Controller('students')
export class StudentController extends BaseController {
  constructor(private service: StudentService) {
    super();
  }
  
  @Post('enroll/:subjectId')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.STUDENT)
  ])
  public async enrollStudentInASubject(request: Request, response: Response): Promise<Response> {
    try {
      const studentId: string = request.profileStudentId;
      const subjectId: string = request.params.subjectId;
      
      await this.service.enrollStudentInASubject(studentId, subjectId);
      
      return response.status(201).send({
        code: 200,
        message: 'Subject enrollment successfully made'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Post('enroll/:subjectId/cancel')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.STUDENT)
  ])
  public async removeStudentSubjectEnrollment(request: Request, response: Response): Promise<Response> {
    try {
      const studentId: string = request.profileStudentId;
      const subjectId: string = request.params.subjectId;
      
      await this.service.removeStudentSubjectEnrollment(studentId, subjectId);
      
      return response.status(200).send({
        code: 200,
        message: 'Subject enrollment successfully canceled'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}