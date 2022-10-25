import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';
import { SubjectDto } from '@/src/core/domain/dtos/subject.dto';

import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

export interface SubjectRepository extends BaseRepository<SubjectDto, SubjectEntity> {
  findById(id: string): Promise<SubjectEntity | undefined>;
  findByName(name: string): Promise<SubjectEntity | undefined>;
}