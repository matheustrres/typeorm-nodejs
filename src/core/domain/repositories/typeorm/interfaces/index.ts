import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface RoomRepository extends BaseRepository<RoomEntity> {
  findByName(name: string): Promise<RoomEntity | undefined>;
}

export interface StudentRepository extends BaseRepository<StudentEntity> {
  findById(id: string): Promise<StudentEntity | undefined>;
  findByEmail(email: string): Promise<StudentEntity | undefined>;
}

export interface SubjectRepository extends BaseRepository<SubjectEntity> {
  findById(id: string): Promise<SubjectEntity | undefined>;
  findByName(name: string): Promise<SubjectEntity | undefined>;
}