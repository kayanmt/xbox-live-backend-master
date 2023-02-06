import { ProfileEntityInterface } from 'src/domain/entities/profile-entity-interface';

export interface GetOneProfileUseCaseInterface {
  execute(
    profileId: string,
    userId: string,
  ): Promise<ProfileEntityInterface | void>;
}
