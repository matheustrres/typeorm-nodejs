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

  public async delete(id: string): Promise<void> {
    const specification: SpecificationEntity = await this.findById(id);

    await this.repository.delete(specification.id);
  }

  public async findById(id: string): Promise<SpecificationEntity> {
    const specification: SpecificationEntity = await this.repository.findById(id);

    if (!specification) {
      throw new DatabaseValidationError('Unsuccessful specification search', {
        description: 'No specification were found the given ID',
        type: 'INVALID'
      });
    }

    return specification;
  }

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