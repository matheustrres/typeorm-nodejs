import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository
} from 'typeorm';

import { SubjectEntity } from '../entities/subject.entity';

import { DatabaseValidationError } from '@/src/shared/utils/errors/database.error';

@EventSubscriber()
export class SubjectSubscriber implements EntitySubscriberInterface<SubjectEntity> {
  public listenTo(): typeof SubjectEntity {
    return SubjectEntity;
  }

  public async beforeInsert(event: InsertEvent<SubjectEntity>): Promise<void> {
    const repository: Repository<SubjectEntity> = event.manager.getRepository(SubjectEntity);

    const subjectExists: SubjectEntity = await repository.findOne({
      where: {
        name: event.entity.name
      }
    });

    if (subjectExists)
      throw new DatabaseValidationError(
        'Subject already exists with the given name'
      );
  }
}