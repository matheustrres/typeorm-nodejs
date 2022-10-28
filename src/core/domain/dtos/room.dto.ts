import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface RoomDto extends RoomEntity {}

export class CreateRoomDto implements Pick<RoomDto, 'name' | 'description' | 'subject'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  subject: SubjectEntity;
}