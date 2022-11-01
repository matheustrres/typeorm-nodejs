import { EntityTarget } from 'typeorm';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { ProfileRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

export class ORMProfileRepository extends TypeORMRepository<ProfileEntity> implements ProfileRepository {
  constructor(entity: EntityTarget<ProfileEntity> = ProfileEntity) {
    super(entity);
  }
  
  public async findByEmail(email: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        email
      }
    });
  }
  
  public async findById(id: string): Promise<ProfileEntity|undefined> {
    return this.find({
      where: {
        id
      }
    });
  }
}