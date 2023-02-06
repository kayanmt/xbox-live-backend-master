import { UserEntityInterface } from '../../domain/entities/user-entity-interface';

export interface UserValidatorInterface {
  validateBody(): void;
  getBody(): UserEntityInterface;
  updateBody(mainUser: UserEntityInterface): UserEntityInterface;
}
