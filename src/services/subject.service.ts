import { StudentService } from '@/src/services/student.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class SubjectService {
  constructor(
    private repository: SubjectRepository = new ORMSubjectRepository(),
    private studentService: StudentService = new StudentService()
  ) {}
  
  public async create(data: CreateSubjectDto): Promise<SubjectEntity> {
    const subjectAlreadyExists: SubjectEntity = await this.repository.findByName(data.name);
    
    if (subjectAlreadyExists) {
      throw new DatabaseValidationError(
        'Unsuccessful subject creation',
        {
          description: 'A subject already exists with the given name',
          type: 'DUPLICATED'
        }
      );
    }
    
    return this.repository.create(data);
  }
  
  public async createStudentSubjectEnrollment(studentId: string, subjectId: string): Promise<SubjectEntity> {
    const student: StudentEntity = await this.studentService.findById(studentId);
    const subject: SubjectEntity = await this.findById(subjectId);
    
    const studentAlreadyEnrolledToTheSubject: boolean = student.subjects.some(
      (subject: SubjectEntity) =>
        subject.id === subjectId
    );
    
    if (studentAlreadyEnrolledToTheSubject) {
      throw new DatabaseValidationError(
        'Unsuccessful enrollment',
        {
          description: 'Student already enrolled to this subject',
          type: 'INVALID'
        }
      );
    }
    
    const roomCapacity: number = subject.room.capacity;
    const enrolledStudents: number = subject.enrolledStudents.length;
    
    if (enrolledStudents >= roomCapacity) {
      throw new DatabaseValidationError(
        'Unsuccessful enrollment',
        {
          description: 'The number of students already enrolled in the subject exceeds the total capacity of the classroom',
          type: 'INVALID'
        });
    }
    
    await this.repository.update({
      ...subject,
      enrolledStudents: [
        ...subject.enrolledStudents,
        student
      ]
    });
    
    return this.findById(subjectId);
  }
  
  public async cancelStudentSubjectEnrollment(studentId: string, subjectId: string): Promise<void> {
    const student: StudentEntity = await this.studentService.findById(studentId);
    const subject: SubjectEntity = await this.findById(subjectId);
    
    const isStudentEnrolled: boolean = student.subjects.some(
      (subject: SubjectEntity) =>
        subject.id === subjectId
    );
    
    if (!isStudentEnrolled) {
      throw new DatabaseValidationError(
        'Unsuccessful enrollment cancellation',
        {
          description: 'Student is not enrolled in this subject',
          type: 'INVALID'
        }
      );
    }
    
    const studentIndex: number = subject.enrolledStudents.findIndex(
      (student: StudentEntity) =>
        student.id === studentId
    );
    
    subject.enrolledStudents.splice(studentIndex, 1);
    
    await this.repository.update({
      ...subject,
      enrolledStudents: [
        ...subject.enrolledStudents
      ]
    });
  }
  
  public async findById(id: string): Promise<SubjectEntity> {
    const subject: SubjectEntity = await this.repository.findById(id);
    
    if (!subject) {
      throw new DatabaseValidationError(
        'Unsuccessful subject search',
        {
          description: 'No subject were found with the given ID',
          type: 'INVALID'
        }
      );
    }
    
    return subject;
  }
  
  public async list(take: number = 10, skip: number = 0): Promise<SubjectEntity[]> {
    const subjects: SubjectEntity[] = await this.repository.list(take, skip);
    
    if (!subjects.length) {
      throw new DatabaseValidationError(
        'Unsuccessful subjects listing',
        {
          description: 'No subject records were found'
        }
      );
    }
    
    return subjects;
  }
}