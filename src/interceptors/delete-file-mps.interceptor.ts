import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class DeleteFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        fs.unlink(
          `./temp/${context.switchToHttp().getRequest().body.fileName}`,
          function (err) {
            if (err) return console.log(err);
            console.log('temporary file deleted successfully after upload');
          },
        );
      }),
    );
  }
}
