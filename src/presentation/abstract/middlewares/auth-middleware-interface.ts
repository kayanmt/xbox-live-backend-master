import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';
import { HttpRequest } from 'src/domain/http/http-request';

export interface AuthMiddlewareInterface {
  auth(httpRequest: HttpRequest): Promise<UserEntityInterface>;
}
