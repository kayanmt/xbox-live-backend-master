import { RequestBodyDto } from '../../../domain/dtos/request-body-dto';
import { HttpRequestHandler } from '../../../utils/handlers/http/http-request-handler';

export function makeHttpRequest(requestBody: RequestBodyDto) {
  const http = new HttpRequestHandler(requestBody);
  return http.request();
}
