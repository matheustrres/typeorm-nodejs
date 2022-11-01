import { IsOptional } from 'class-validator';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface StudentDto extends StudentEntity {}

export class CreateStudentDto implements Pick<StudentDto, 'subjects'> {
  @IsOptional()
  subjects: SubjectEntity[];
}
