import { LoginAuthUseCaseInterface } from '../../../data/abstract/auth/login-auth-interface';
import { LoginDto } from '../../../domain/dtos/login-dto';
import { UserRepositoryInterface } from '../../../infra/repositories/abstract/user-repository-interface';
import { HasherInterface } from '../../../utils/abstract/adapters/hasher-interface';
import { TokenHandlerInterface } from '../../../utils/abstract/adapters/token-handler-interface';
import { InvalidParamError } from '../../../utils/errors';

export class LoginAuthUseCase implements LoginAuthUseCaseInterface {
  constructor(
    private readonly repository: UserRepositoryInterface,
    private readonly hasher: HasherInterface,
    private readonly tokenHandler: TokenHandlerInterface,
  ) {}

  async execute(body: LoginDto): Promise<string | null> {
    const foundUser = await this.repository.getOneByEmail(body.email);
    if (foundUser) {
      const comparison = this.hasher.compare(body.password, foundUser.password);

      if (comparison) {
        return this.tokenHandler.generateToken(foundUser.id);
      } else {
        throw new InvalidParamError('Password');
      }
    } else {
      throw new InvalidParamError('Email');
    }
  }
}
