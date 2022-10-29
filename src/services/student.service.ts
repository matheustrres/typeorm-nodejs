import { CreateStudentDto } from '@/src/core/domain/dtos/student.dto';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMStudentRepository } from '@/src/core/infra/repositories/implementations/student.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { AuthProvider } from '@/src/shared/container/providers/auth.provider';

export class StudentService {
  constructor(private repository: StudentRepository = new ORMStudentRepository()) {}
  
  public async authenticate(email: string, password: string) {
    const student: StudentEntity = await this.repository.findByEmail(email);
    
    if (!student) {
      throw new DatabaseValidationError(
        'Invalid credentials',
        'INVALID'
      );
    }
    
    const validPassword: boolean = await AuthProvider.comparePasswords(password, student.password);
    
    if (!validPassword) {
      throw new DatabaseValidationError(
        'Invalid credentials',
        'INVALID'
      );
    }

    return AuthProvider.signToken(student.id);
  }
  
  public async create(data: CreateStudentDto): Promise<StudentEntity> {
    const studentAlreadyExists: StudentEntity = await this.repository.findByEmail(data.email);
    
    if (studentAlreadyExists) {
      throw new DatabaseValidationError(
        'Email already taken',
        'DUPLICATED'
      );
    }
    
    data.password = await AuthProvider.hashPassword(data.password);
    
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