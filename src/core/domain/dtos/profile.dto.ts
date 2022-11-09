import { Exclude } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { ProfileEntity, ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

export interface ProfileDto  extends ProfileEntity {}

export class CreateProfileDto implements Pick<ProfileDto, 'name' | 'email' | 'password' | 'accountType' | 'studentProfile'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;
  
  @IsString()
  @IsOptional()
  @IsEnum(ProfileAccountType)
  accountType?: ProfileAccountType;
  
  @IsOptional()
  studentProfile?: StudentEntity;
}