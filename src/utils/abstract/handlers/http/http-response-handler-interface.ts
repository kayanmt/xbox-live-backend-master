import { HttpResponse } from 'src/domain/http/http-response';

export interface HttpResponseHandlerInterface {
  ok(): HttpResponse;
  created(): HttpResponse;
  badRequest(): HttpResponse;
  unauthorized(): HttpResponse;
  notFound(): HttpResponse;
}
