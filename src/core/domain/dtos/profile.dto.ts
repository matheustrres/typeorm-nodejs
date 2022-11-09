import { Exclude } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { ProfileEntity, ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

interface ProfileDto extends ProfileEntity {}

export class CreateProfileDto implements Omit<ProfileDto,
  'id' |
  'studentProfile' |
  'createdAt' |
  'updatedAt'> {
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
}