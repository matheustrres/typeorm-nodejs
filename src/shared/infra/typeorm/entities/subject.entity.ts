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
  @PrimaryColumn({ type: 'uuid', default: randomUUID() })
  id?: string;

  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  taughtBy: string;

  @OneToOne((): typeof RoomEntity =>
    RoomEntity,
    (room: RoomEntity): SubjectEntity => room.subject
  )
  @JoinColumn(subjectRoomJoinColumn)
  room?: RoomEntity;

  @ManyToMany((): typeof StudentEntity =>
    StudentEntity,
    (student: StudentEntity) => student.subjects
  )
  @JoinTable(subjectStudentsJoinTable)
  enrolledStudents?: StudentEntity[];
  
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}