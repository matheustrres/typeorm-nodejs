import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post
} from '@overnightjs/core';

import { BaseController } from './base.controller';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { RoomResponse } from '@/src/core/infra/presenters/room.presenter';
import { RoomService } from '@/src/services/room.service';

import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

import { CreateRoomDto } from '@/src/core/domain/dtos/room.dto';

import { AccountMiddleware } from '@/src/shared/infra/http/middlewares/account.middleware';
import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';

import { paginator } from '@/src/shared/utils/functions/paginator';

/**
 * Represents the main controller class for Room entity
 */
@Controller('rooms')
export class RoomController extends BaseController {
  /**
   * Creates a new RoomController instance
   *
   * @param {RoomService} service - The room service instance
   */
  constructor(private service: RoomService) {
    super();
  }
  
  /**
   * Room specifications adding route
   * 
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Post('add-specs')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async addRoomSpecifications(request: Request, response: Response): Promise<Response> {
    try {
      const roomId: string = request.body.roomId;
      const specificationsId: string[] = request.body.specificationsId;
      
      const specifications: SpecificationEntity[] = await this.service.addRoomSpecifications(roomId, specificationsId);
      
      return response.status(200).send({
        code: 201,
        message: `${specifications.length} specification(s) added to the room`,
        specifications
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Room creation route
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
      const body: CreateRoomDto = request.body;
      const room: RoomResponse = await this.service.create(body);
      
      return response.status(201).send(room);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Room deletion route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the request
   * @returns {Promise<Response>}
   */
  @Delete(':roomId')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const roomId: string = request.params.roomId;
      await this.service.delete(roomId);
      
      return response.status(200).send({
        code: 200,
        message: 'Room successfully deleted'
      });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Room search route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the incoming request
   * @returns {Promise<Response>}
   */
  @Get(':id')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async getOne(request: Request, response: Response): Promise<Response> {
    try {
      const roomId: string = request.params.id;
      const room: RoomResponse = await this.service.findById(roomId);
      
      return response.status(200).send(room);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  /**
   * Room listing route
   *
   * @param {Request} request - The incoming request
   * @param {Response} response - The response to the incoming request
   * @returns {Promise<Response>}
   */
  @Get('')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async listRooms(request: Request, response: Response): Promise<Response> {
    try {
      const { skip, take } = paginator(request);
      
      const rooms: RoomResponse[] = await this.service.list(skip, take);
      
      return response.status(200).send(rooms);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}