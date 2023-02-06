import { UserDto } from '../../../domain/dtos/user-dto';

export interface CreateUserUseCaseInterface {
  execute(body: UserDto): Promise<boolean>;
}
