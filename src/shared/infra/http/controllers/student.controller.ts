import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Post
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { StudentService } from '@/src/services/student.service';

import { CreateStudentDto } from '@/src/core/domain/dtos/student.dto';

@Controller('students')
export class StudentController extends BaseController {
  constructor(private service: StudentService) {
    super();
  }
  
  @Post('')
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateStudentDto = request.body;
      const student: StudentEntity = await this.service.create(body);
      
      return response.status(201).send(student);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}