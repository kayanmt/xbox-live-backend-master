import { GetAllUsersUseCaseInterface } from '../../../../../data/abstract/user/getAll-user-interface';
import { UserEntityInterface } from '../../../../../domain/entities/user-entity-interface';
import { fakeUser } from '../../../../test-utils/fake-entities/fake-user';

export class GetAllUsersUseCaseStub implements GetAllUsersUseCaseInterface {
  async execute(): Promise<UserEntityInterface[] | []> {
    return new Promise((resolve) => resolve([fakeUser]));
  }
}
