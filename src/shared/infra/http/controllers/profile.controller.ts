import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';

import { BaseController } from './base.controller';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { ProfileService } from '@/src/services/profile.service';

import { CreateProfileDto } from '@/src/core/domain/dtos/profile.dto';

@Controller('profiles')
export class ProfileController extends BaseController {
  constructor(private service: ProfileService) {
    super();
  }
  
  @Post('')
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const body: CreateProfileDto = request.body;
      const profile: ProfileEntity = await this.service.create(body);
      
      return response.status(201).send(profile);
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
  
  @Post('auth')
  public async authenticate(request: Request, response: Response): Promise<Response> {
    try {
      const email: string = request.body.email;
      const password: string = request.body.password;
      
      const token: string = await this.service.authenticate(email, password);
      
      return response.status(200).send({ token });
    } catch (error) {
      return this.sendErrorResponse(response, error);
    }
  }
}