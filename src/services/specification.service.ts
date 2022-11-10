import { SpecificationRepository } from '@/src/core/domain/repositories/typeorm/interfaces';
import { ORMSpecificationRepository } from '@/src/core/infra/repositories/implementations/specification.repository';
import { CreateSpecificationDto } from '@/src/core/domain/dtos/specification.dto';
import { SpecificationEntity } from '@/src/shared/infra/typeorm/entities/specification.entity';
import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

export class SpecificationService {
  constructor(private repository: SpecificationRepository = new ORMSpecificationRepository()) {}
  
  public async create(data: CreateSpecificationDto): Promise<SpecificationEntity> {
    const specificationAlreadyExists: SpecificationEntity = await this.repository.findByName(data.name);
    
    if (specificationAlreadyExists) {
      throw new DatabaseValidationError(
        'Unsuccessful specification creation',
        {
          description: 'A specification already exists with the given name',
          type: 'DUPLICATED'
        }
      );
    }
    
    return this.repository.create(data);
  }
}