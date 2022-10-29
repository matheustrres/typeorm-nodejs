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
  
  @Get('me/:id')
  public async me(request: Request, response: Response): Promise<Response> {
    try {
      // the id will be retrieved from the JWT later on
      const id = request.params.id;
      const me: StudentEntity = await this.service.findById(id);
      
      return response.status(200).send(me);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
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
  
  @Post('auth')
  public async authenticate(request: Request, response: Response): Promise<Response> {
    try {
      const email: string = request.body.email;
      const password: string = request.body.password;
      
      const token = await this.service.authenticate(email, password);
      
      return response.status(200).send({ token });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}