import { makeError } from '../../../test-utils/errors/make-error';
import { UpdateProfileUseCase } from '../../../../data/useCases/profile/update-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  updateProfileUseCase: UpdateProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const updateProfileUseCase = new UpdateProfileUseCase(profileRepositoryStub);
  return { profileRepositoryStub, updateProfileUseCase };
}

describe('UpdateProfileUseCase', () => {
  test('Ensure ProfileRepository is called with correct values.', async () => {
    const { profileRepositoryStub, updateProfileUseCase } = makeSut();
    const getOneSpy = jest.spyOn(profileRepositoryStub, 'getOne');
    const updateSpy = jest.spyOn(profileRepositoryStub, 'update');
    await updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    expect(getOneSpy).toHaveBeenCalledWith(fakeProfile.id);
    expect(updateSpy).toHaveBeenCalledWith(fakeProfile, fakeProfile.id);
  });

  test('Should throw if ProfileRepository.getOne throws.', async () => {
    const { profileRepositoryStub, updateProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(makeError());
    const promise = updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if ProfileRepository.update throws.', async () => {
    const { profileRepositoryStub, updateProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'update')
      .mockReturnValueOnce(makeError());
    const promise = updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct values.', async () => {
    const { updateProfileUseCase } = makeSut();
    const updated = await updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    expect(updated).toBe(true);
  });

  test('Should throw if ProfileRepository.getOne returns void.', async () => {
    const { profileRepositoryStub, updateProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if foundProfile.userId is different than the given user id.', async () => {
    const { profileRepositoryStub, updateProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve({ ...fakeProfile, userId: 'another_id' }),
        ),
      );
    const promise = updateProfileUseCase.execute(
      fakeProfile,
      fakeProfile.id,
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });
});
