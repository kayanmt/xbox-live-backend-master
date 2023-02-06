import { ProfileDto } from '../../../domain/dtos/profile-dto';

export interface CreateProfileUseCaseInterface {
  execute(body: ProfileDto): Promise<boolean>;
}
