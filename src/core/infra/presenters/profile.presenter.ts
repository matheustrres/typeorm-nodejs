import { ProfileEntity } from '@/src/shared/infra/typeorm/entities/profile.entity';

export interface ProfileResponse extends Omit<ProfileEntity, 'password'> {}

export class ProfilePresenter {
  public static handle(profile: ProfileEntity): ProfileResponse {
    return {
      ...{
        id: profile.id,
        name: profile.name,
        email: profile.email,
        accountType: profile.accountType,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      },
      ...(
        profile.studentProfile && {
          studentProfile: profile.studentProfile
        }
      )
    }
  }
  
  public static handleListing(profiles: ProfileEntity[]): ProfileResponse[] {
    const handledProfiles: ProfileResponse[] = [];
    
    for (const profile of profiles) {
      handledProfiles.push(
        ProfilePresenter.handle(profile)
      );
    }
    
    return handledProfiles;
  }
}