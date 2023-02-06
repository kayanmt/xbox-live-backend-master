import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { makeError } from '../../../test-utils/errors/make-error';
import { GetOneUserByIdUseCase } from '../../../../data/useCases/user/getOne-user-byId-usecase';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  getOneUserByIdUseCase: GetOneUserByIdUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const getOneUserByIdUseCase = new GetOneUserByIdUseCase(userRepositoryStub);
  return { userRepositoryStub, getOneUserByIdUseCase };
}

describe('GetOneUserByEmailUseCase', () => {
  test('Should call UserRepository with correct value.', async () => {
    const { userRepositoryStub, getOneUserByIdUseCase } = makeSut();
    const getOneSpy = jest.spyOn(userRepositoryStub, 'getOneById');
    await getOneUserByIdUseCase.execute(fakeUser.id);
    expect(getOneSpy).toHaveBeenCalledWith(fakeUser.id);
  });

  test('Should throw if UserRepository throws.', async () => {
    const { userRepositoryStub, getOneUserByIdUseCase } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneById')
      .mockReturnValueOnce(makeError());
    const promise = getOneUserByIdUseCase.execute(fakeUser.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should return a user if called with correct user ID.', async () => {
    const { getOneUserByIdUseCase } = makeSut();
    const promise = await getOneUserByIdUseCase.execute(fakeUser.id);
    expect(promise).toBe(fakeUser);
  });
});
