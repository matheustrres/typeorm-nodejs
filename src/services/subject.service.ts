import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ISubjectRepository } from '@/src/core/domain/repositories/subject.repository';
import { SubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';

export class SubjectService {
  constructor(private repository: ISubjectRepository = new SubjectRepository()) {}

  public async create(name: string): Promise<SubjectEntity> {
    return this.repository.create(name);
  }

  public async findByName(name: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findByName(name);

    if (!subject)
      throw new DatabaseValidationError(
        'No subject were found'
      );

    return subject;
  }

  public async findById(id: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findById(id);

    if (!subject)
      throw new DatabaseValidationError(
        'No subject were found'
      );

    return subject;
  }
}