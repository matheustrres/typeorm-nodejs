import { Request, Response } from 'express';
import {
  Controller, Delete,
  Get,
  Middleware,
  Patch,
  Post
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { SubjectResponse } from '@/src/core/infra/presenters/subject.presenter';
import { SubjectService } from '@/src/services/subject.service';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { AccountMiddleware } from '@/src/shared/infra/http/middlewares/account.middleware';
import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';

import { paginator } from '@/src/shared/utils/functions/paginator';

/**
 * Represents the main controller class for Subject entity
 */
@Controller('subjects')
export class SubjectController extends BaseController {
  /**
   * Creates a new SubjectController instance
   *
   * @param {SubjectService} service - The subject service instance
   */
  constructor(private service: SubjectService) {
    super();
  }
  
  /**
   * Subject creation route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Post('')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateSubjectDto = request.body;
      const subject: SubjectResponse = await this.service.create(body);

      return response.status(201).send(subject);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Subject deletion route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Delete(':subjectId')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const subjectId: string = request.params.subjectId;
      await this.service.delete(subjectId);
      
      return response.status(200).send({
        code: 200,
        message: 'Subject successfully deleted'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Subject search route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Get(':subjectId')
  @Middleware(AuthMiddleware)
  public async getOne(request: Request, response: Response): Promise<Response> {
    try {
      const subjectId: string = request.params.subjectId;
      const subject: SubjectResponse = await this.service.findById(subjectId);
      
      return response.status(200).send(subject);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Subject listing route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Get('')
  @Middleware(AuthMiddleware)
  public async listSubjects(request: Request, response: Response): Promise<Response> {
    try {
      const { skip, take } = paginator(request);
      
      const subjects: SubjectResponse[] = await this.service.list(skip, take);
      
      return response.status(200).send(subjects);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Subject's room definition route
   * @param request
   * @param response
   */
  @Patch('room')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async setSubjectRoom(request: Request, response: Response): Promise<Response> {
    try {
      const subjectId: string = request.body.subjectId;
      const roomId: string = request.body.roomId;
      
      const subjectWithRoom: SubjectResponse = await this.service.setSubjectRoom(subjectId, roomId);
      
      return response.status(201).send(subjectWithRoom);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}