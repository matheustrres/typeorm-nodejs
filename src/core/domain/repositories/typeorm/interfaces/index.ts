import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface RoomRepository extends BaseRepository<RoomEntity> {}

export interface StudentRepository extends BaseRepository<StudentEntity> {}

export interface SubjectRepository extends BaseRepository<SubjectEntity> {
  findByName(name: string): Promise<SubjectEntity | undefined>;
}