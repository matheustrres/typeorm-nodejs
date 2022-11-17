import { BaseService } from './base.service';
import { RoomService } from './room.service';

import { CreateSubjectDto } from '@/src/core/domain/dtos/subject.dto';

import {
  SubjectPresenter,
  SubjectResponse
} from '@/src/core/infra/presenters/subject.presenter';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { SubjectRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMSubjectRepository } from '@/src/core/infra/repositories/implementations/subject.repository';

/**
 * Represents the main service class for Subject entity
 */
export class SubjectService extends BaseService {
  constructor(
    private repository: SubjectRepository = new ORMSubjectRepository(),
    private roomService: RoomService = new RoomService()
  ) {
    super();
  }

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
      throw new DatabaseValidationError('Unsuccessful subject creation', {
        description: 'A subject already exists with the given name',
        type: 'DUPLICATED'
      });
    }

    const subject: SubjectEntity = await this.repository.create(data);

    return SubjectPresenter.handleSingleInstance(subject);
  }

  /**
   * Deletes a subject
   *
   * @param {String} id - The subject id
   * @returns {Promise<void>}
   */
  public async delete(id: string): Promise<void> {
    const cachedSubject: SubjectEntity = await this.cacheManager.get<
      SubjectEntity
    >(this.getCacheKey(id));

    if (cachedSubject) {
      await this.cacheManager.delete(this.getCacheKey(id));
    }

    const subject: SubjectResponse = await this.findById(id);

    await this.repository.delete(subject.id);
  }

  /**
   * Finds a subject by its id
   *
   * @param {String} id - The subject id
   * @returns {Promise<SubjectResponse>}
   */
  public async findById(id: string): Promise<SubjectResponse> {
    const cachedSubject: SubjectEntity = await this.cacheManager.get<
      SubjectEntity
    >(this.getCacheKey(id));

    if (cachedSubject) {
      return SubjectPresenter.handleSingleInstance(cachedSubject);
    }

    const subject: SubjectEntity = await this.repository.findById(id);

    if (!subject) {
      throw new DatabaseValidationError('Unsuccessful subject search', {
        description: 'No subject were found with the given ID',
        type: 'INVALID'
      });
    }

    await this.cacheManager.set<
      SubjectEntity
    >(this.getCacheKey(id), subject);

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
      throw new DatabaseValidationError('Unsuccessful subjects listing', {
        description: 'No subject records were found',
        type: 'INVALID'
      });
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
      throw new DatabaseValidationError('Subject room definition failed', {
        description: 'Room already in use',
        type: 'INVALID'
      });
    }

    const roomCapacity: number = room.capacity;
    const enrolledStudents: number = subject.enrolledStudents?.length;

    if (enrolledStudents >= roomCapacity) {
      throw new DatabaseValidationError(
        'Subject room definition failed', {
        description: 'The number of students enrolled in this subject exceeds the total capacity of this room',
        type: 'INVALID'
      });
    }

    const newSubjectData: SubjectEntity = {
      ...subject,
      room
    }

    await this.cacheManager.set<
      SubjectEntity
    >(this.getCacheKey(subject.id), newSubjectData);

    await this.repository.update(newSubjectData);

    return this.findById(subjectId);
  }

  public getCacheKey(id: string): string {
    return `--subject-${id}`;
  }
}