import { DeleteProfileUseCaseInterface } from '../../abstract/profile/delete-profile-interface';
import { ProfileRepositoryInterface } from '../../../infra/repositories/abstract/profile-repository-interface';
import { InvalidParamError } from '../../../utils/errors';

export class DeleteProfileUseCase implements DeleteProfileUseCaseInterface {
  constructor(private readonly repository: ProfileRepositoryInterface) {}

  async execute(profileId: string, userId: string): Promise<boolean> {
    const foundProfile = await this.repository.getOne(profileId);

    if (foundProfile && foundProfile.userId === userId) {
      const deletedProfile = await this.repository.delete(profileId);
      if (deletedProfile) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new InvalidParamError('ID');
    }
  }
}
