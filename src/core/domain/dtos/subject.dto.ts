import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';

export interface SubjectDto {
  id?: string;
  name?: string;
  rooms?: RoomEntity[];
}