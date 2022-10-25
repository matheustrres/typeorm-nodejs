import { randomUUID } from 'node:crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { SubjectEntity } from './subject.entity';
import { VideoEntity } from './video.entity';

@Entity('rooms')
export class RoomEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany((): typeof VideoEntity =>
    VideoEntity,
    (video: VideoEntity): RoomEntity => video.room
  )
  videos: VideoEntity[];

  @ManyToMany((): typeof SubjectEntity => 
    SubjectEntity,
    (subject: SubjectEntity): RoomEntity[] => subject.rooms
  )
  subjects: SubjectEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor() {
    super();
    
    if (!this.id) this.id = randomUUID();
  } 
}