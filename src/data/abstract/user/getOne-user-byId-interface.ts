import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';

export interface GetOneUserByIdUseCaseInterface {
  execute(id: string): Promise<UserEntityInterface | void>;
}
