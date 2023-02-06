import { LoginAuthUseCaseInterface } from '../../../../../data/abstract/auth/login-auth-interface';

export class LoginAuthUseCaseStub implements LoginAuthUseCaseInterface {
  async execute(): Promise<string | null> {
    return new Promise((resolve) => resolve('auth_token'));
  }
}
