import { GameEntityInterface } from 'src/domain/entities/game-entity-interface';
import { ProfileEntityInterface } from 'src/domain/entities/profile-entity-interface';
import { ProfileRepositoryInterface } from 'src/infra/repositories/abstract/profile-repository-interface';
import { prismaDatabase } from '../database/prisma-database';

export class ProfileRepository implements ProfileRepositoryInterface {
  async create(body: ProfileEntityInterface): Promise<ProfileEntityInterface> {
    delete body.favoriteGames;
    return await prismaDatabase.profile.create({
      data: body,
      include: { Game: true },
    });
  }

  async getOne(id: string): Promise<ProfileEntityInterface> {
    return await prismaDatabase.profile.findUnique({
      where: {
        id: id,
      },
      include: { Game: true },
    });
  }

  async getAll(): Promise<ProfileEntityInterface[]> {
    return await prismaDatabase.profile.findMany({ include: { Game: true } });
  }

  async update(
    body: ProfileEntityInterface,
    id: string,
  ): Promise<ProfileEntityInterface> {
    return await prismaDatabase.profile.update({
      where: { id: id },
      data: {
        id: body.id,
        title: body.title,
        imageUrl: body.imageUrl,
        userId: body.userId,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      },
      include: { Game: true },
    });
  }

  async delete(id: string): Promise<void | ProfileEntityInterface> {
    return await prismaDatabase.profile.delete({
      where: { id: id },
      include: { Game: true },
    });
  }

  async updateFavoriteGames(
    id: string,
    favoriteGames: string[],
  ): Promise<void | ProfileEntityInterface> {
    const newGameList = favoriteGames.map((game) => {
      return { id: game };
    });
    return await prismaDatabase.profile.update({
      where: { id: id },
      data: {
        favoriteGames: favoriteGames,
        Game: { set: newGameList },
      },
      include: { Game: true },
    });
  }

  async getAllGames(): Promise<GameEntityInterface[]> {
    return await prismaDatabase.game.findMany();
  }
}
