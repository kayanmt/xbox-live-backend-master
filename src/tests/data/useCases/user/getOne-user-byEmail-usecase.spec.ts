import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { GetOneUserByEmailUseCase } from '../../../../data/useCases/user/getOne-user-byEmail-usecase';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { makeError } from '../../../test-utils/errors/make-error';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  getOneUserByEmailUseCase: GetOneUserByEmailUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const getOneUserByEmailUseCase = new GetOneUserByEmailUseCase(
    userRepositoryStub,
  );
  return { userRepositoryStub, getOneUserByEmailUseCase };
}

describe('GetOneUserByEmailUseCase', () => {
  test('Should call UserRepository with correct value.', async () => {
    const { userRepositoryStub, getOneUserByEmailUseCase } = makeSut();
    const getOneSpy = jest.spyOn(userRepositoryStub, 'getOneByEmail');
    await getOneUserByEmailUseCase.execute(fakeUser.email);
    expect(getOneSpy).toHaveBeenCalledWith(fakeUser.email);
  });

  test('Should throw if UserRepository throws.', async () => {
    const { userRepositoryStub, getOneUserByEmailUseCase } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneByEmail')
      .mockReturnValueOnce(makeError());
    const promise = getOneUserByEmailUseCase.execute(fakeUser.email);
    await expect(promise).rejects.toThrow();
  });

  test('Should return a user if called with correct user email.', async () => {
    const { getOneUserByEmailUseCase } = makeSut();
    const promise = await getOneUserByEmailUseCase.execute(fakeUser.email);
    expect(promise).toBe(fakeUser);
  });
});
