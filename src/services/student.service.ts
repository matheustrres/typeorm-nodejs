import { SubjectService } from '@/src/services/subject.service';

import { CreateStudentDto } from '@/src/core/domain/dtos/student.dto';

import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMStudentRepository } from '@/src/core/infra/repositories/implementations/student.repository';
import { StudentRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main service class for Student entity
 */
export class StudentService {
  constructor(
    private repository: StudentRepository = new ORMStudentRepository(),
    private subjectService: SubjectService = new SubjectService()
  ) {}
  
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
   * Enrolls a student in a subject
   *
   * @param {String} studentId - The student id
   * @param {String} subjectId - The subject id
   * @returns {Promise<SubjectEntity>}
   */
  public async enrollStudentInASubject(studentId: string, subjectId: string): Promise<void> {
    const student: StudentEntity = await this.findById(studentId);
    const subject: SubjectEntity = await this.subjectService.findById(subjectId);
    
    const studentAlreadyEnrolledInTheSubject: boolean = student.subjects.some(
      (sub: SubjectEntity) => sub.id === subject.id
    );
    
    if (studentAlreadyEnrolledInTheSubject) {
      throw new DatabaseValidationError(
        'Unsuccessful enrollment',
        {
          description: 'Student already enrolled in this subject',
          type: 'INVALID'
        }
      );
    }
    
    if (subject.room) {
      const capacity: number = subject.room.capacity;
      const enrolledStudents: number = subject.enrolledStudents.length;
  
      if (enrolledStudents >= capacity) {
        throw new DatabaseValidationError(
          'Unsuccessful enrollment',
          {
            description: 'This subject no longer accepts enrollments',
            type: 'INVALID'
          }
        );
      }
    }
    
    await this.repository.update({
      ...student,
      subjects: [
        ...student.subjects,
        subject
      ]
    });
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
  
  /**
   * Removes a student's enrollment in a subject
   *
   * @param {String} studentId - The student id
   * @param {String} subjectId - The subject id
   * @returns {Promise<void>}
   */
  public async removeStudentSubjectEnrollment(studentId: string, subjectId: string): Promise<void> {
    const student: StudentEntity = await this.findById(studentId);
    const subject: SubjectEntity = await this.subjectService.findById(subjectId);
    
    const isStudentEnrolledToTheSubject: boolean = student.subjects.some(
      (sub: SubjectEntity) => sub.id === subject.id
    );
    
    if (!isStudentEnrolledToTheSubject) {
      throw new DatabaseValidationError(
        'Unsuccessful enrollment removal',
        {
          description: 'Student is not enrolled in this subject',
          type: 'INVALID'
        }
      );
    }
    
    const studentIndex: number = subject.enrolledStudents.findIndex(
      (stu: StudentEntity) => stu.id === student.id
    );
    
    subject.enrolledStudents.splice(studentIndex, 1);
    
    await this.repository.update({
      ...student,
      subjects: [
        ...student.subjects
      ]
    });
  }
}