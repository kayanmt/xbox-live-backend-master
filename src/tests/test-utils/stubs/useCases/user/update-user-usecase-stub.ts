import { UpdateUserUseCaseInterface } from 'src/data/abstract/user/update-user-interface';

export class UpdateUserUseCaseStub implements UpdateUserUseCaseInterface {
  async execute(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
}
