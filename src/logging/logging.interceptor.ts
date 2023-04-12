import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now.getTime();
        const logMessage = `${method} ${url} ${responseTime}ms`;
        createWriteStream('logs.txt', { flags: 'a' }).write(logMessage + '\n');
      }),
      tap({
        async next() {
          const responseTime = Date.now() - now.getTime();
          const logMessage = `${now.toLocaleString()} | ${url}: DB INSERT/UPDATE ${responseTime}ms`;
          createWriteStream('logs.txt', { flags: 'a' }).write(
            logMessage + '\n',
          );
        },
        async error() {
          const responseTime = Date.now() - now.getTime();
          const logMessage = `${now.toLocaleString()} | ${url}: DB INSERT/UPDATE ${responseTime}ms`;
          createWriteStream('logs.txt', { flags: 'a' }).write(
            logMessage + '\n',
          );
        },
      }),
    );
  }
}
