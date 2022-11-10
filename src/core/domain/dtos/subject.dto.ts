import { IsString, IsNotEmpty } from 'class-validator';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface SubjectDto extends SubjectEntity {}

export class CreateSubjectDto implements Pick<SubjectDto,
  'name' |
  'taughtBy'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  taughtBy: string;
}
