import { FindOneOptions } from 'typeorm';
import { BaseRepository } from './base.repository';

/**
 * An abstract class for a main TypeORM repository class to implement
 * 
 * @abstract 
 * @template {Object} E - A TypeORM Entity
 * @template {Object} T - The DTO for its entity 
 */
export abstract class MainRepository<T, E> implements BaseRepository<E, T> {
  public abstract create(data: T): Promise<E>;
  public abstract find(options: FindOneOptions<E>): Promise<E>;
}