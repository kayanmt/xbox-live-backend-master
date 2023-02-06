import { TokenHandlerInterface } from '../../utils/abstract/adapters/token-handler-interface';
import { UserEntityInterface } from '../../domain/entities/user-entity-interface';
import { UnauthorizedError } from '../../utils/errors';
import { AuthMiddlewareInterface } from '../abstract/middlewares/auth-middleware-interface';
import { HttpRequest } from '../controllers/profile/interface-imports';

export class AuthMiddleware implements AuthMiddlewareInterface {
  constructor(private readonly tokenHandler: TokenHandlerInterface) {}

  async auth(httpRequest: HttpRequest): Promise<UserEntityInterface> {
    try {
      const authorization = httpRequest.authorization;

      if (!authorization) {
        throw new UnauthorizedError('Invalid Token');
      }

      const split = authorization.split(' ');

      if (!split || split[0] !== 'Bearer' || split.length !== 2) {
        throw new UnauthorizedError('Invalid Token');
      }

      const user = await this.tokenHandler.validateToken(split[1]);

      return user;
    } catch (error) {
      throw new UnauthorizedError('Invalid Token');
    }
  }
}
