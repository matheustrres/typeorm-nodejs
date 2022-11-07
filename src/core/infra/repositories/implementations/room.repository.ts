import { EntityTarget, FindOneOptions } from 'typeorm';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

/**
 * Represents the main repository class for Room entity
 *
 * @extends TypeORMRepository
 * @implements RoomRepository
 */
export class ORMRoomRepository extends TypeORMRepository<RoomEntity> implements RoomRepository {
  private findOptions: FindOneOptions<RoomEntity> = {
    relations: {
      subject: true,
      specifications: true
    }
  }
  
  /**
   * Creates a new ORMRoomRepository instance
   *
   * @param {EntityTarget<RoomEntity>} [entity] - The repository target entity
   */
  constructor(entity: EntityTarget<RoomEntity> = RoomEntity) {
    super(entity);
  }
  
  /**
   * Finds a room by its id
   *
   * @param {String} id - The room id
   * @returns {Promise<RoomEntity|undefined>>}
   */
  public async findById(id: string): Promise<RoomEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
  
  /**
   * Finds a room by its number
   *
   * @param {String} number - The room number
   * @returns {Promise<RoomEntity|undefined>>}
   */
  public async findByNumber(number: number): Promise<RoomEntity|undefined> {
    return this.find({
      where: {
        number
      },
      ...this.findOptions
    });
  }
}