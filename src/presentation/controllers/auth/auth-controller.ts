import { LoginAuthUseCaseInterface } from '../../../data/abstract/auth/login-auth-interface';
import { AuthControllerInterface } from '../../../presentation/abstract/controllers/auth-controller-interface';
import { HttpResponseHandler } from '../../../utils/handlers/http/http-response-handler';
import { HttpRequest, HttpResponse } from '../game/interface-imports';

export class AuthController implements AuthControllerInterface {
  constructor(private readonly loginAuthUseCase: LoginAuthUseCaseInterface) {}

  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const token = await this.loginAuthUseCase.execute({ email, password });

      if (token) {
        const http = new HttpResponseHandler({ token });
        return http.ok();
      } else {
        const http = new HttpResponseHandler({
          message: 'Invalid information.',
        });
        return http.unauthorized();
      }
    } catch (error) {
      const http = new HttpResponseHandler({ message: error });
      return http.unauthorized();
    }
  }
}
