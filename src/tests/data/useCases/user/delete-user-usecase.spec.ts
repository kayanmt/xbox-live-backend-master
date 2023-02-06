import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { DeleteUserUseCase } from '../../../../data/useCases/user/delete-user-usecase';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { makeError } from '../../../test-utils/errors/make-error';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  deleteUserUseCase: DeleteUserUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const deleteUserUseCase = new DeleteUserUseCase(userRepositoryStub);
  return { userRepositoryStub, deleteUserUseCase };
}

describe('DeleteUserUseCase', () => {
  test('Should call UserRepository with correct value.', async () => {
    const { userRepositoryStub, deleteUserUseCase } = makeSut();
    const deleteSpy = jest.spyOn(userRepositoryStub, 'delete');
    await deleteUserUseCase.execute(fakeUser.id);
    expect(deleteSpy).toHaveBeenCalledWith(fakeUser.id);
  });

  test('Should throw if UserRepository throws', async () => {
    const { userRepositoryStub, deleteUserUseCase } = makeSut();
    jest.spyOn(userRepositoryStub, 'delete').mockReturnValueOnce(makeError());
    const promise = deleteUserUseCase.execute(fakeUser.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct user ID.', async () => {
    const { deleteUserUseCase } = makeSut();
    const promise = await deleteUserUseCase.execute(fakeUser.id);
    expect(promise).toBe(true);
  });
});
