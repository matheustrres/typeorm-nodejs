import { EntityTarget } from 'typeorm';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class ORMStudentRepository extends TypeORMRepository<StudentEntity> implements StudentRepository {
  constructor(entity: EntityTarget<StudentEntity> = StudentEntity) {
    super(entity);
  }
  
  public async findByEmail(email: string): Promise<StudentEntity | undefined> {
    return this.find({
      where: {
        email
      }
    });
  }
}