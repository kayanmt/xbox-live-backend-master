import { HttpRequest } from 'src/domain/http/http-request';

export interface HttpRequestHandlerInterface {
  request(): HttpRequest;
}
