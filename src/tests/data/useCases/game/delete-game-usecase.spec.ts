import { makeError } from '../../../test-utils/errors/make-error';
import { DeleteGameUseCase } from '../../../../data/useCases/game/delete-game-usecase';
import { fakeGame } from '../../../test-utils/fake-entities/fake-game';
import { GameRepositoryStub } from '../../../test-utils/stubs/repositories/game-repository-stub';

interface SutTypes {
  gameRepositoryStub: GameRepositoryStub;
  deleteGameUseCase: DeleteGameUseCase;
}

function makeSut(): SutTypes {
  const gameRepositoryStub = new GameRepositoryStub();
  const deleteGameUseCase = new DeleteGameUseCase(gameRepositoryStub);
  return { gameRepositoryStub, deleteGameUseCase };
}

describe('DeleteGameUseCase', () => {
  test('Ensure GameRepository is called with correct values.', async () => {
    const { gameRepositoryStub, deleteGameUseCase } = makeSut();
    const deleteSpy = jest.spyOn(gameRepositoryStub, 'delete');
    await deleteGameUseCase.execute(fakeGame.id);
    expect(deleteSpy).toHaveBeenCalledWith(fakeGame.id);
  });

  test('Should throw if GameRepository throws.', async () => {
    const { gameRepositoryStub, deleteGameUseCase } = makeSut();
    jest.spyOn(gameRepositoryStub, 'delete').mockReturnValueOnce(makeError());
    const promise = deleteGameUseCase.execute(fakeGame.id);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct value.', async () => {
    const { deleteGameUseCase } = makeSut();
    const promise = await deleteGameUseCase.execute(fakeGame.id);
    expect(promise).toBe(true);
  });
});
