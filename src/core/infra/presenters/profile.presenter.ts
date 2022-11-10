import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';

export interface ProfileResponse extends Omit<ProfileEntity, 'password'> {}

export class ProfilePresenter {
  public static handleSingleInstance(profile: ProfileEntity): ProfileResponse {
    return {
      ...{
        id: profile.id,
        name: profile.name,
        email: profile.email,
        accountType: profile.accountType
      },
      ...(
        profile.studentProfile && {
          studentProfile: profile.studentProfile
        }
      ),
      ...{
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    }
  }
  
  public static handleMultipleInstances(profiles: ProfileEntity[]): ProfileResponse[] {
    return profiles.map(ProfilePresenter.handleSingleInstance);
  }
}