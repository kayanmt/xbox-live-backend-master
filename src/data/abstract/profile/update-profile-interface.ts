import { ProfileDto } from '../../../domain/dtos/profile-dto';

export interface UpdateProfileUseCaseInterface {
  execute(
    body: ProfileDto,
    profileId: string,
    userId: string,
  ): Promise<boolean>;
}
