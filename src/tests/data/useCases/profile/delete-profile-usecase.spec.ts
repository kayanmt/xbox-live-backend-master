import { makeError } from '../../../test-utils/errors/make-error';
import { DeleteProfileUseCase } from '../../../../data/useCases/profile/delete-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  deleteProfileUseCase: DeleteProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const deleteProfileUseCase = new DeleteProfileUseCase(profileRepositoryStub);
  return { profileRepositoryStub, deleteProfileUseCase };
}

describe('DeleteProfileUseCase', () => {
  test('Should call ProfileRepository with correct values.', async () => {
    const { profileRepositoryStub, deleteProfileUseCase } = makeSut();
    const deleteSpy = jest.spyOn(profileRepositoryStub, 'delete');
    const getOneSpy = jest.spyOn(profileRepositoryStub, 'getOne');

    await deleteProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    expect(getOneSpy).toHaveBeenCalledWith(fakeProfile.id);
    expect(deleteSpy).toHaveBeenCalledWith(fakeProfile.id);
  });

  test('Should throw if foundProfile userId is different then the user id.', async () => {
    const { profileRepositoryStub, deleteProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve({ ...fakeProfile, userId: 'wrong_id' }),
        ),
      );
    const promise = deleteProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if foundProfile is null.', async () => {
    const { profileRepositoryStub, deleteProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = deleteProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if ProfileRepository.getOne throws.', async () => {
    const { profileRepositoryStub, deleteProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(makeError());
    const promise = deleteProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if ProfileRepository.delete throws.', async () => {
    const { profileRepositoryStub, deleteProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'delete')
      .mockReturnValueOnce(makeError());
    const promise = deleteProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    await expect(promise).rejects.toThrow();
  });
});
