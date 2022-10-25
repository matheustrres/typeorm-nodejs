import { BaseRepository, FilterOptions } from './base.repository';

/**
 * An abstract class for a main TypeORM repository class to implement
 * 
 * @abstract 
 * @template {Object} T - The DTO for its entity  
 * @template {Object} E - A TypeORM Entity
 */
export abstract class MainRepository<T, E> implements BaseRepository<T, E> {
  public abstract create(data: T): Promise<E>;
  public abstract find(options: FilterOptions): Promise<E>;
}