import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface RoomDto extends RoomEntity {}

export class CreateRoomDto implements Pick<RoomDto, 'number' | 'description' | 'subject'> {
  @IsNumber()
  @IsNotEmpty()
  number: number;
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  subject?: SubjectEntity;
}