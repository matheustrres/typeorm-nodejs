import { EntityTarget } from 'typeorm';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

import { TypeORMRepository } from '@/src/core/domain/repositories/typeorm/typeorm.repository';

export class ORMRoomRepository extends TypeORMRepository<RoomEntity> implements RoomRepository {
  constructor(entity: EntityTarget<RoomEntity> = RoomEntity) {
    super(entity);
  }
  
  public async findByName(name: string): Promise<RoomEntity | undefined> {
    return this.find({
      where: {
        name
      }
    });
  }
}