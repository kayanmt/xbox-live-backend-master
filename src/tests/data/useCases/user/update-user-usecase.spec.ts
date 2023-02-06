import {
  fakeUser,
  fakeUserWithoutPassword,
} from '../../../test-utils/fake-entities/fake-user';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { makeError } from '../../../test-utils/errors/make-error';
import { UpdateUserUseCase } from '../../../../data/useCases/user/update-user-usecase';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  updateUserUseCase: UpdateUserUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const updateUserUseCase = new UpdateUserUseCase(userRepositoryStub);
  return { userRepositoryStub, updateUserUseCase };
}

describe('UpdateUserUseCase', () => {
  test('Should call UserRepository with correct values.', async () => {
    const { userRepositoryStub, updateUserUseCase } = makeSut();
    const updateSpy = jest.spyOn(userRepositoryStub, 'update');
    await updateUserUseCase.execute(fakeUser, fakeUser.id);
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining(fakeUserWithoutPassword),
      fakeUser.id,
    );
  });

  test('Should throw if UserRepository throws.', async () => {
    const { userRepositoryStub, updateUserUseCase } = makeSut();
    jest.spyOn(userRepositoryStub, 'update').mockReturnValueOnce(makeError());
    const promise = updateUserUseCase.execute(fakeUser, fakeUser.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct values.', async () => {
    const { updateUserUseCase } = makeSut();
    const promise = await updateUserUseCase.execute(fakeUser, fakeUser.id);
    expect(promise).toBe(true);
  });

  test('Should throw if UserRepository.getOneById returns void.', async () => {
    const { updateUserUseCase, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneById')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = updateUserUseCase.execute(fakeUser, fakeUser.id);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if there is another user with the same email registered.', async () => {
    const { updateUserUseCase, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneByEmail')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve({ ...fakeUser, id: 'another_id' })),
      );
    const promise = updateUserUseCase.execute(fakeUser, fakeUser.id);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });
});
