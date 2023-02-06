import { UserEntityInterface } from '../../../../domain/entities/user-entity-interface';
import { TokenHandlerInterface } from '../../../../utils/abstract/adapters/token-handler-interface';
import { fakeUser } from '../../fake-entities/fake-user';

export class TokenHandlerAdapterStub implements TokenHandlerInterface {
  generateToken(): string {
    return 'generated_token';
  }
  validateToken(): Promise<UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}
