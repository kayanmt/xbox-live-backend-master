import { makeError } from '../../../test-utils/errors/make-error';
import { UpdateGameUseCase } from '../../../../data/useCases/game/update-game-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { GameRepositoryStub } from '../../../test-utils/stubs/repositories/game-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';

interface SutTypes {
  gameRepositoryStub: GameRepositoryStub;
  updateGameUseCase: UpdateGameUseCase;
}

function makeSut(): SutTypes {
  const gameRepositoryStub = new GameRepositoryStub();
  const updateGameUseCase = new UpdateGameUseCase(gameRepositoryStub);
  return { gameRepositoryStub, updateGameUseCase };
}

describe('UpdateGameUseCase', () => {
  test('Should call GameRepository with correct values.', async () => {
    const { gameRepositoryStub, updateGameUseCase } = makeSut();
    const getOneSpy = jest.spyOn(gameRepositoryStub, 'getOne');
    const updateSpy = jest.spyOn(gameRepositoryStub, 'update');
    await updateGameUseCase.execute(fakeGame, fakeGame.id);
    expect(getOneSpy).toHaveBeenCalledWith(fakeGame.id);
    expect(updateSpy).toHaveBeenCalledWith(fakeGame, fakeGame.id);
  });

  test('Should return true on success.', async () => {
    const { updateGameUseCase } = makeSut();
    const promise = await updateGameUseCase.execute(fakeGame, fakeGame.id);
    expect(promise).toBe(true);
  });

  test('Should throw if GameRepository.findOne throws.', async () => {
    const { gameRepositoryStub, updateGameUseCase } = makeSut();
    jest.spyOn(gameRepositoryStub, 'getOne').mockReturnValueOnce(makeError());
    const promise = updateGameUseCase.execute(fakeGame, fakeGame.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if GameRepository.update throws.', async () => {
    const { gameRepositoryStub, updateGameUseCase } = makeSut();
    jest.spyOn(gameRepositoryStub, 'update').mockReturnValueOnce(makeError());
    const promise = updateGameUseCase.execute(fakeGame, fakeGame.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if GameRepository.findOne returns void.', async () => {
    const { gameRepositoryStub, updateGameUseCase } = makeSut();
    jest
      .spyOn(gameRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = updateGameUseCase.execute(fakeGame, fakeGame.id);
    expect(promise).rejects.toThrow(InvalidParamError);
  });
});
