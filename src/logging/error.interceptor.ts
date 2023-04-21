import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import { Observable, tap } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  errorLogFileName = 'error.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = new Date();
    const fullLogPath =
      process.env.LOG_ERROR_PATH ?? path.join(__dirname, this.errorLogFileName);
    const fileFlag = existsSync(fullLogPath) ? 'a' : 'w';

    const persistLog = (logMessage: string): void => {
      createWriteStream(process.env.LOG_ERROR_PATH ?? this.errorLogFileName, {
        flags: fileFlag,
      }).write(logMessage + '\n');
    };

    return next.handle().pipe(
      tap({
        async error(error) {
          const logMessage = `[ERROR] ${now.toLocaleString()} | [${method}] ${url}:\n\t${error}\n`;
          if (process.env.LOG_ERROR === 'true') persistLog(logMessage);
          console.log(logMessage);
        },
      }),
    );
  }
}
