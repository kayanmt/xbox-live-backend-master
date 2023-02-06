import { InvalidParamError } from '../../../utils/errors';
import { RemoveGamesProfileUseCaseInterface } from '../../../data/abstract/profile/removeGames-profile-interface';
import { ProfileRepositoryInterface } from '../../../infra/repositories/abstract/profile-repository-interface';

export class RemoveGamesProfileUseCase
  implements RemoveGamesProfileUseCaseInterface
{
  constructor(private readonly repository: ProfileRepositoryInterface) {}

  async execute(
    profileId: string,
    gameIds: string[],
    userId: string,
  ): Promise<boolean> {
    const foundProfile = await this.repository.getOne(profileId);

    if (foundProfile && foundProfile.userId === userId) {
      const currentFavoriteGames = foundProfile.favoriteGames;
      const updatedFavoriteGames = currentFavoriteGames
        .filter((item) => !gameIds.find((id) => id === item))
        .sort();

      const updatedProfile = await this.repository.updateFavoriteGames(
        profileId,
        updatedFavoriteGames,
      );

      if (updatedProfile) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new InvalidParamError('ID');
    }
  }
}
