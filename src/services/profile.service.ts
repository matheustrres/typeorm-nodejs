import { BaseService } from './base.service';
import { StudentService } from './student.service';

import { CreateProfileDto } from '@/src/core/domain/dtos/profile.dto';

import {
  ProfilePresenter,
  ProfileResponse
} from '@/src/core/infra/presenters/profile.presenter';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ProfileRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMProfileRepository } from '@/src/core/infra/repositories/implementations/profile.repository';

import { AuthProvider } from '@/src/shared/container/providers/auth.provider';

/**
 * Represents the main service class for Profile entity
 */
export class ProfileService extends BaseService {
  constructor(
    private repository: ProfileRepository = new ORMProfileRepository(),
    private studentService: StudentService = new StudentService()
  ) {
    super();
  }

  /**
   * Authenticates a profile and assigns it a JWT
   *
   * @param {String} email - The profile email
   * @param {String} password - The profile password
   * @returns {Promise<string>}
   */
  public async authenticate(email: string, password: string): Promise<string> {
    const profile: ProfileEntity = await this.repository.findByEmail(email);

    if (!profile) {
      throw new DatabaseValidationError('Authentication failed', {
        description: 'Invalid credentials were given',
        type: 'INVALID'
      });
    }

    const validPassword: boolean = await AuthProvider.comparePasswords(password, profile.password);

    if (!validPassword) {
      throw new DatabaseValidationError('Authentication failed', {
        description: 'Invalid credentials were given',
        type: 'INVALID'
      });
    }

    return AuthProvider.signToken({
      id: profile.id,
      accountType: profile.accountType,
      studentId: profile.studentProfile?.id
    });
  }

  /**
   * Creates a profile
   *
   * @param {CreateProfileDto} data - The profile data
   * @param {String} data.name - The profile name
   * @param {String} data.email - The profile email
   * @param {String} data.password - The profile password
   * @param {ProfileAccountType} [data.accountType] - The profile account type
   * @param {StudentEntity} [data.studentProfile] - The profile-related student account
   * @returns {Promise<ProfileResponse>}
   */
  public async create(data: CreateProfileDto): Promise<ProfileResponse> {
    const profileAlreadyExists: ProfileEntity = await this.repository.findByEmail(data.email);

    if (profileAlreadyExists) {
      throw new DatabaseValidationError('Unsuccessful profile creation', {
        description: 'A profile already exists with the given email',
        type: 'DUPLICATED'
      });
    }

    const profile: ProfileEntity = await this.repository.create({
      ...data,
      password: await AuthProvider.hashPassword(data.password)
    });

    if (profile.accountType === 'student') {
      profile.studentProfile = await this.studentService.create({ profile });

      await this.repository.update(profile);
    }

    return ProfilePresenter.handleSingleInstance(profile);
  }

  /**
   * Deletes a profile
   *
   * @param {String} id - The profile id
   * @returns {Promise<void>}
   */
  public async delete(id: string): Promise<void> {
    const cachedProfile: ProfileEntity = await this.cacheManager.get<
      ProfileEntity
    >(this.getCacheKey(id));

    if (cachedProfile) {
      await this.cacheManager.delete(this.getCacheKey(id));
    }

    const profile: ProfileResponse = await this.findById(id);

    await this.repository.delete(profile.id);
  }

  /**
   * Finds a profile by its id
   *
   * @param {String} id - The profile id
   * @returns {Promise<ProfileResponse>}
   */
  public async findById(id: string): Promise<ProfileResponse> {
    const cachedProfile: ProfileEntity = await this.cacheManager.get<
      ProfileEntity
    >(this.getCacheKey(id));

    if (cachedProfile) {
      return ProfilePresenter.handleSingleInstance(cachedProfile);
    }

    const profile: ProfileEntity = await this.repository.findById(id);

    if (!profile) {
      throw new DatabaseValidationError('Unsuccessful profile search', {
        description: 'No profile were found with the given ID',
        type: 'INVALID'
      });
    }

    await this.cacheManager.set<
      ProfileEntity
    >(this.getCacheKey(id), profile);

    return ProfilePresenter.handleSingleInstance(profile);
  }

  /**
   * Lists all profile records
   *
   * @param {Number} [skip] - Number of profiles that should be skipped
   * @param {Number} [take] - Number of profiles that should be taken
   * @returns {Promise<ProfileResponse[]>}
   */
  public async list(skip: number = 0, take: number = 10): Promise<ProfileResponse[]> {
    const profiles: ProfileEntity[] = await this.repository.list(skip, take);

    if (!profiles.length) {
      throw new DatabaseValidationError('Unsuccessful profiles listing', {
        description: 'No profile records were found',
        type: 'INVALID'
      });
    }

    return ProfilePresenter.handleMultipleInstances(profiles);
  }

  public getCacheKey(id: string): string {
    return `--profile-${id}`;
  }
}