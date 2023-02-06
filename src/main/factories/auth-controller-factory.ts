import { LoginAuthUseCase } from 'src/data/useCases/auth/login-auth-usecase';
import { UserRepository } from 'src/infra/repositories/user-repository';
import { AuthControllerInterface } from 'src/presentation/abstract/controllers/auth-controller-interface';
import { AuthController } from 'src/presentation/controllers/auth/auth-controller';
import { HasherAdapter } from 'src/utils/adapters/hasher-adapter';
import { makeTokenHandler } from './token-handler-factory';

export function makeAuthControllerFactory(): AuthControllerInterface {
  const repository = new UserRepository();

  const hasher = new HasherAdapter();

  const loginAuthUseCase = new LoginAuthUseCase(
    repository,
    hasher,
    makeTokenHandler(),
  );

  return new AuthController(loginAuthUseCase);
}
