import { AddGamesProfileUseCase } from 'src/data/useCases/profile/addGames-profile-usecase';
import { CreateProfileUseCase } from 'src/data/useCases/profile/create-profile-usecase';
import { DeleteProfileUseCase } from 'src/data/useCases/profile/delete-profile-usecase';
import { GetAllProfilesUseCase } from 'src/data/useCases/profile/getAll-profile-usecase';
import { GetOneProfileUseCase } from 'src/data/useCases/profile/getOne-profile-usecase';
import { RemoveGamesProfileUseCase } from 'src/data/useCases/profile/removeGames-profile-usecase';
import { UpdateProfileUseCase } from 'src/data/useCases/profile/update-profile-usecase';
import { ProfileRepository } from 'src/infra/repositories/profile-repository';
import { ProfileControllerInterface } from 'src/presentation/abstract/controllers/profile-controller-interface';
import { ProfileController } from 'src/presentation/controllers/profile/profile-controller';
import { AuthMiddleware } from 'src/presentation/middlewares/auth-middleware';
import { makeTokenHandler } from './token-handler-factory';

export function makeProfileControllerFactory(): ProfileControllerInterface {
  const repository = new ProfileRepository();

  const authMiddleware = new AuthMiddleware(makeTokenHandler());

  const createProfileUseCase = new CreateProfileUseCase(repository);
  const getOneProfileUseCase = new GetOneProfileUseCase(repository);
  const getAllProfilesUseCase = new GetAllProfilesUseCase(repository);
  const updateProfileUseCase = new UpdateProfileUseCase(repository);
  const deleteProfileUseCase = new DeleteProfileUseCase(repository);
  const addGamesProfileUseCase = new AddGamesProfileUseCase(repository);
  const removeGamesProfileUseCase = new RemoveGamesProfileUseCase(repository);

  return new ProfileController(
    authMiddleware,
    createProfileUseCase,
    getOneProfileUseCase,
    getAllProfilesUseCase,
    updateProfileUseCase,
    deleteProfileUseCase,
    addGamesProfileUseCase,
    removeGamesProfileUseCase,
  );
}
