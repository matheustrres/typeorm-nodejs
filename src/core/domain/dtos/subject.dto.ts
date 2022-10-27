import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';

export interface SubjectDto extends SubjectEntity {}

export class CreateSubjectDto implements Pick<SubjectDto, 'name' | 'rooms'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  rooms: RoomEntity[];
}