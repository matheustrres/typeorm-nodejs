import { FindOneOptions } from 'typeorm';

/**
 * Interface for an abstract repository class to implement
 * 
 * @interface
 * @template {Object} E - A TypeORM Entity
 * @template {Object} T - The DTO for its entity 
 */
export interface BaseRepository<E, T> {
  create(data: T): Promise<E>;
  find(options: FindOneOptions<E>): Promise<E | undefined>;
}