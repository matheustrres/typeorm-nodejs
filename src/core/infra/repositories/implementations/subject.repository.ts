import { EntityTarget, FindOneOptions } from 'typeorm';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class ORMSubjectRepository extends TypeORMRepository<SubjectEntity> implements SubjectRepository {
  private findOptions: FindOneOptions<SubjectEntity> = {
    relations: {
      enrolledStudents: true
    },
    select: {
      enrolledStudents: true
    }
  }
  
  constructor(entity: EntityTarget<SubjectEntity> = SubjectEntity) {
    super(entity);
  }
  
  public async findById(id: string): Promise<SubjectEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
  
  public async findByName(name: string): Promise<SubjectEntity|undefined> {
    return this.find({
      where: {
        name
      },
      ...this.findOptions
    })
  }
}