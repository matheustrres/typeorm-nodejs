export type FilterOptions = Record<string, unknown>;

/**
 * Interface for an abstract repository class to implement
 * 
 * @interface
 * @template {Object} T - The DTO for its entity  
 * @template {Object} E - A TypeORM Entity
 */
export interface BaseRepository<T, E> {
  create(data: T): Promise<E>;
  find(options: FilterOptions): Promise<E | undefined>;
}