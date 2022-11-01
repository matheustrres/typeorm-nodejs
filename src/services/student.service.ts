import { CreateStudentDto } from '@/src/core/domain/dtos/student.dto';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMStudentRepository } from '@/src/core/infra/repositories/implementations/student.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class StudentService {
  constructor(private repository: StudentRepository = new ORMStudentRepository()) {}
  
  public async create(data: CreateStudentDto): Promise<StudentEntity> {
    return this.repository.create(data);
  }
  
  public async findById(id: string): Promise<StudentEntity> {
    const student: StudentEntity = await this.repository.findById(id);
    
    if (!student) {
      throw new DatabaseValidationError(
        'No student were found',
        'INVALID'
      );
    }
    
    return student;
  }
}