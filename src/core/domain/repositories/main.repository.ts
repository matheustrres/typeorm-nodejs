import { FindOneOptions } from 'typeorm';
import { BaseRepository } from './base.repository';

/**
 * An abstract class for a main TypeORM repository class to implement
 * 
 * @abstract 
 * @template {Object} E - A TypeORM entity
 */
export abstract class MainRepository<E> implements BaseRepository<E> {
  public abstract create(data: E): Promise<E>;
  public abstract find(options: FindOneOptions<E>): Promise<E | undefined>;
  public abstract findById(id: string): Promise<E | undefined>;
  public abstract update(data: E): Promise<void>;
}