import { randomUUID } from 'node:crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { RoomEntity } from './room.entity';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;

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

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor() {
    super();
    
    if (!this.id) this.id = randomUUID();
  } 
}