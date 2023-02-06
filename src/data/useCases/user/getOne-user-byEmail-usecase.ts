import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';
import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { GetOneUserByEmailUseCaseInterface } from 'src/data/abstract/user/getOne-user-byEmail-interface';

export class GetOneUserByEmailUseCase
  implements GetOneUserByEmailUseCaseInterface
{
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(email: string): Promise<UserEntityInterface | void> {
    return await this.repository.getOneByEmail(email);
  }
}
