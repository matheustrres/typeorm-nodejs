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
 * A TypeORM repository abstract class for repository classes to extend
 *
 * @abstract
 * @template {Object} E - A TypeORM entity that implements ObjectLiteral
 */
export abstract class TypeORMRepository<E extends ObjectLiteral> extends MainRepository<E> {
  private logger: Logger;
  private entityRepository: Repository<E>;

  protected constructor(entityTarget: EntityTarget<E>) {
    super();

    this.logger = Logger.it(this.constructor.name);
    this.entityRepository = AppDataSource.getRepository(entityTarget);
  }
  
  public async create(data: E): Promise<E> {
    const record = this.entityRepository.create(data);
    await this.entityRepository.save(record);
    
    return record;
  }
  
  public async find(options: FindOneOptions<E>): Promise<E> {
    return await this.entityRepository.findOne(options);
  }
  
  public async findById(id: string): Promise<E> {
    return await this.entityRepository.findOneById(id)
  }
  
  public async update(data: E): Promise<void> {
    await this.entityRepository.save(data);
  }
}