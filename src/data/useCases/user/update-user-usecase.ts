import { UserDto } from '../../../domain/dtos/user-dto';
import { UserRepositoryInterface } from '../../../infra/repositories/abstract/user-repository-interface';
import { UpdateUserUseCaseInterface } from '../../abstract/user/update-user-interface';
import { UserEntity } from '../../../entities/user-entity';
import { InvalidParamError } from '../../../utils/errors';

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(body: UserDto, id: string): Promise<boolean> {
    const foundUser = await this.repository.getOneById(id);

    if (foundUser) {
      if (body.email) {
        const foundUserWithTheSameEmail = await this.repository.getOneByEmail(
          body.email,
        );
        if (
          foundUserWithTheSameEmail &&
          foundUserWithTheSameEmail.id !== foundUser.id
        ) {
          throw new InvalidParamError(
            'Email already registered in another account.',
          );
        }
      }

      const updatedBody = new UserEntity(body).updateBody(foundUser);
      const updatedUser = await this.repository.update(updatedBody, id);

      if (updatedUser) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new InvalidParamError('ID');
    }
  }
}
