import { EntityTarget, FindOneOptions } from 'typeorm';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { ProfileRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

export class ORMProfileRepository extends TypeORMRepository<ProfileEntity> implements ProfileRepository {
  private findOptions: FindOneOptions<ProfileEntity> = {
    relations: {
      studentProfile: {
        subjects: true
      }
    }
  }
  
  constructor(entity: EntityTarget<ProfileEntity> = ProfileEntity) {
    super(entity);
  }
  
  public async findByEmail(email: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        email
      },
      ...this.findOptions
    });
  }
  
  public async findById(id: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
}