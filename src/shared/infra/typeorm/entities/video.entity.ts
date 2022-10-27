import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectLiteral,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { RoomEntity } from './room.entity';

@Entity('videos')
export class VideoEntity implements ObjectLiteral {
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
    if (!this.id) this.id = randomUUID();
  } 
}