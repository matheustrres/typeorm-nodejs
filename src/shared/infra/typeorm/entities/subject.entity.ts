import { randomUUID } from 'node:crypto'; 
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  JoinTableOptions,
  ManyToMany,
  ObjectLiteral,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { RoomEntity } from './room.entity';

const joinTableOptions: JoinTableOptions = {
  name: 'room_subject',
  joinColumn: {
    name: 'room_id',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'subject_id',
    referencedColumnName: 'id'
  }
}

@Entity('subjects')
export class SubjectEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;

  @Column({ type: 'text' })
  name: string;

  @ManyToMany((): typeof RoomEntity => 
    RoomEntity,
    (room: RoomEntity): SubjectEntity[] => room.subjects
  )
  @JoinTable(joinTableOptions)
  rooms: RoomEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}