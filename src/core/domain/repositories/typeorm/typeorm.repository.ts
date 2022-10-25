import { BaseEntity } from 'typeorm';

import { FilterOptions } from '../base.repository';
import { MainRepository } from '../main.repository';

import { 
  DatabaseError, 
  DatabaseInternalError, 
  DatabaseValidationError 
} from '@/src/shared/utils/errors/database.error';

import { Logger } from '@/src/shared/utils/logger';

/**
 * A TypeORM repository abstract class for repository classes to extend
 * 
 * @abstract
 * @template {Object} T - The DTO for its entity  
 * @template {Object} E - A TypeORM entity that must extend BaseEntity
 */
export abstract class TypeORMRepository<T, E extends BaseEntity> extends MainRepository<T, E> {
  private logger: Logger;

  constructor(private entity: E) {
    super();

    this.logger = Logger.it(this.constructor.name);
  }

  public async create(data: T): Promise<E> {
    try {
      const record: E = await this.entity.save({ data });

      return record;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async find(options: FilterOptions): Promise<E> {
    try {
      const record: E = await this.entity.recover({
        data: {
          options
        }
      });

      return record;
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: unknown): void {
    if (
      error instanceof DatabaseError &&
      error.type === 'DUPLICATED'
    ) {
      throw new DatabaseValidationError(error.message);
    }

    this.logger.error('Database internal error: ', error);

    throw new DatabaseInternalError('Something unexpected happend to the database');
  }
}