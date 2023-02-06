import { DeleteUserUseCaseInterface } from '../../../../../data/abstract/user/delete-user-interface';

export class DeleteUserUseCaseStub implements DeleteUserUseCaseInterface {
  async execute(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
}
