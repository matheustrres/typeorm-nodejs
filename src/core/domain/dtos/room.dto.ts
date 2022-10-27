import { IsNotEmpty, IsString } from 'class-validator';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';

export interface RoomDto extends RoomEntity {}

export class CreateRoomDto implements Pick<RoomDto, 'name' | 'description'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;
}