import { GameEntityInterface } from 'src/domain/entities/game-entity-interface';
import { ProfileEntityInterface } from '../../../domain/entities/profile-entity-interface';

export interface ProfileRepositoryInterface {
  create(body: ProfileEntityInterface): Promise<ProfileEntityInterface>;
  getOne(profileId: string): Promise<ProfileEntityInterface | void>;
  getAll(): Promise<ProfileEntityInterface[]>;
  update(
    body: ProfileEntityInterface,
    profileid: string,
  ): Promise<ProfileEntityInterface | void>;
  delete(profileId: string): Promise<ProfileEntityInterface | void>;
  updateFavoriteGames(
    profileId: string,
    favoriteGames: string[],
  ): Promise<void | ProfileEntityInterface>;
  getAllGames(): Promise<GameEntityInterface[]>;
}
