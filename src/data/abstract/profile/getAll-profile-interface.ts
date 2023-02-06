import { ProfileEntityInterface } from 'src/domain/entities/profile-entity-interface';

export interface GetAllProfilesUseCaseInterface {
  execute(userId: string): Promise<ProfileEntityInterface[] | []>;
}
