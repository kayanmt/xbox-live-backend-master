import { makeError } from '../../../test-utils/errors/make-error';
import { GetAllProfilesUseCase } from '../../../../data/useCases/profile/getAll-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  getAllProfilesUseCase: GetAllProfilesUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const getAllProfilesUseCase = new GetAllProfilesUseCase(
    profileRepositoryStub,
  );
  return { profileRepositoryStub, getAllProfilesUseCase };
}

describe('GetAllProfilesUseCase', () => {
  test('Should return an array of profiles related to the user id.', async () => {
    const { getAllProfilesUseCase } = makeSut();
    const profiles = await getAllProfilesUseCase.execute(fakeUser.id);
    expect(profiles[0]).toBe(fakeProfile);
  });

  test('Should return an empty array if ProfileRepository.getAll return an empty array.', async () => {
    const { getAllProfilesUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getAll')
      .mockReturnValueOnce(new Promise((resolve) => resolve([])));
    const profiles = await getAllProfilesUseCase.execute(fakeUser.id);
    expect(profiles.length).toBe(0);
  });

  test('Should return an empty array if there are no profiles related to the given userId.', async () => {
    const { getAllProfilesUseCase } = makeSut();
    const profiles = await getAllProfilesUseCase.execute('another_userId');
    expect(profiles.length).toBe(0);
  });

  test('Should throw if ProfileRepository throws.', async () => {
    const { getAllProfilesUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getAll')
      .mockReturnValueOnce(makeError());
    const profiles = getAllProfilesUseCase.execute(fakeUser.id);
    await expect(profiles).rejects.toThrow();
  });
});
