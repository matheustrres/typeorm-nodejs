import { RoomService } from '@/src/services/room.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

import {
  SubjectPresenter,
  SubjectResponse
} from '@/src/core/infra/presenters/subject.presenter';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';

/**
 * Represents the main service class for Subject entity
 */
export class SubjectService {
  constructor(
    private repository: SubjectRepository = new ORMSubjectRepository(),
    private roomService: RoomService = new RoomService()
  ) {}
  
  /**
   * Creates a subject
   *
   * @param {CreateSubjectDto} data - The subject data
   * @param {String} data.name - The subject name
   * @param {String} data.taughtBy - The subject instructor
   * @param {RoomEntity} [data.room] - The subject room
   * @param {StudentEntity[]} [data.enrolledStudents] - The subject enrolled students
   * @returns {Promise<SubjectResponse>}
   */
  public async create(data: CreateSubjectDto): Promise<SubjectResponse> {
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
    
    const subject: SubjectEntity = await this.repository.create(data);
    
    return SubjectPresenter.handleSingleInstance(subject);
  }
  
  /**
   * Finds a subject by its id
   *
   * @param {String} id - The subject id
   * @returns {Promise<SubjectResponse>}
   */
  public async findById(id: string): Promise<SubjectResponse> {
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
    
    return SubjectPresenter.handleSingleInstance(subject);
  }
  
  /**
   * Lists all subject records
   *
   * @param {Number} [skip] - Number of subjects that should be skipped
   * @param {Number} [take] - Number of subjects that should be taken
   * @returns {Promise<SubjectResponse[]>}
   */
  public async list(skip: number = 0, take: number = 10): Promise<SubjectResponse[]> {
    const subjects: SubjectEntity[] = await this.repository.list(skip, take);
    
    if (!subjects.length) {
      throw new DatabaseValidationError(
        'Unsuccessful subjects listing',
        {
          description: 'No subject records were found'
        }
      );
    }
    
    return SubjectPresenter.handleMultipleInstances(subjects);
  }
  
  /**
   * Defines subject room
   *
   * @param {String} subjectId - The subject id
   * @param {String} roomId - The room id
   * @returns {Promise<SubjectResponse>}
   */
  public async setSubjectRoom(subjectId: string, roomId: string): Promise<SubjectResponse> {
    const subject: SubjectEntity = await this.findById(subjectId);
    const room: RoomEntity = await this.roomService.findById(roomId);
  
    if (subject.room || room.subject) {
      throw new DatabaseValidationError(
        'Subject room definition failed',
        {
          description: 'This room is already in use',
          type: 'INVALID'
        }
      );
    }
    
    const roomCapacity: number = room.capacity;
    const enrolledStudents: number = subject.enrolledStudents?.length;
    
    if (enrolledStudents >= roomCapacity) {
      throw new DatabaseValidationError(
        'Subject room definition failed',
        {
          description: 'The number of students enrolled in this subject exceeds the total capacity of this room',
          type: 'INVALID'
        }
      );
    }
    
    await this.repository.update({
      ...subject,
      room
    });
    
    return this.findById(subjectId);
  }
}