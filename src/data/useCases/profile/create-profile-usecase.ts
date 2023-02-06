import { CreateProfileUseCaseInterface } from '../../abstract/profile/create-profile-interface';
import { ProfileDto } from '../../../domain/dtos/profile-dto';
import { ProfileEntity } from '../../../entities/profile-entity';
import { ProfileRepositoryInterface } from '../../../infra/repositories/abstract/profile-repository-interface';

export class CreateProfileUseCase implements CreateProfileUseCaseInterface {
  constructor(private readonly repository: ProfileRepositoryInterface) {}

  async execute(body: ProfileDto): Promise<boolean> {
    const profileBody = new ProfileEntity(body);
    profileBody.validateBody();

    const createdProfile = await this.repository.create(profileBody.getBody());
    if (createdProfile) {
      return true;
    } else {
      return false;
    }
  }
}
