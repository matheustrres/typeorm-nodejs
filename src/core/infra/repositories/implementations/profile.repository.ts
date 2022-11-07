import { EntityTarget, FindOneOptions } from 'typeorm';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { ProfileRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

/**
 * Represents the main repository class for Profile entity
 *
 * @extends TypeORMRepository
 * @implements ProfileRepository
 */
export class ORMProfileRepository extends TypeORMRepository<ProfileEntity> implements ProfileRepository {
  private findOptions: FindOneOptions<ProfileEntity> = {
    relations: {
      studentProfile: {
        subjects: true
      }
    }
  }
  
  /**
   * Creates a new ORMProfileRepository instance
   *
   * @param {EntityTarget<ProfileEntity>} [entity] - The repository target entity
   */
  constructor(entity: EntityTarget<ProfileEntity> = ProfileEntity) {
    super(entity);
  }
  
  /**
   * Finds a profile by its email
   *
   * @param {String} email - The profile email
   * @returns {Promise<ProfileEntity|undefined>>}
   */
  public async findByEmail(email: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        email
      },
      ...this.findOptions
    });
  }
  
  /**
   * Finds a profile by its id
   *
   * @param {String} id - The profile id
   * @returns {Promise<ProfileEntity|undefined>>}
   */
  public async findById(id: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
}