import { Request, Response } from 'express';
import { Controller, Middleware, Post } from '@overnightjs/core';

import { BaseController } from './base.controller';

import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { RoomService } from '@/src/services/room.service';

import { CreateRoomDto } from '@/src/core/domain/dtos/room.dto';

import { AccountMiddleware } from '@/src/shared/infra/http/middlewares/account.middleware';
import { AuthMiddleware } from '@/src/shared/infra/http/middlewares/auth.middleware';

@Controller('rooms')
export class RoomController extends BaseController {
  constructor(private service: RoomService) {
    super();
  }
  
  @Post('')
  @Middleware([
    AuthMiddleware,
    AccountMiddleware(ProfileAccountType.ADMIN)
  ])
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateRoomDto = request.body;
      const room: RoomEntity = await this.service.create(body);
      
      return response.status(201).send(room);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}