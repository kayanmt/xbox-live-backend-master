import { HttpRequest } from '../../../domain/http/http-request';
import { HttpResponse } from '../../../domain/http/http-response';

export interface AuthControllerInterface {
  login(httpRequest: HttpRequest): Promise<HttpResponse>;
}
