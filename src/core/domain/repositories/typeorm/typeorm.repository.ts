import {
  EntityTarget,
  FindOneOptions,
  ObjectLiteral,
  Repository
} from 'typeorm';

import { MainRepository } from '../main.repository';

import { Logger } from '@/src/shared/utils/logger';

import { AppDataSource } from '@/src/shared/infra/typeorm/data-source';

/**
 * Represents the main abstract TypeORM repository class to be extended
 *
 * @template {E}
 * @extends MainRepository
 */
export abstract class TypeORMRepository<E extends ObjectLiteral> extends MainRepository<E> {
  private logger: Logger;
  private entityRepository: Repository<E>;
  
  /**
   * Creates a new TypeORMRepository instance
   *
   * @protected
   * @param {EntityTarget<E>} entityTarget - The entity for the repository that extends
   */
  protected constructor(entityTarget: EntityTarget<E>) {
    super();

    this.logger = Logger.it(this.constructor.name);
    this.entityRepository = AppDataSource.getRepository(entityTarget);
  }
  
  /**
   * Creates a new record from the entity target
   *
   * @param {E} data - Its creation data
   * @returns {Promise<E>}
   */
  public async create(data: E): Promise<E> {
    const record = this.entityRepository.create(data);
    await this.entityRepository.save(record);
    
    return record;
  }
  
  /**
   * Lists all records from the entity target
   *
   * @param {Number} [skip] - Number of entities that should be skipped
   * @param {Number} [take] - Number of entities that should be taken
   * @returns {Promise<E[]|undefined>>}
   */
  public async list(skip?: number, take?: number): Promise<E[]|undefined> {
    return this.entityRepository.find({
      skip,
      take
    });
  }
  
  /**
   * Finds a record from the entity target
   *
   * @param {FindOneOptions<E>} options - The search options
   * @returns {Promise<E|undefined>}
   */
  public async find(options: FindOneOptions<E>): Promise<E|undefined> {
    return await this.entityRepository.findOne(options);
  }
  
  /**
   * Updates a record from the entity target
   *
   * @param {E} data - The record data
   * @returns {Promise<void>}
   */
  public async update(data: E): Promise<void> {
    await this.entityRepository.save(data);
  }
}