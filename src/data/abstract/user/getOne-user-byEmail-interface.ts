import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';

export interface GetOneUserByEmailUseCaseInterface {
  execute(email: string): Promise<UserEntityInterface | void>;
}
