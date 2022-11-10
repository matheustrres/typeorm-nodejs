import { SubjectEntity } from '@/src/shared/infra/typeorm/entities/subject.entity';

export interface SubjectResponse extends SubjectEntity {}

export class SubjectPresenter {
  public static handleSingleInstance(subject: SubjectEntity): SubjectResponse {
    return {
      ...{
        id: subject.id,
        name: subject.name,
        taughtBy: subject.taughtBy
      },
      ...(
        subject.room && {
          room: subject.room
        }
      ),
      ...(
        subject.enrolledStudents?.length && {
          enrolledStudents: subject.enrolledStudents
        }
      ),
      ...{
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      }
    }
  }
  
  public static handleMultipleInstances(subjects: SubjectEntity[]): SubjectResponse[] {
    return subjects.map(SubjectPresenter.handleSingleInstance);
  }
}