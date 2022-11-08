import { randomUUID } from 'node:crypto';

import {
  CreateDateColumn,
  Entity,
  JoinTable, JoinTableOptions,
  ManyToMany,
  ObjectLiteral,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { SubjectEntity } from './subject.entity';
import { ProfileEntity } from './profile.entity';

const studentsSubjectsJoinTable: JoinTableOptions = {
  name: 'students_subjects',
  joinColumn: {
    name: 'student_id',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'subject_id',
    referencedColumnName: 'id'
  }
}

@Entity('students')
export class StudentEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @OneToOne(() =>
      ProfileEntity,
    (profile) => profile.studentProfile
  )
  profile: ProfileEntity;
  
  @ManyToMany(() =>
    SubjectEntity,
    (subject) => subject.enrolledStudents,
    {
      cascade: true,
      onDelete: 'SET NULL'
    }
  )
  @JoinTable(studentsSubjectsJoinTable)
  subjects?: SubjectEntity[];
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}