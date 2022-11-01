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

import { StudentEntity } from './student.entity';

export enum ProfileAccountType {
  ADMIN = 'admin',
  DEFAULT = 'default',
  STUDENT = 'student'
}

@Entity('profiles')
export class ProfileEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  email: string;
  
  @Column({ type: 'text' })
  password: string;
  
  @Column({
    type: 'enum',
    enum: ProfileAccountType,
    default: ProfileAccountType.STUDENT
  })
  accountType?: ProfileAccountType;
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}