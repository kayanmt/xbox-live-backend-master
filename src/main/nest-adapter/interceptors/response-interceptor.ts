import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data.statusCode === 400) {
          throw new HttpException(data.body.name ?? 'Bad Request', 400);
        } else if (data.statusCode === 401) {
          throw new HttpException(data.body.name ?? 'Unauthorized', 401);
        } else if (data.statusCode === 404) {
          throw new HttpException(data.body.name ?? 'Not Found', 404);
        }
      }),
    );
  }
}
