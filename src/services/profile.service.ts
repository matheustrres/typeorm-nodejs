import { StudentService } from '@/src/services/student.service';

import { CreateProfileDto } from '@/src/core/domain/dtos/profile.dto';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMProfileRepository } from '@/src/core/infra/repositories/implementations/profile.repository';
import { ProfileRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { AuthProvider } from '@/src/shared/container/providers/auth.provider';

export class ProfileService {
  constructor(
    private repository: ProfileRepository = new ORMProfileRepository(),
    private studentService: StudentService = new StudentService()
  ) {}
  
  public async authenticate(email: string, password: string): Promise<string> {
    const profile: ProfileEntity = await this.repository.findByEmail(email);
    
    if (!profile) {
      throw new DatabaseValidationError(
        'Authentication failed',
        {
          description: 'Invalid credentials were given',
          type: 'INVALID'
        }
      );
    }
    
    const validPassword: boolean = await AuthProvider.comparePasswords(password, profile.password);
    
    if (!validPassword) {
      throw new DatabaseValidationError(
        'Authentication failed',
        {
          description: 'Invalid credentials were given',
          type: 'INVALID'
        }
      );
    }
    
    return AuthProvider.signToken({
      id: profile.id,
      accountType: profile.accountType,
      studentId: profile.studentProfile?.id
    });
  }
  
  public async create(data: CreateProfileDto): Promise<ProfileEntity> {
    const profileAlreadyExists: ProfileEntity = await this.repository.findByEmail(data.email);
    
    if (profileAlreadyExists) {
      throw new DatabaseValidationError(
        'Unsuccessful profile creation',
        {
          description: 'A profile already exists with the given email',
          type: 'DUPLICATED'
        }
      );
    }
    
    const profileData: ProfileEntity = {
      ...data,
      password: await AuthProvider.hashPassword(
        data.password
      )
    };
    
    const profile = await this.repository.create(profileData);
    
    if (profile.accountType === 'student') {
      profile.studentProfile = await this.studentService.create({
        profile,
        subjects: []
      });
      
      await this.repository.update(profile);
    }
    
    profile.studentProfile?.profile && delete profile.studentProfile['profile'];
    
    return profile;
  }
  
  public async findById(id: string): Promise<ProfileEntity> {
    const profile: ProfileEntity = await this.repository.findById(id);
    
    if (!profile) {
      throw new DatabaseValidationError(
        'Unsuccessful profile search',
        {
          description: 'No profile were found with the given ID',
          type: 'INVALID'
        }
      );
    }
    
    // probably temporary
    Object.keys(profile).forEach((key: string) => !profile[key] && delete profile[key]);
    
    return profile;
  }
  
  public async list(take: number = 10, skip: number = 0): Promise<ProfileEntity[]> {
    const profiles: ProfileEntity[] = await this.repository.list(take, skip);
    
    if (!profiles.length) {
      throw new DatabaseValidationError(
        'Unsuccessful profiles listing',
        {
          description: 'No profile records were found'
        }
      );
    }
    
    return profiles;
  }
}