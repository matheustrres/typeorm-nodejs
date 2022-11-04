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
        'Invalid credentials',
        'INVALID'
      );
    }
    
    const validPassword: boolean = await AuthProvider.comparePasswords(password, profile.password);
    
    if (!validPassword) {
      throw new DatabaseValidationError(
        'Invalid credentials',
        'INVALID'
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
        'Profile already exists',
        'DUPLICATED'
      );
    }
    
    const profileData: ProfileEntity = {
      ...data,
      password: await AuthProvider.hashPassword(
        data.password
      )
    }
    
    const profile = await this.repository.create(profileData);
    
    if (profile.accountType === 'student') {
      profile.studentProfile = await this.studentService.create({
        subjects: []
      });
      
      await this.repository.update(profile);
    }

    return profile;
  }
  
  public async findById(id: string): Promise<ProfileEntity> {
    const profile: ProfileEntity = await this.repository.findById(id);
    
    if (!profile) {
      throw new DatabaseValidationError(
        'No profile were found',
        'INVALID'
      );
    }
    
    // probably temporary
    Object.keys(profile).forEach(
      (key) => !profile[key] && delete profile[key]
    );
    
    return profile;
  }
}