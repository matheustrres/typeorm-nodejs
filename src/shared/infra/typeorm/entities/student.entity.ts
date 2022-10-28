import { randomUUID } from 'node:crypto';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ObjectLiteral,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { SubjectEntity } from './subject.entity';

@Entity('students')
export class StudentEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  email: string;
  
  @Column({ type: 'text' })
  password: string;
  
  @ManyToMany(() => SubjectEntity, (subject) => subject.enrolledStudents)
  subjects: SubjectEntity[];
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}