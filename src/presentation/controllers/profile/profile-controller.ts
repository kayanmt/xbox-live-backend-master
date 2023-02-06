import {
  CreateProfileUseCaseInterface,
  DeleteProfileUseCaseInterface,
  GetAllProfilesUseCaseInterface,
  GetOneProfileUseCaseInterface,
  UpdateProfileUseCaseInterface,
  ProfileControllerInterface,
  HttpRequest,
  HttpResponse,
} from './interface-imports';
import { HttpResponseHandler } from 'src/utils/handlers/http/http-response-handler';
import { AuthMiddlewareInterface } from 'src/presentation/abstract/middlewares/auth-middleware-interface';
import { AddGamesProfileUseCaseInterface } from 'src/data/abstract/profile/addGames-profile-interface';
import { RemoveGamesProfileUseCaseInterface } from 'src/data/abstract/profile/removeGames-profile-interface';

export class ProfileController implements ProfileControllerInterface {
  constructor(
    private readonly authMiddleware: AuthMiddlewareInterface,
    private readonly createProfileUseCase: CreateProfileUseCaseInterface,
    private readonly getOneProfileUseCase: GetOneProfileUseCaseInterface,
    private readonly getAllProfilesUseCase: GetAllProfilesUseCaseInterface,
    private readonly updateProfileUseCase: UpdateProfileUseCaseInterface,
    private readonly deleteProfileUseCase: DeleteProfileUseCaseInterface,
    private readonly addGamesProfileUseCase: AddGamesProfileUseCaseInterface,
    private readonly removeGamesProfileUseCase: RemoveGamesProfileUseCaseInterface,
  ) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const body = httpRequest.body;

      const created = await this.createProfileUseCase.execute({
        ...body,
        userId: authUser.id,
      });

      if (created) {
        const http = new HttpResponseHandler({ message: 'Profile created.' });
        return http.created();
      } else {
        const http = new HttpResponseHandler({ message: 'An error occurred.' });
        return http.badRequest();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.badRequest();
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const id = httpRequest.id;
      const foundProfile = await this.getOneProfileUseCase.execute(
        id,
        authUser.id,
      );

      if (foundProfile) {
        const http = new HttpResponseHandler(foundProfile);
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'Not found.' });
        return http.notFound();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.notFound();
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const foundProfiles = await this.getAllProfilesUseCase.execute(
        authUser.id,
      );

      if (foundProfiles.length > 0) {
        const http = new HttpResponseHandler(foundProfiles);
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'Not found.' });
        return http.notFound();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.notFound();
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const id = httpRequest.id;
      const body = httpRequest.body;
      const authUser = await this.authMiddleware.auth(httpRequest);

      const updated = await this.updateProfileUseCase.execute(
        body,
        id,
        authUser.id,
      );

      if (updated) {
        const http = new HttpResponseHandler({ message: 'Profile updated.' });
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'An error occurred.' });
        return http.badRequest();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.badRequest();
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const id = httpRequest.id;
      const deleted = await this.deleteProfileUseCase.execute(id, authUser.id);

      if (deleted) {
        const http = new HttpResponseHandler({ message: 'Profile deleted.' });
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'An error occurred.' });
        return http.badRequest();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.badRequest();
    }
  }

  async addGames(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const id = httpRequest.id;
      const games = httpRequest.body.favoriteGames;
      const addedGames = await this.addGamesProfileUseCase.execute(
        id,
        games,
        authUser.id,
      );

      if (addedGames) {
        const http = new HttpResponseHandler({ message: 'Game(s) added.' });
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'An error occurred.' });
        return http.badRequest();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.badRequest();
    }
  }

  async removeGames(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authUser = await this.authMiddleware.auth(httpRequest);
      const id = httpRequest.id;
      const games = httpRequest.body.favoriteGames;
      const deletedGames = await this.removeGamesProfileUseCase.execute(
        id,
        games,
        authUser.id,
      );

      if (deletedGames) {
        const http = new HttpResponseHandler({ message: 'Game(s) removed.' });
        return http.ok();
      } else {
        const http = new HttpResponseHandler({ message: 'An error occurred.' });
        return http.badRequest();
      }
    } catch (error) {
      const http = new HttpResponseHandler(error);
      return http.badRequest();
    }
  }
}
