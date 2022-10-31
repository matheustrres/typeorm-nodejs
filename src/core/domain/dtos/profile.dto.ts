import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { ProfileEntity, ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

export interface ProfileDto  extends ProfileEntity {}

export class CreateProfileDto implements Pick<ProfileDto, 'name' | 'email' | 'password' | 'accountType'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsOptional()
  @IsEnum(ProfileAccountType)
  accountType?: ProfileAccountType;
}