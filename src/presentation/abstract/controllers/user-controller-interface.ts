import { HttpRequest } from '../../../domain/http/http-request';
import { HttpResponse } from '../../../domain/http/http-response';

export interface UserControllerInterface {
  create(httpRequest: HttpRequest): Promise<HttpResponse>;
  getOneByEmail(httpRequest: HttpRequest): Promise<HttpResponse>;
  getOneById(httpRequest: HttpRequest): Promise<HttpResponse>;
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>;
  update(httpRequest: HttpRequest): Promise<HttpResponse>;
  delete(httpRequest: HttpRequest): Promise<HttpResponse>;
}
