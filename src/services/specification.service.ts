import { BaseService } from './base.service';

import { CreateSpecificationDto } from '@/src/core/domain/dtos/specification.dto';

import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

import { SpecificationRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMSpecificationRepository } from '@/src/core/infra/repositories/implementations/specification.repository';

export class SpecificationService extends BaseService {
  constructor(private repository: SpecificationRepository = new ORMSpecificationRepository()) {
    super();
  }

  /**
   * Creates a specification
   * 
   * @param {CreateSpecificationDto} data - The specification data
   * @param {String} data.name - The specification name
   * @param {String} [data.description] - The specification description 
   * @returns {Promise<SpecificationEntity>}
   */
  public async create(data: CreateSpecificationDto): Promise<SpecificationEntity> {
    const specificationAlreadyExists: SpecificationEntity = await this.repository.findByName(data.name);

    if (specificationAlreadyExists) {
      throw new DatabaseValidationError('Unsuccessful specification creation', {
        description: 'A specification already exists with the given name',
        type: 'DUPLICATED'
      });
    }

    return this.repository.create(data);
  }

  /**
   * Deletes a specification 
   * 
   * @param {String} id - The specification id
   * @returns {Promise<void>} 
   */
  public async delete(id: string): Promise<void> {
    const cachedSpecification: SpecificationEntity = await this.cacheManager.get<
      SpecificationEntity
    >(this.getCacheKey(id));

    if (cachedSpecification) {
      await this.cacheManager.delete(this.getCacheKey(id));
    }

    const specification: SpecificationEntity = await this.findById(id);

    await this.repository.delete(specification.id);
  }

  /**
   * Finds a specification by its id
   * 
   * @param {String} id - The specification id 
   * @returns {Promise<SpecificationEntity>}
   */
  public async findById(id: string): Promise<SpecificationEntity> {
    const cachedSpecification: SpecificationEntity = await this.cacheManager.get<
      SpecificationEntity
    >(this.getCacheKey(id));

    if (cachedSpecification) 
      return cachedSpecification;

    const specification: SpecificationEntity = await this.repository.findById(id);

    if (!specification) {
      throw new DatabaseValidationError('Unsuccessful specification search', {
        description: 'No specification were found the given ID',
        type: 'INVALID'
      });
    }

    await this.cacheManager.set<
      SpecificationEntity
    >(this.getCacheKey(id), specification);

    return specification;
  }

  /**
   * List all specification records
   * 
   * @param {Number} [skip] - Number of profiles that should be skipped
   * @param {Number} [take] - Number of profiles that should be taken
   * @returns {Promise<SpecificationEntity[]>}
   */
  public async list(skip: number = 0, take: number = 10): Promise<SpecificationEntity[]> {
    const specifications: SpecificationEntity[] = await this.repository.list(skip, take);

    if (!specifications.length) {
      throw new DatabaseValidationError('Unsuccessful specifications listing', {
        description: 'No specification records were found',
        type: 'INVALID'
      });
    }

    return specifications;
  }

  public getCacheKey(id: string): string {
    return `--specification-${id}`;
  }
}