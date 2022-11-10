import { IsNotEmpty } from 'class-validator';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

export interface StudentDto extends StudentEntity {}

export class CreateStudentDto implements Pick<StudentDto, 'profile'> {
  @IsNotEmpty()
  profile: ProfileEntity;
}
