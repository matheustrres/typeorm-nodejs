import { IsOptional } from 'class-validator';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface StudentDto extends StudentEntity {}

export class CreateStudentDto implements Pick<StudentDto, 'subjects' | 'profile'> {
  @IsOptional()
  subjects: SubjectEntity[];
  
  @IsOptional()
  profile: ProfileEntity
}
