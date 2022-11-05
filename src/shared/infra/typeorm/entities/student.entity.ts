import { randomUUID } from 'node:crypto';

import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  ObjectLiteral,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { SubjectEntity } from './subject.entity';
import { ProfileEntity } from './profile.entity';

@Entity('students')
export class StudentEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @OneToOne(() =>
      ProfileEntity,
    (profile) => profile.studentProfile
  )
  profile: ProfileEntity;
  
  @ManyToMany(() => SubjectEntity, (subject) => subject.enrolledStudents)
  subjects?: SubjectEntity[];
  
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}