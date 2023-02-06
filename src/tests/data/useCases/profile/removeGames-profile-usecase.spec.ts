import { makeError } from '../../../test-utils/errors/make-error';
import { RemoveGamesProfileUseCase } from '../../../../data/useCases/profile/removeGames-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  removeGamesProfile: RemoveGamesProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const removeGamesProfile = new RemoveGamesProfileUseCase(
    profileRepositoryStub,
  );
  return { profileRepositoryStub, removeGamesProfile };
}

describe('RemoveGamesProfileUseCase', () => {
  test('Should call ProfileRepository with correct values.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    const getOneSpy = jest.spyOn(profileRepositoryStub, 'getOne');
    const updateFavoriteGamesSpy = jest.spyOn(
      profileRepositoryStub,
      'updateFavoriteGames',
    );
    await removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    expect(getOneSpy).toHaveBeenCalledWith(fakeProfile.id);
    expect(updateFavoriteGamesSpy).toHaveBeenCalledWith(fakeProfile.id, []);
  });

  test('Should throw if ProfileRepository.updateFavoriteGames throws.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'updateFavoriteGames')
      .mockReturnValueOnce(makeError());
    const promise = removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should call ProfileRepository.updateFavoriteGames with correct gameIds if they where not selected to remove.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    jest.spyOn(profileRepositoryStub, 'getOne').mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          ...fakeProfile,
          favoriteGames: ['game_to_delete', 'game_not_to_delete'],
        }),
      ),
    );
    const updateFavoriteGamesSpy = jest.spyOn(
      profileRepositoryStub,
      'updateFavoriteGames',
    );
    await removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    expect(updateFavoriteGamesSpy).toHaveBeenCalledWith(fakeProfile.id, [
      'game_not_to_delete',
    ]);
  });

  test('Should throw if ProfileRepository.getOne throws.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(makeError());
    const promise = removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if foundProfile.userId is different from given user id.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve({ ...fakeProfile, userId: 'another_id' }),
        ),
      );
    const promise = removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if foundProfile is null.', async () => {
    const { profileRepositoryStub, removeGamesProfile } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = removeGamesProfile.execute(
      fakeProfile.id,
      ['game_to_delete'],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });
});
