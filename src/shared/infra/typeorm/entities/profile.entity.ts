import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  ObjectLiteral,
  PrimaryColumn
} from 'typeorm';

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
    default: ProfileAccountType.DEFAULT
  })
  accountType?: ProfileAccountType;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}