import { GetAllProfilesUseCaseInterface } from '../../abstract/profile/getAll-profile-interface';
import { ProfileRepositoryInterface } from '../../../infra/repositories/abstract/profile-repository-interface';
import { ProfileEntityInterface } from '../../../domain/entities/profile-entity-interface';

export class GetAllProfilesUseCase implements GetAllProfilesUseCaseInterface {
  constructor(private readonly repository: ProfileRepositoryInterface) {}

  async execute(userId: string): Promise<ProfileEntityInterface[]> {
    const foundProfiles = await this.repository.getAll();

    if (foundProfiles.length !== 0) {
      return foundProfiles.filter((profile) => profile.userId === userId);
    } else {
      return [];
    }
  }
}
