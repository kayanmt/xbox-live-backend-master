import { makeError } from '../../../test-utils/errors/make-error';
import { CreateGameUseCase } from '../../../../data/useCases/game/create-game-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { GameRepositoryStub } from '../../../test-utils/stubs/repositories/game-repository-stub';

interface SutTypes {
  gameRepositoryStub: GameRepositoryStub;
  createGameUseCase: CreateGameUseCase;
}

function makeSut(): SutTypes {
  const gameRepositoryStub = new GameRepositoryStub();
  const createGameUseCase = new CreateGameUseCase(gameRepositoryStub);
  return { gameRepositoryStub, createGameUseCase };
}

describe('CreateGameUseCase', () => {
  test('Should call GameRepository with correct value.', async () => {
    const { gameRepositoryStub, createGameUseCase } = makeSut();
    const createSpy = jest.spyOn(gameRepositoryStub, 'create');
    await createGameUseCase.execute(fakeGame);
    expect(createSpy).toHaveBeenCalledWith(fakeGame);
  });

  test('Should throw if GameRepository throws.', async () => {
    const { gameRepositoryStub, createGameUseCase } = makeSut();
    jest.spyOn(gameRepositoryStub, 'create').mockReturnValueOnce(makeError());
    const promise = createGameUseCase.execute(fakeGame);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct values.', async () => {
    const { createGameUseCase } = makeSut();
    const promise = await createGameUseCase.execute(fakeGame);
    expect(promise).toBe(true);
  });
});
