import { randomUUID } from 'node:crypto'; 
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinColumnOptions,
  JoinTable,
  JoinTableOptions,
  ManyToMany,
  ObjectLiteral,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { RoomEntity } from './room.entity';
import { StudentEntity } from './student.entity';

const subjectRoomJoinColumn: JoinColumnOptions = {
  name: 'subject_room',
  referencedColumnName: 'id',
  foreignKeyConstraintName: 'fk_subject_room'
}

const subjectStudentsJoinTable: JoinTableOptions = {
  name: 'subject_students',
  joinColumn: {
    name: 'subject_id',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'student_id',
    referencedColumnName: 'id'
  }
}

@Entity('subjects')
export class SubjectEntity implements ObjectLiteral {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;

  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  taughtBy: string;

  @OneToOne(() =>
    RoomEntity,
    (room) => room.subject,
    {
      cascade: true,
      onDelete: 'SET NULL'
    }
  )
  @JoinColumn(subjectRoomJoinColumn)
  room: RoomEntity;

  @ManyToMany(() =>
    StudentEntity,
    (student) => student.subjects,
    {
      cascade: true,
      onDelete: 'SET NULL'
    }
  )
  @JoinTable(subjectStudentsJoinTable)
  enrolledStudents?: StudentEntity[];
  
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}