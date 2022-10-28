import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectLiteral,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { SubjectEntity } from './subject.entity';

@Entity('rooms')
export class RoomEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne((): typeof SubjectEntity =>
    SubjectEntity,
    (subject: SubjectEntity): RoomEntity => subject.room
  )
  subject?: SubjectEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}