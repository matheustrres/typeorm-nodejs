import { EntityTarget } from 'typeorm';

import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';
import { SpecificationRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

export class ORMSpecificationRepository extends TypeORMRepository<SpecificationEntity> implements SpecificationRepository {
  constructor(entity: EntityTarget<SpecificationEntity> = SpecificationEntity) {
    super(entity);
  }
  
  public async findById(id: string): Promise<SpecificationEntity|undefined> {
    return this.find({
      where: {
        id
      }
    });
  }
  
  public async findByName(name: string): Promise<SpecificationEntity|undefined> {
    return this.find({
      where: {
        name
      }
    });
  }
}