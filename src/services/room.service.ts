import { CreateRoomDto } from '@/src/core/domain/dtos/room.dto';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import {
  RoomPresenter,
  RoomResponse
} from '@/src/core/infra/presenters/room.presenter';

import { SpecificationService } from '@/src/services/specification.service';
import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMRoomRepository } from '@/src/core/infra/repositories/implementations/room.repository';
import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

/**
 * Represents the main service class for Room entity
 */
export class RoomService {
  constructor(
    private repository: RoomRepository = new ORMRoomRepository(),
    private specificationService: SpecificationService = new SpecificationService()
  ) {}
  
  public async addRoomSpecifications(roomId: string, specificationsId: string[]) {
    const room: RoomResponse = await this.findById(roomId);
    const specifications: SpecificationEntity[] = [];

    for (const specificationId of specificationsId) {
      /**
       * Must be reviewed & look for a better treatment
       */
      const specification = await this.specificationService
        .findById(specificationId)
        .catch(() => {});

      if (specification) specifications.push(specification);
    }
  
    const someSpecificationAlreadyAddedToRoom = room.specifications?.some(
      ({ id }: SpecificationEntity) =>
        specificationsId.includes(id)
    );
  
    if (someSpecificationAlreadyAddedToRoom) {
      throw new DatabaseValidationError(
        'Unsuccessful specification addition',
        {
          description: 'The room already has some of the given specifications',
          type: 'DUPLICATED'
        }
      );
    }

    await this.repository.update({
      ...room,
      specifications: [
        ...room.specifications,
        ...specifications
      ]
    });
    
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
      throw new DatabaseValidationError(
        'Unsuccessful room creation',
        {
          description: 'A room already exists with the given number',
          type: 'DUPLICATED'
        }
      );
    }
    
    const room: RoomEntity = await this.repository.create(data);
    
    return RoomPresenter.handleSingleInstance(room);
  }
  
  /**
   * Finds a room by its id
   *
   * @param {String} id - The room id
   * @returns {Promise<RoomResponse>}
   */
  public async findById(id: string): Promise<RoomResponse> {
    const room: RoomEntity = await this.repository.findById(id);
    
    if (!room) {
      throw new DatabaseValidationError(
        'Unsuccessful room search',
        {
          description: 'No room were found with the given ID',
          type: 'INVALID'
        }
      );
    }
    
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
    const rooms: RoomEntity[] = await this.repository.list(skip, take);
    
    if (!rooms.length) {
      throw new DatabaseValidationError(
        'Unsuccessful rooms listing',
        {
          description: 'No room records were found'
        }
      );
    }
    
    return RoomPresenter.handleMultipleInstances(rooms);
  }
}