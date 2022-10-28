import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class SubjectService {
  constructor(private repository: SubjectRepository = new ORMSubjectRepository()) {}

  public async create(data: CreateSubjectDto): Promise<SubjectEntity> {
    const subjectAlreadyExists: SubjectEntity = await this.repository.findByName(data.name);
    
    if (subjectAlreadyExists) {
      throw new DatabaseValidationError(
        'Subject already exists with the given name',
        'DUPLICATED'
      );
    }
    
    return this.repository.create(data);
  }
  
  public async findById(id: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findById(id);

    if (!subject) {
      throw new DatabaseValidationError(
        'No subject were found',
        'INVALID'
      );
    }

    return subject;
  }
}