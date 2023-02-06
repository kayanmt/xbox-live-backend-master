import { RequestBodyDto } from 'src/domain/dtos/request-body-dto';
import { HttpRequest } from 'src/domain/http/http-request';
import { HttpRequestHandlerInterface } from '../../abstract/handlers/http/http-request-handler-interface';

export class HttpRequestHandler implements HttpRequestHandlerInterface {
  constructor(private readonly clientRequest: RequestBodyDto) {}

  request(): HttpRequest {
    const httpRequest: HttpRequest = {};

    try {
      httpRequest.authorization = this.clientRequest.headers.authorization;
    } catch (error) {
      httpRequest.authorization = '';
    }

    try {
      httpRequest.id = this.clientRequest.params.id;
    } catch (error) {
      httpRequest.id = '';
    }

    try {
      httpRequest.body = this.clientRequest.body;
    } catch (error) {
      httpRequest.body = {};
    }

    return httpRequest;
  }
}
