import { UserEntityInterface } from 'src/domain/entities/user-entity-interface';
import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { prismaDatabase } from '../database/prisma-database';

export class UserRepository implements UserRepositoryInterface {
  async create(body: UserEntityInterface): Promise<UserEntityInterface> {
    delete body.profiles;
    return await prismaDatabase.user.create({
      data: {
        id: body.id,
        name: body.name,
        email: body.email,
        password: body.password,
        cpf: body.cpf,
        isAdmin: body.isAdmin,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      },
      include: { profiles: { include: { Game: true } } },
    });
  }

  async getOneByEmail(email: string): Promise<UserEntityInterface> {
    return await prismaDatabase.user.findUnique({
      where: { email: email },
      include: { profiles: { include: { Game: true } } },
    });
  }

  async getOneById(id: string): Promise<UserEntityInterface> {
    return await prismaDatabase.user.findUnique({
      where: { id: id },
      include: { profiles: { include: { Game: true } } },
    });
  }

  async getAll(): Promise<UserEntityInterface[]> {
    return await prismaDatabase.user.findMany({
      include: { profiles: { include: { Game: true } } },
    });
  }

  async update(
    body: UserEntityInterface,
    id: string,
  ): Promise<UserEntityInterface> {
    return await prismaDatabase.user.update({
      where: { id: id },
      data: {
        id: body.id,
        name: body.name,
        email: body.email,
        password: body.password,
        cpf: body.cpf,
        isAdmin: body.isAdmin,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
      },
      include: { profiles: { include: { Game: true } } },
    });
  }

  async delete(id: string): Promise<void | UserEntityInterface> {
    const user = await this.getOneById(id);
    async function deleteProfile() {
      return await user.profiles.map(async (profile) => {
        const profileId = profile.id;
        await prismaDatabase.profile.delete({
          where: { id: profileId },
        });
      });
    }
    return await new Promise((resolve) => {
      resolve(deleteProfile());
    }).then(async () => {
      return await prismaDatabase.user.delete({
        where: { id: id },
        include: { profiles: { include: { Game: true } } },
      });
    });
  }
}
