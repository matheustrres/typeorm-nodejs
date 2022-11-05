import { randomUUID } from 'node:crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('specifications')
export class SpecificationEntity {
  @PrimaryColumn({ type: 'uuid' })
  id?: string;
  
  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  description?: string;
  
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}