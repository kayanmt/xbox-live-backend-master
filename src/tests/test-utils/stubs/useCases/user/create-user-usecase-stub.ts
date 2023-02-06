import { CreateUserUseCaseInterface } from '../../../../../data/abstract/user/create-user-interface';

export class CreateUserUseCaseStub implements CreateUserUseCaseInterface {
  async execute(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
}
