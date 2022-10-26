import { SubjectDto } from '@/src/core/domain/dtos/subject.dto';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

export interface SubjectRepository extends BaseRepository<SubjectEntity> {
  findById(id: string): Promise<SubjectEntity | undefined>;
  findByName(name: string): Promise<SubjectEntity | undefined>;
}