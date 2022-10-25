import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface ISubjectRepository {
  create(name: string): Promise<SubjectEntity>;
  findById(id: string): Promise<SubjectEntity | undefined>
  findByName(name: string): Promise<SubjectEntity | undefined>;
}