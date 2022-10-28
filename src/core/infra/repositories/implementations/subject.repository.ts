import { EntityTarget } from 'typeorm';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class ORMSubjectRepository extends TypeORMRepository<SubjectEntity> implements SubjectRepository {
  constructor(entity: EntityTarget<SubjectEntity> = SubjectEntity) {
    super(entity);
  }

  public async findByName(name: string): Promise<SubjectEntity> {
    return this.find({
      where: {
        name
      }
    });
  }
}