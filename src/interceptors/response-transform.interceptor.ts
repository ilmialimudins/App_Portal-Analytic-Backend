import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  acknowledge: number;
  message: string;
  errorCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<Response<T>> {
    return handler.handle().pipe(
      map((data) => {
        return {
          acknowledge: 0,
          message: data.message || '',
          errorCode: context.switchToHttp().getResponse().statusCode,
          data: data.result || data,
        };
      }),
    );
  }
}
