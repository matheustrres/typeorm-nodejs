import { StudentEntity } from '@/src/shared/infra/typeorm/entities/student.entity';

export interface StudentResponse extends StudentEntity {}

export class StudentPresenter {
  public static handleSingleInstance(student: StudentEntity, showProfile: boolean = false): StudentResponse {
    return {
      ...{
        id: student.id,
      },
      ...(
        showProfile && {
          profile: student.profile
        }
      ),
      ...(
        student.subjects?.length && {
          subjects: student.subjects
        }
      ),
      ...{
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      }
    }
  }
}