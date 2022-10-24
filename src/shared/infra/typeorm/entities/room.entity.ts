import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}