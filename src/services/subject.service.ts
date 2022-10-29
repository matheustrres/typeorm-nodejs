import { StudentService } from '@/src/services/student.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { subtle } from 'crypto';

export class SubjectService {
  constructor(
    private repository: SubjectRepository = new ORMSubjectRepository(),
    private studentService: StudentService = new StudentService()
  ) {}

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
  
  public async enrollStudent(studentId: string, subjectId: string) {
    const student: StudentEntity = await this.studentService.findById(studentId);
    const subject: SubjectEntity = await this.findById(subjectId);

    const studentAlreadyEnrolledToTheSubject: boolean = student.subjects.some(
      (subject: SubjectEntity) =>
        subject.id === subjectId
    );
    
    if (studentAlreadyEnrolledToTheSubject) {
      throw new DatabaseValidationError(
        'Student already enrolled to this subject',
        'INVALID'
      );
    }
    
    const subjectWithEnrolledStudent: SubjectEntity = {
      ...subject,
      enrolledStudents: [
        ...subject.enrolledStudents,
        student
      ]
    }
    
    await this.repository.update(subjectWithEnrolledStudent);
    
    return this.findById(subjectId);
  }
}