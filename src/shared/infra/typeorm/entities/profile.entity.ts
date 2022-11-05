import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinColumnOptions,
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

const profileStudentJoinColumn: JoinColumnOptions = {
  name: 'profile_student',
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'fk_profile_student'
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
  
  @OneToOne(() =>
    StudentEntity,
    (student) => student.profile,
    {
      cascade: true,
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn(profileStudentJoinColumn)
  studentProfile?: StudentEntity
  
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}