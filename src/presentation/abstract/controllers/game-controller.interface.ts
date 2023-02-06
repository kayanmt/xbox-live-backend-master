import { HttpRequest } from '../../../domain/http/http-request';
import { HttpResponse } from '../../../domain/http/http-response';

export interface GameControllerInterface {
  create(httpRequest: HttpRequest): Promise<HttpResponse>;
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>;
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>;
  update(httpRequest: HttpRequest): Promise<HttpResponse>;
  delete(httpRequest: HttpRequest): Promise<HttpResponse>;
}
