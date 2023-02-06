import { HttpResponse } from 'src/domain/http/http-response';
import { HttpResponseHandlerInterface } from '../../abstract/handlers/http/http-response-handler-interface';

export class HttpResponseHandler implements HttpResponseHandlerInterface {
  constructor(private readonly body: any) {}

  ok(): HttpResponse {
    return {
      statusCode: 200,
      body: this.body,
    };
  }

  created(): HttpResponse {
    return {
      statusCode: 201,
      body: this.body,
    };
  }

  badRequest(): HttpResponse {
    return {
      statusCode: 400,
      body: this.body,
    };
  }

  unauthorized(): HttpResponse {
    return {
      statusCode: 401,
      body: this.body,
    };
  }

  notFound(): HttpResponse {
    return {
      statusCode: 404,
      body: this.body,
    };
  }
}
