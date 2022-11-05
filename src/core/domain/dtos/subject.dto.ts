import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface SubjectDto extends SubjectEntity {}

export class CreateSubjectDto implements Pick<SubjectDto, 'name' | 'taughtBy' | 'room' |'enrolledStudents'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  taughtBy: string;
  
  @IsOptional()
  room?: RoomEntity;
  
  @IsOptional()
  enrolledStudents?: StudentEntity[];
}