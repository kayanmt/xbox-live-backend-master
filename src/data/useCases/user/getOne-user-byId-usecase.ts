import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';
import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { GetOneUserByIdUseCaseInterface } from 'src/data/abstract/user/getOne-user-byId-interface';

export class GetOneUserByIdUseCase implements GetOneUserByIdUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserEntityInterface | void> {
    return await this.repository.getOneById(id);
  }
}
