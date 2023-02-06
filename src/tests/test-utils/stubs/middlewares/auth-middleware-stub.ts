import { UserEntityInterface } from '../../../../domain/entities/user-entity-interface';
import { AuthMiddlewareInterface } from '../../../../presentation/abstract/middlewares/auth-middleware-interface';
import { fakeUser } from '../../fake-entities/fake-user';

export class AuthMiddlewareStub implements AuthMiddlewareInterface {
  async auth(): Promise<UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}
