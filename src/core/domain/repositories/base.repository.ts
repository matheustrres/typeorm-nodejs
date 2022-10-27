import { FindOneOptions } from 'typeorm';

/**
 * Interface for an abstract repository class to implement
 * 
 * @interface
 * @template {Object} E - A TypeORM entity
 */
export interface BaseRepository<E> {
  create(data: E): Promise<E>;
  find(options: FindOneOptions<E>): Promise<E | undefined>;
  findById(id: string): Promise<E | undefined>;
  update(id: string, data: E): Promise<void>
}