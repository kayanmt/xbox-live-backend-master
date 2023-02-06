import { HttpRequest } from '../../../domain/http/http-request';
import { HttpResponse } from '../../../domain/http/http-response';

export interface ProfileControllerInterface {
  create(httpRequest: HttpRequest): Promise<HttpResponse>;
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>;
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>;
  update(httpRequest: HttpRequest): Promise<HttpResponse>;
  delete(httpRequest: HttpRequest): Promise<HttpResponse>;
  addGames(httpRequest: HttpRequest): Promise<HttpResponse>;
  removeGames(httpRequest: HttpRequest): Promise<HttpResponse>;
}
