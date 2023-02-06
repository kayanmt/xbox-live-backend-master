import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';

export interface TokenHandlerInterface {
  generateToken(userId: string): string;
  validateToken(token: string): Promise<UserEntityInterface>;
}
