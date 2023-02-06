import { GameEntityInterface } from '../../../../domain/entities/game-entity-interface';
import { GameRepositoryInterface } from '../../../../infra/repositories/abstract/game-repository-interface';
import { fakeGame } from '../../fake-entities/fake-game';

export class GameRepositoryStub implements GameRepositoryInterface {
  create(): Promise<GameEntityInterface> {
    return new Promise((resolve) => resolve(fakeGame));
  }
  getOne(): Promise<void | GameEntityInterface> {
    return new Promise((resolve) => resolve(fakeGame));
  }
  getAll(): Promise<GameEntityInterface[] | []> {
    return new Promise((resolve) => resolve([fakeGame]));
  }
  update(): Promise<void | GameEntityInterface> {
    return new Promise((resolve) => resolve(fakeGame));
  }
  delete(): Promise<void | GameEntityInterface> {
    return new Promise((resolve) => resolve(fakeGame));
  }
}
