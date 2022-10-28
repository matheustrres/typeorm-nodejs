import { Request, Response } from 'express';
import { 
  Controller, 
  Get, 
  Post 
} from '@overnightjs/core';
import { validate } from 'class-validator';

import { BaseController } from './base.controller';

import { SubjectEntity } from '../../typeorm/entities/subject.entity';
import { SubjectService } from '@/src/services/subject.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

@Controller('subjects')
export class SubjectController extends BaseController {
  constructor(private service: SubjectService) {
    super();
  }

  @Get(':id')
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const subject: SubjectEntity = await this.service.findById(request.params.id);

      return response.status(200).send(subject);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }

  @Post('')
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, room } = request.body;
  
      const subject = new CreateSubjectDto();
      subject.name = name;
      subject.room = room;

      const errors = await validate(subject, { forbidNonWhitelisted: true });

      if (errors.length) {
        const constraints = errors.map(
          (error) => Object.values(error.constraints)
        );
        
        return response.status(400).send({
          code: 400,
          message: constraints.join('\n')
        });
      }
      
      const subjectRecord: SubjectEntity = await this.service.create(subject);

      return response.status(201).send(subjectRecord);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}