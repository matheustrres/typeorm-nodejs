import { StudentService } from '@/src/services/student.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';
import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main service class for Subject entity
 */
export class SubjectService {
  constructor(
    private repository: SubjectRepository = new ORMSubjectRepository(),
    private studentService: StudentService = new StudentService()
  ) {}
  
  /**
   * Creates a subject
   *
   * @param {CreateSubjectDto} data - The subject data
   * @param {String} data.name - The subject name
   * @param {String} data.taughtBy - The subject instructor
   * @param {RoomEntity} [data.room] - The subject room
   * @param {StudentEntity[]} [data.enrolledStudents] - The subject enrolled students
   * @returns {Promise<SubjectEntity>}
   */
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
  
  /**
   * Enrolls a student in a subject
   *
   * @param {String} studentId - The student id
   * @param {String} subjectId - The subject id
   * @returns {Promise<SubjectEntity>}
   */
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
  
  /**
   * Cancels a student's enrollment in a subject
   *
   * @param {String} studentId - The student id
   * @param {String} subjectId - The subject id
   * @returns {Promise<void>}
   */
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
  
  /**
   * Finds a subject by its id
   *
   * @param {String} id - The subject id
   * @returns {Promise<SubjectEntity>}
   */
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
  
  /**
   * Lists all subject records
   *
   * @param {Number} [skip] - Number of subjects that should be skipped
   * @param {Number} [take] - Number of subjects that should be taken
   * @returns {Promise<SubjectEntity[]>}
   */
  public async list(skip: number = 0, take: number = 10): Promise<SubjectEntity[]> {
    const subjects: SubjectEntity[] = await this.repository.list(skip, take);
    
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