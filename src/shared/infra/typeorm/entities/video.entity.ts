import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  url: string;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}