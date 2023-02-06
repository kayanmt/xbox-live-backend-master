import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';

export interface GetAllUsersUseCaseInterface {
  execute(): Promise<UserEntityInterface[] | []>;
}
