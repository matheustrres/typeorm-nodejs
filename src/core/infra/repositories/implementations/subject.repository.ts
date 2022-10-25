import { SubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/subject/subject.repository';
import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export class ORMSubjectRepository extends TypeORMRepository<SubjectDto, SubjectEntity> implements SubjectRepository {
  constructor(entity: SubjectEntity = new SubjectEntity()) {
    super(entity);
  }

  public async findById(id: string): Promise<SubjectEntity> {
    return this.find({ id });
  }

  public async findByName(name: string): Promise<SubjectEntity> {
    return this.find({ name });
  }
}