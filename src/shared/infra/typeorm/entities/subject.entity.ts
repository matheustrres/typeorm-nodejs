import { 
  Column, 
  Entity, 
  JoinTable, 
  JoinTableOptions, 
  ManyToMany, 
  PrimaryGeneratedColumn 
} from 'typeorm';

import { RoomEntity } from './room.entity';

const joinTableOptions: JoinTableOptions = {
  name: 'room_subject',
  joinColumn: {
    name: 'room_id',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'subject_id',
    referencedColumnName: 'id'
  }
}

@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  name: string;

  @ManyToMany((): typeof RoomEntity => 
    RoomEntity,
    (room: RoomEntity): SubjectEntity[] => room.subjects
  )
  @JoinTable(joinTableOptions)
  rooms: RoomEntity[];
}