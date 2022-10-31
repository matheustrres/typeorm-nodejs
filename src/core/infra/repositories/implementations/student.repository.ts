import { EntityTarget, FindOneOptions } from 'typeorm';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class ORMStudentRepository extends TypeORMRepository<StudentEntity> implements StudentRepository {
  private findOptions: FindOneOptions<StudentEntity> = {
    relations: {
      subjects: true,
      profile: true
    },
    select: {
      subjects: true
    }
  }
  
  constructor(entity: EntityTarget<StudentEntity> = StudentEntity) {
    super(entity);
  }
  
  public async findById(id: string): Promise<StudentEntity | undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
}