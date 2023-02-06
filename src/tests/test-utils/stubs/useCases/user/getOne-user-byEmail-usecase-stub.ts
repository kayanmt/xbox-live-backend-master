import { fakeUser } from '../../../../test-utils/fake-entities/fake-user';
import { GetOneUserByEmailUseCaseInterface } from '../../../../../data/abstract/user/getOne-user-byEmail-interface';
import { UserEntityInterface } from '../../../../../domain/entities/user-entity-interface';

export class GetOneUserByEmailUseCaseStub
  implements GetOneUserByEmailUseCaseInterface
{
  async execute(): Promise<UserEntityInterface | void> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}
