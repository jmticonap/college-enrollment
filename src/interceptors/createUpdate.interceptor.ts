import { createWriteStream, existsSync } from 'node:fs';
import * as path from 'node:path';
import { Observable, tap } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class CreateUpdateInterceptor implements NestInterceptor {
  logFileName = 'logs.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    if (method === 'GET') return next.handle();
    const url = request.url;
    const now = new Date();
    const fullLogPath =
      process.env.LOG_PATH ?? path.join(__dirname, this.logFileName);
    const fileFlag = existsSync(fullLogPath) ? 'a' : 'w';

    const persistLog = (logMessage: string): void => {
      createWriteStream(fullLogPath, {
        flags: fileFlag,
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
