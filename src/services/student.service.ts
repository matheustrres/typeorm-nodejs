import { CreateStudentDto } from '@/src/core/domain/dtos/student.dto';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMStudentRepository } from '@/src/core/infra/repositories/implementations/student.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main service class for Student entity
 */
export class StudentService {
  constructor(private repository: StudentRepository = new ORMStudentRepository()) {}
  
  /**
   * Creates a student
   *
   * @param {CreateStudentDto} data - The student data
   * @param {ProfileEntity} data.profile - The student-related profile
   * @param {SubjectEntity[]} [data.subjects] - The student enrolled subjects
   * @returns {Promise<StudentEntity>}
   */
  public async create(data: CreateStudentDto): Promise<StudentEntity> {
    return this.repository.create(data);
  }
  
  /**
   * Finds a student by its id
   *
   * @param {String} id - The student id
   * @returns {Promise<StudentEntity>}
   */
  public async findById(id: string): Promise<StudentEntity> {
    const student: StudentEntity = await this.repository.findById(id);
    
    if (!student) {
      throw new DatabaseValidationError(
        'Unsuccessful student search',
        {
          description: 'No student were found with the given ID',
          type: 'INVALID'
        }
      );
    }
    
    return student;
  }
}