import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CreateUpdateInterceptor implements NestInterceptor {
  log_path = 'src/logging/logs.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = new Date();

    const persistLog = (logMessage: string): void => {
      createWriteStream(process.env.LOG_PATH ?? this.log_path, {
        flags: 'a',
      }).write(logMessage + '\n');
    };

    return next.handle().pipe(
      tap({
        async next(data) {
          const objId = data.id;
          const responseTime = Date.now() - now.getTime();
          const logMessage = `[LOG] ${now.toLocaleString()} | ${responseTime}ms | [${method}] ${url} | ID: ${objId} DB INSERT/UPDATE`;
          if (process.env.LOG_RESPONSE_TIME === 'true') persistLog(logMessage);
          console.log(logMessage);
        },
        async error() {
          const responseTime = Date.now() - now.getTime();
          const logMessage = `[ERROR] ${now.toLocaleString()} | ${responseTime}ms | [${method}] ${url}: DB INSERT/UPDATE`;
          if (process.env.LOG_RESPONSE_TIME === 'true') persistLog(logMessage);
          console.log(logMessage);
        },
      }),
    );
  }
}
