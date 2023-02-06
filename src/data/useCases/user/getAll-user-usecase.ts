import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';
import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { GetAllUsersUseCaseInterface } from 'src/data/abstract/user/getAll-user-interface';

export class GetAllUsersUseCase implements GetAllUsersUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(): Promise<UserEntityInterface[] | []> {
    return await this.repository.getAll();
  }
}
