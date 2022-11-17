import { BaseService } from './base.service';
import { SpecificationService } from './specification.service';

import { CreateRoomDto } from '@/src/core/domain/dtos/room.dto';

import {
  RoomPresenter,
  RoomResponse
} from '@/src/core/infra/presenters/room.presenter';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMRoomRepository } from '@/src/core/infra/repositories/implementations/room.repository';

/**
 * Represents the main service class for Room entity
 */
export class RoomService extends BaseService {
  constructor(
    private repository: RoomRepository = new ORMRoomRepository(),
    private specificationService: SpecificationService = new SpecificationService()
  ) {
    super();
  }

  /**
   * Adds specifications to a room
   * 
   * @param {String} roomId - The room id 
   * @param {String[]} specificationsId - The specifications id to be added 
   * @returns {Promise<SpecificationEntity[]>}
   */
  public async addRoomSpecifications(roomId: string, specificationsId: string[]): Promise<SpecificationEntity[]> {
    const room: RoomResponse = await this.findById(roomId);
    const specifications: SpecificationEntity[] = [];

    for (const specificationId of specificationsId) {
      /**
       * Must be reviewed & look for a better treatment
       */
      const specification = await this.specificationService
        .findById(specificationId)
        .catch((): void => { });

      if (specification instanceof SpecificationEntity) {
        specifications.push(specification);
      }
    }

    const someSpecificationAlreadyAddedToRoom: boolean = specifications.some(
      (spec: SpecificationEntity): SpecificationEntity =>
        room.specifications?.find(roomSpec => roomSpec.id === spec.id)
    );

    if (someSpecificationAlreadyAddedToRoom) {
      throw new DatabaseValidationError('Unsuccessful specification addition', {
        description: 'The room already has some of the given specifications',
        type: 'DUPLICATED'
      });
    }

    const newRoomData: RoomEntity = {
      ...room,
      specifications: [
        ...room.specifications,
        ...specifications
      ]
    }

    await this.cacheManager.set<
      RoomEntity
    >(this.getCacheKey(room.id), newRoomData);

    await this.repository.update(newRoomData);

    return specifications;
  }

  /**
   * Creates a room
   *
   * @param {CreateRoomDto} data - The room data
   * @param {Number} data.number - The room number
   * @param {Number} [data.capacity] - The room capacity
   * @param {SpecificationEntity[]} [data.specifications] - The room specifications
   * @param {SubjectEntity} [data.subject] - The room subject
   * @returns {Promise<RoomResponse>}
   */
  public async create(data: CreateRoomDto): Promise<RoomResponse> {
    const roomAlreadyExists: RoomEntity = await this.repository.findByNumber(data.number);

    if (roomAlreadyExists) {
      throw new DatabaseValidationError('Unsuccessful room creation', {
        description: 'A room already exists with the given number',
        type: 'DUPLICATED'
      });
    }

    const room: RoomEntity = await this.repository.create(data);

    return RoomPresenter.handleSingleInstance(room);
  }

  /**
   * Deletes a room
   *
   * @param {String} id - The room id
   * @returns {Promise<void>}
   */
  public async delete(id: string): Promise<void> {
    const cachedRoom: RoomEntity = await this.cacheManager.get<
      RoomEntity
    >(this.getCacheKey(id));

    if (cachedRoom) {
      await this.cacheManager.delete(this.getCacheKey(id));
    }

    const room: RoomResponse = await this.findById(id);

    await this.repository.delete(room.id);
  }

  /**
   * Finds a room by its id
   *
   * @param {String} id - The room id
   * @returns {Promise<RoomResponse>}
   */
  public async findById(id: string): Promise<RoomResponse> {
    const cachedRoom: RoomEntity = await this.cacheManager.get<
      RoomEntity
    >(this.getCacheKey(id));

    if (cachedRoom) {
      return RoomPresenter.handleSingleInstance(cachedRoom);
    }

    const room: RoomEntity = await this.repository.findById(id);

    if (!room) {
      throw new DatabaseValidationError('Unsuccessful room search', {
        description: 'No room were found with the given ID',
        type: 'INVALID'
      });
    }

    await this.cacheManager.set<
      RoomEntity
    >(this.getCacheKey(id), room);

    return RoomPresenter.handleSingleInstance(room);
  }

  /**
   * Lists all room records
   *
   * @param {Number} [skip] - Number of rooms that should be skipped
   * @param {Number} [take] - Number of rooms that should be taken
   * @returns {Promise<RoomResponse[]>}
   */
  public async list(skip: number = 0, take: number = 10): Promise<RoomResponse[]> {
    const cachedRoomList: RoomEntity[] = await this.cacheManager.get<
      RoomEntity[]
    >('--rooms');

    if (cachedRoomList) {
      return RoomPresenter.handleMultipleInstances(cachedRoomList);
    }

    const rooms: RoomEntity[] = await this.repository.list(skip, take);

    if (!rooms.length) {
      throw new DatabaseValidationError('Unsuccessful room listing', {
        description: 'No room records were found',
        type: 'INVALID'
      });
    }

    await this.cacheManager.set<
      RoomEntity[]
    >(`--rooms`, rooms);

    return RoomPresenter.handleMultipleInstances(rooms);
  }

  public getCacheKey(id: string): string {
    return `--room-${id}`;
  }
}