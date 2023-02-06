import { makeError } from '../../../test-utils/errors/make-error';
import { GetAllGamesUseCase } from '../../../../data/useCases/game/getAll-game-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { GameRepositoryStub } from '../../../test-utils/stubs/repositories/game-repository-stub';

interface SutTypes {
  gameRepositoryStub: GameRepositoryStub;
  getAllGamesUseCase: GetAllGamesUseCase;
}

function makeSut(): SutTypes {
  const gameRepositoryStub = new GameRepositoryStub();
  const getAllGamesUseCase = new GetAllGamesUseCase(gameRepositoryStub);
  return { gameRepositoryStub, getAllGamesUseCase };
}

describe('GetAllGamesUseCase', () => {
  test('Should return an array of games.', async () => {
    const { getAllGamesUseCase } = makeSut();
    const games = await getAllGamesUseCase.execute();
    expect(games.length).toBeGreaterThanOrEqual(1);
    expect(games[0]).toBe(fakeGame);
  });

  test('Should throw if GameRepository throws.', async () => {
    const { getAllGamesUseCase, gameRepositoryStub } = makeSut();
    jest.spyOn(gameRepositoryStub, 'getAll').mockReturnValueOnce(makeError());
    const promise = getAllGamesUseCase.execute();
    await expect(promise).rejects.toThrow();
  });
});
