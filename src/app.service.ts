import { Injectable, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging/logging.interceptor';

@Injectable()
export class AppService {
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return 'Hello World!';
  }
}
