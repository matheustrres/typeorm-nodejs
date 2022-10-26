import { Request, Response } from 'express';
import { 
  Controller, 
  Get, 
  Post 
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { SubjectEntity } from '../../typeorm/entities/subject.entity';
import { SubjectService } from '@/src/services/subject.service';

@Controller('subject')
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
      const subject: SubjectEntity = await this.service.create(request.body);

      return response.status(201).send(subject);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}