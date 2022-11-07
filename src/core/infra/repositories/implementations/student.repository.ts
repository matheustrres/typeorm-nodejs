import { EntityTarget, FindOneOptions } from 'typeorm';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main repository class for Student entity
 *
 * @extends TypeORMRepository
 * @implements StudentRepository
 */
export class ORMStudentRepository extends TypeORMRepository<StudentEntity> implements StudentRepository {
  private findOptions: FindOneOptions<StudentEntity> = {
    relations: {
      subjects: true
    }
  }
  
  /**
   * Creates a new ORMStudentRepository instance
   *
   * @param {EntityTarget<StudentEntity>} [entity] - The repository target entity
   */
  constructor(entity: EntityTarget<StudentEntity> = StudentEntity) {
    super(entity);
  }
  
  /**
   * Finds a student by its id
   *
   * @param {String} id - The student id
   * @returns {Promise<StudentEntity|undefined>>}
   */
  public async findById(id: string): Promise<StudentEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
}