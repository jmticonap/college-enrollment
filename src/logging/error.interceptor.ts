import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  errorLogPath = 'src/logging/error.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = new Date();

    const persistLog = (logMessage: string): void => {
      createWriteStream(process.env.LOG_ERROR_PATH ?? this.errorLogPath, {
        flags: 'a',
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
