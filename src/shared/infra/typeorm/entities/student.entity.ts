import { randomUUID } from 'node:crypto';

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinColumnOptions,
  ManyToMany,
  ObjectLiteral,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { ProfileEntity } from './profile.entity';
import { SubjectEntity } from './subject.entity';

const studentProfileJoinColumn: JoinColumnOptions = {
  name: 'student_profile',
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'fk_student_profile'
}

@Entity('students')
export class StudentEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @ManyToMany(() => SubjectEntity, (subject) => subject.enrolledStudents)
  subjects: SubjectEntity[];
  
  @OneToOne(() =>
    ProfileEntity,
    {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn(studentProfileJoinColumn)
  profile: ProfileEntity;
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}