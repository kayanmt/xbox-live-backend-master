import { makeError } from '../../../test-utils/errors/make-error';
import { GetOneGameUseCase } from '../../../../data/useCases/game/getOne-game-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { GameRepositoryStub } from '../../../test-utils/stubs/repositories/game-repository-stub';

interface SutTypes {
  gameRepositoryStub: GameRepositoryStub;
  getOneGameUseCase: GetOneGameUseCase;
}

function makeSut(): SutTypes {
  const gameRepositoryStub = new GameRepositoryStub();
  const getOneGameUseCase = new GetOneGameUseCase(gameRepositoryStub);
  return { gameRepositoryStub, getOneGameUseCase };
}

describe('GetOneGameUseCase', () => {
  test('Should call GameRepository with correct values.', async () => {
    const { gameRepositoryStub, getOneGameUseCase } = makeSut();
    const getOneSpy = jest.spyOn(gameRepositoryStub, 'getOne');
    await getOneGameUseCase.execute(fakeGame.id);
    expect(getOneSpy).toHaveBeenCalledWith(fakeGame.id);
  });

  test('Should throw if GameRepository throws.', async () => {
    const { gameRepositoryStub, getOneGameUseCase } = makeSut();
    jest.spyOn(gameRepositoryStub, 'getOne').mockReturnValueOnce(makeError());
    const promise = getOneGameUseCase.execute(fakeGame.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should return a game if GameRepository.getOne returns a game.', async () => {
    const { getOneGameUseCase } = makeSut();
    const promise = await getOneGameUseCase.execute(fakeGame.id);
    expect(promise).toBe(fakeGame);
  });

  test('Should return void if GameRepository.getOne returns undefined.', async () => {
    const { getOneGameUseCase, gameRepositoryStub } = makeSut();
    jest
      .spyOn(gameRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = await getOneGameUseCase.execute(fakeGame.id);
    expect(promise).toBeUndefined();
  });
});
