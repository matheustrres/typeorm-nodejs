import {
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

export interface SpecificationDto extends SpecificationEntity {}

export class CreateSpecificationDto implements Pick<SpecificationDto,
  'name' |
  'description'
  > {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;
}