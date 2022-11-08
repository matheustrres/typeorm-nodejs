import { EntityTarget, FindOneOptions } from 'typeorm';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main repository class for Subject entity
 *
 * @extends TypeORMRepository
 * @implements SubjectRepository
 */
export class ORMSubjectRepository extends TypeORMRepository<SubjectEntity> implements SubjectRepository {
  private findOptions: FindOneOptions<SubjectEntity> = {
    relations: {
      enrolledStudents: true,
      room: true
    }
  }
  
  /**
   * Creates a new ORMSubjectRepository instance
   *
   * @param {EntityTarget<SubjectEntity>} [entity] - The repository target entity
   */
  constructor(entity: EntityTarget<SubjectEntity> = SubjectEntity) {
    super(entity);
  }
  
  /**
   * Finds a subject by its id
   *
   * @param {String} id - The subject id
   * @returns {Promise<SubjectEntity|undefined>>}
   */
  public async findById(id: string): Promise<SubjectEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
  
  /**
   * Finds a subject by its name
   *
   * @param {String} name - The subject name
   * @returns {Promise<SubjectEntity|undefined>>}
   */
  public async findByName(name: string): Promise<SubjectEntity|undefined> {
    return this.find({
      where: {
        name
      },
      ...this.findOptions
    })
  }
}