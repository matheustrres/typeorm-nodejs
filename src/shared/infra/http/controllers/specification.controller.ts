import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { SpecificationService } from '@/src/services/specification.service';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

import { CreateSpecificationDto } from '@/src/core/domain/dtos/specification.dto';

import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';
import { AccountMiddleware } from '@/src/shared/infra/http/middlewares/account.middleware';

import { paginator } from '@/src/shared/utils/functions/paginator';

@Controller('specifications')
export class SpecificationController extends BaseController {
  constructor(private service: SpecificationService) {
    super();
  }
  
  @Post('')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateSpecificationDto = request.body;
      const specification: SpecificationEntity = await this.service.create(body);
      
      return response.status(201).send(specification);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Delete(':specificationId')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const specificationId: string = request.params.specificationId;
      await this.service.delete(specificationId);
      
      return response.status(200).send({
        code: 200,
        message: 'Specification successfully deleted'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Get('')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async listSpecifications(request: Request, response: Response): Promise<Response> {
    try {
      const { skip, take } = paginator(request);
      
      const specifications: SpecificationEntity[] = await this.service.list(skip, take);
      
      return response.status(200).send(specifications);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}