import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface StudentDto extends StudentEntity {}

export class CreateStudentDto implements Pick<StudentDto, 'name' | 'email' | 'password' | 'subjects'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  subjects: SubjectEntity[];
}