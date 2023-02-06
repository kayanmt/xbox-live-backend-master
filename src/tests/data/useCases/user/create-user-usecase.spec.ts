import { makeError } from '../../../test-utils/errors/make-error';
import { CreateUserUseCase } from '../../../../data/useCases/user/create-user-usecase';
import {
  fakeUser,
  fakeUserWithoutPassword,
} from '../../../test-utils/fake-entities/fake-user';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

const newFakeUser = { ...fakeUser, email: 'another_email' };

const newFakeUserWithoutPassword = {
  ...fakeUserWithoutPassword,
  email: 'another_email',
};

interface SutTypes {
  createUserUseCase: CreateUserUseCase;
  userRepositoryStub: UserRepositoryStub;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const createUserUseCase = new CreateUserUseCase(userRepositoryStub);
  return { createUserUseCase, userRepositoryStub };
}

describe('CreateUserUseCase', () => {
  test('Should call UserRepository with correct value.', async () => {
    const { createUserUseCase, userRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(userRepositoryStub, 'create');
    await createUserUseCase.execute(newFakeUser);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining(newFakeUserWithoutPassword),
    );
  });

  test('Should throw if UserRepository.create throws.', async () => {
    const { createUserUseCase, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, 'create').mockReturnValueOnce(makeError());
    const promise = createUserUseCase.execute(newFakeUser);
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if foundUser email is equal to the new user email.', async () => {
    const { createUserUseCase, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve(newFakeUser)));
    const promise = createUserUseCase.execute(newFakeUser);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if UserRepository.getOneByEmail throws.', async () => {
    const { createUserUseCase, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneByEmail')
      .mockReturnValueOnce(makeError());
    const promise = createUserUseCase.execute(newFakeUser);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct user.', async () => {
    const { createUserUseCase } = makeSut();
    const promise = await createUserUseCase.execute(newFakeUser);
    expect(promise).toBe(true);
  });
});
