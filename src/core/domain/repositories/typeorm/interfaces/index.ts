import { BaseRepository } from '@/src/core/domain/repositories/base.repository';

import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';
import { RoomEntity } from '@/src/shared/infra/typeorm/entities/room.entity';
import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';
import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface ProfileRepository extends BaseRepository<ProfileEntity> {
  findById(id: string): Promise<ProfileEntity|undefined>;
  findByEmail(email: string): Promise<ProfileEntity|undefined>;
}

export interface RoomRepository extends BaseRepository<RoomEntity> {
  findById(id: string): Promise<RoomEntity|undefined>;
  findByNumber(number: number): Promise<RoomEntity|undefined>;
}

export interface StudentRepository extends BaseRepository<StudentEntity> {
  findById(id: string): Promise<StudentEntity|undefined>;
}

export interface SubjectRepository extends BaseRepository<SubjectEntity> {
  findByName(name: string): Promise<SubjectEntity|undefined>;
  findById(id: string): Promise<SubjectEntity|undefined>;
}