import { EntityTarget, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

import { MainRepository } from '../main.repository';

import {
  DatabaseError,
  DatabaseInternalError,
  DatabaseValidationError
} from '@/src/shared/utils/errors/database.error';

import { Logger } from '@/src/shared/utils/logger';

import { AppDataSource } from '@/src/shared/infra/typeorm/data-source';

/**
 * A TypeORM repository abstract class for repository classes to extend
 * 
 * @abstract
 * @template {Object} E - A TypeORM entity that must extend BaseEntity
 * @template {Object} T - A Dto which extends E 
 */
export abstract class TypeORMRepository<E extends ObjectLiteral> extends MainRepository<E> {
  private logger: Logger;
  private entityRepository: Repository<E>;

  protected constructor(private entityTarget: EntityTarget<E>) {
    super();

    this.logger = Logger.it(this.constructor.name);
    this.entityRepository = AppDataSource.getRepository(this.entityTarget);
  }

  // @ts-ignore
  public async create(data: E): Promise<E> {
    try {
      const record = this.entityRepository.create(data);
      await this.entityRepository.save(record);
      
      return record;
    } catch (error) {
      this.handleError(error);
    }
  }

  // @ts-ignore
  public async find(options: FindOneOptions<E>): Promise<E> {
    try {
      return await this.entityRepository.findOne(options);
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

    throw new DatabaseInternalError('Something unexpected happened to the database');
  }
}