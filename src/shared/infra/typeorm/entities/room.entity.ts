import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { VideoEntity } from './video.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany((): typeof VideoEntity =>
    VideoEntity,
    (video: VideoEntity): RoomEntity => video.room
  )
  videos: VideoEntity[];

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}