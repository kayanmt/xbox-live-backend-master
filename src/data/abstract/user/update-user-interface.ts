import { UserDto } from '../../../domain/dtos/user-dto';

export interface UpdateUserUseCaseInterface {
  execute(body: UserDto, id: string): Promise<boolean>;
}
