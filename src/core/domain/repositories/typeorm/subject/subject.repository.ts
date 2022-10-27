import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

export interface SubjectRepository extends BaseRepository<SubjectEntity> {
  findByName(name: string): Promise<SubjectEntity | undefined>;
}