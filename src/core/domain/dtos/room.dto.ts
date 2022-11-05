import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface RoomDto extends RoomEntity {}

export class CreateRoomDto implements Pick<RoomDto, 'number' | 'capacity' | 'specifications' | 'subject'> {
  @IsNumber()
  @IsNotEmpty()
  number: number;
  
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsOptional()
  specifications?: SpecificationEntity[];
  
  @IsOptional()
  subject?: SubjectEntity;
}