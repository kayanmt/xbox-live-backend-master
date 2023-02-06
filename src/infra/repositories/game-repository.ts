import { GameEntityInterface } from 'src/domain/entities/game-entity-interface';
import { GameRepositoryInterface } from 'src/infra/repositories/abstract/game-repository-interface';
import { prismaDatabase } from '../database/prisma-database';

export class GameRepository implements GameRepositoryInterface {
  async create(body: GameEntityInterface): Promise<GameEntityInterface> {
    return await prismaDatabase.game.create({ data: body });
  }

  async getOne(id: string): Promise<void | GameEntityInterface> {
    return await prismaDatabase.game.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAll(): Promise<GameEntityInterface[] | []> {
    return await prismaDatabase.game.findMany();
  }

  async update(
    body: GameEntityInterface,
    id: string,
  ): Promise<void | GameEntityInterface> {
    return await prismaDatabase.game.update({
      where: { id: id },
      data: body,
    });
  }

  async delete(id: string): Promise<void | GameEntityInterface> {
    await prismaDatabase.profile.findMany().then(async (profiles) =>
      profiles.filter(async (profile) => {
        if (profile.favoriteGames.find((item) => item === id)) {
          const updatedFavoriteGames = profile.favoriteGames.filter(
            (gameId) => gameId !== id,
          );
          await prismaDatabase.profile.update({
            where: {
              id: profile.id,
            },
            data: {
              favoriteGames: updatedFavoriteGames,
            },
          });
        }
      }),
    );
    return await prismaDatabase.game.delete({
      where: { id: id },
    });
  }
}
