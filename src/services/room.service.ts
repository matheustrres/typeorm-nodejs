import { CreateRoomDto } from '@/src/core/domain/dtos/room.dto';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { ORMRoomRepository } from '@/src/core/infra/repositories/implementations/room.repository';
import { RoomRepository } from '@/src/core/domain/repositories/typeorm/interfaces';

export class RoomService {
  constructor(private repository: RoomRepository = new ORMRoomRepository()) {}
  
  public async create(data: CreateRoomDto) {
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
    
    return await this.repository.create(data);
  }
  
  public async findById(id: string): Promise<RoomEntity> {
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
    
    return room;
  }
  
  public async list(take: number = 10, skip: number = 1): Promise<RoomEntity[]> {
    const rooms = await this.repository.list(take, skip);
    
    if (!rooms.length) {
      throw new DatabaseValidationError(
        'Unsuccessful rooms listing',
        {
          description: 'No room records were found'
        }
      );
    }
    
    return rooms;
  }
}