import { Repository } from 'typeorm';

import { ISubjectRepository } from '@/src/core/domain/repositories/subject.repository';

import { AppDataSource } from '@/src/shared/infra/typeorm/data-source';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export class SubjectRepository implements ISubjectRepository {
  private ormRepository: Repository<SubjectEntity>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(SubjectEntity);
  }

  public async create(name: string): Promise<SubjectEntity> {
    const newSubject: SubjectEntity = this.ormRepository.create({ name });
    await this.ormRepository.save(newSubject);

    return newSubject;
  }

  public async findByName(name :string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.ormRepository.findOne({
      where: {
        name
      }
    });

    return subject;
  }

  public async findById(id: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return subject;
  }
}
