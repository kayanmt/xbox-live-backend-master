import { GameEntityInterface } from '../../../../domain/entities/game-entity-interface';
import { ProfileEntityInterface } from '../../../../domain/entities/profile-entity-interface';
import { ProfileRepositoryInterface } from '../../../../infra/repositories/abstract/profile-repository-interface';
import { fakeGame } from '../../fake-entities/fake-game';
import { fakeProfile } from '../../fake-entities/fake-profile';

export class ProfileRepositoryStub implements ProfileRepositoryInterface {
  create(): Promise<ProfileEntityInterface> {
    return new Promise((resolve) => resolve(fakeProfile));
  }
  getOne(): Promise<void | ProfileEntityInterface> {
    return new Promise((resolve) => resolve(fakeProfile));
  }
  getAll(): Promise<ProfileEntityInterface[]> {
    return new Promise((resolve) => resolve([fakeProfile]));
  }
  update(): Promise<void | ProfileEntityInterface> {
    return new Promise((resolve) => resolve(fakeProfile));
  }
  delete(): Promise<void | ProfileEntityInterface> {
    return new Promise((resolve) => resolve(fakeProfile));
  }
  updateFavoriteGames(): Promise<void | ProfileEntityInterface> {
    return new Promise((resolve) => resolve(fakeProfile));
  }
  getAllGames(): Promise<GameEntityInterface[]> {
    return new Promise((resolve) => resolve([fakeGame]));
  }
}
