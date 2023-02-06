import { makeError } from '../../../test-utils/errors/make-error';
import { GetAllUsersUseCase } from '../../../../data/useCases/user/getAll-user-usecase';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  getAllUsersUseCase: GetAllUsersUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepositoryStub);
  return { userRepositoryStub, getAllUsersUseCase };
}

describe('GetAllUsersUseCase', () => {
  test('Should throw if UserRepository throws', async () => {
    const { userRepositoryStub, getAllUsersUseCase } = makeSut();
    jest.spyOn(userRepositoryStub, 'getAll').mockReturnValueOnce(makeError());
    const promise = getAllUsersUseCase.execute();
    await expect(promise).rejects.toThrow();
  });

  test('Should return an array of users.', async () => {
    const { getAllUsersUseCase } = makeSut();
    const users = await getAllUsersUseCase.execute();
    expect(users[0]).toBe(fakeUser);
  });
});
