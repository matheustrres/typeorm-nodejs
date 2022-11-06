import { EntityTarget, FindOneOptions } from 'typeorm';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

export class ORMRoomRepository extends TypeORMRepository<RoomEntity> implements RoomRepository {
  private findOptions: FindOneOptions<RoomEntity> = {
    relations: {
      subject: true,
      specifications: true
    }
  }
  
  constructor(entity: EntityTarget<RoomEntity> = RoomEntity) {
    super(entity);
  }
  
  public async findById(id: string): Promise<RoomEntity|undefined> {
    return this.find({
      where: {
        id
      },
      ...this.findOptions
    });
  }
  
  public async findByNumber(number: number): Promise<RoomEntity|undefined> {
    return this.find({
      where: {
        number
      },
      ...this.findOptions
    });
  }
}