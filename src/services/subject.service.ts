import { SubjectDto } from '@/src/core/domain/dtos/subject.dto';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';

export class SubjectService {
  constructor(protected repository = new ORMSubjectRepository()) {}

  public async create(data: SubjectDto): Promise<SubjectEntity> {
    return this.repository.create(data);
  }

  public async findByName(name: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findByName(name);

    if (!subject)
      throw new DatabaseValidationError(
        'No subject were found',
        'INVALID'
      );

    return subject;
  }

  public async findById(id: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findById(id);

    if (!subject)
      throw new DatabaseValidationError(
        'No subject were found',
        'INVALID'
      );

    return subject;
  }
}