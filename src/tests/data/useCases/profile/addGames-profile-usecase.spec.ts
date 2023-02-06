import { makeError } from '../../../test-utils/errors/make-error';
import { AddGamesProfileUseCase } from '../../../../data/useCases/profile/addGames-profile-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  addGamesProfileUseCase: AddGamesProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const addGamesProfileUseCase = new AddGamesProfileUseCase(
    profileRepositoryStub,
  );
  return { profileRepositoryStub, addGamesProfileUseCase };
}

describe('AddGamesProfileUseCase', () => {
  test('Should call ProfileRepository with correct values.', async () => {
    const { profileRepositoryStub, addGamesProfileUseCase } = makeSut();
    const getOneSpy = jest.spyOn(profileRepositoryStub, 'getOne');
    const updateFavoriteGamesSpy = jest.spyOn(
      profileRepositoryStub,
      'updateFavoriteGames',
    );
    await addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    expect(getOneSpy).toHaveBeenCalledWith(fakeProfile.id);
    expect(updateFavoriteGamesSpy).toHaveBeenCalledWith(fakeProfile.id, [
      fakeGame.id,
    ]);
  });

  test('Should return true if called with correct values.', async () => {
    const { addGamesProfileUseCase } = makeSut();
    const gamesAdded = await addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    expect(gamesAdded).toBe(true);
  });

  test('Should throw if foundProfile userId is different than the given user id.', async () => {
    const { addGamesProfileUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve({ ...fakeProfile, userId: 'another_id' }),
        ),
      );
    const promise = addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should return false if foundProfile is void.', async () => {
    const { addGamesProfileUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if ProfileRepository.getOne throws.', async () => {
    const { addGamesProfileUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(makeError());
    const promise = addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if ProfileRepository.updateFavoriteGames throws.', async () => {
    const { addGamesProfileUseCase, profileRepositoryStub } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'updateFavoriteGames')
      .mockReturnValueOnce(makeError());
    const promise = addGamesProfileUseCase.execute(
      fakeProfile.id,
      [fakeGame.id],
      fakeUser.id,
    );
    await expect(promise).rejects.toThrow();
  });
});
