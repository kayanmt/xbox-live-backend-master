import { fakeUser } from '../../../../test-utils/fake-entities/fake-user';
import { GetOneUserByIdUseCaseInterface } from '../../../../../data/abstract/user/getOne-user-byId-interface';
import { UserEntityInterface } from '../../../../../domain/entities/user-entity-interface';

export class GetOneUserByIdUseCaseStub
  implements GetOneUserByIdUseCaseInterface
{
  async execute(): Promise<UserEntityInterface | void> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}
