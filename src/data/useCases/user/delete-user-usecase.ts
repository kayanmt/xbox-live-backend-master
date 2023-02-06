import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { DeleteUserUseCaseInterface } from 'src/data/abstract/user/delete-user-interface';

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(id: string): Promise<boolean> {
    const deletedUser = await this.repository.delete(id);
    if (deletedUser) {
      return true;
    } else {
      return false;
    }
  }
}
