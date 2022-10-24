import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { RoomEntity } from './room.entity';

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne((): typeof RoomEntity =>
    RoomEntity,
    (room: RoomEntity): VideoEntity[] => room.videos
  )
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;
}