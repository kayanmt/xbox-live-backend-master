import { UserDto } from '../../../domain/dtos/user-dto';
import { UserRepositoryInterface } from '../../../infra/repositories/abstract/user-repository-interface';
import { CreateUserUseCaseInterface } from '../../../data/abstract/user/create-user-interface';
import { UserEntity } from '../../../entities/user-entity';
import { InvalidParamError } from '../../../utils/errors';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(body: UserDto): Promise<boolean> {
    const userBody = new UserEntity(body);
    userBody.validateBody();
    const newUser = userBody.getBody();

    const foundUser = await this.repository.getOneByEmail(newUser.email);
    if (foundUser && foundUser.email === newUser.email) {
      throw new InvalidParamError('Email already registered.');
    }

    const createdUser = await this.repository.create(newUser);
    if (createdUser) {
      return true;
    } else {
      return false;
    }
  }
}
