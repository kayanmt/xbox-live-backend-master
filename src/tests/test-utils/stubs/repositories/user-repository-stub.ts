import { UserEntityInterface } from '../../../../domain/entities/user-entity-interface';
import { UserRepositoryInterface } from '../../../../infra/repositories/abstract/user-repository-interface';
import { fakeUser } from '../../fake-entities/fake-user';

export class UserRepositoryStub implements UserRepositoryInterface {
  create(): Promise<UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
  getOneByEmail(): Promise<void | UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
  getOneById(): Promise<void | UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
  getAll(): Promise<UserEntityInterface[] | []> {
    return new Promise((resolve) => resolve([fakeUser]));
  }
  update(): Promise<void | UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
  delete(): Promise<void | UserEntityInterface> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}
