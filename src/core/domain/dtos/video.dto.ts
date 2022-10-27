import { IsNotEmpty, IsString } from 'class-validator';

import { VideoEntity } from '@/src/shared/infra/typeorm/entities/video.entity';

export interface VideoDto extends VideoEntity {}

export class CreateVideoDto implements Pick<VideoDto, 'title' | 'url'> {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsNotEmpty()
  url: string;
}