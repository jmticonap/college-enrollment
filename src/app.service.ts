import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUpdateInterceptor } from './logging/createUpdate.interceptor';

@Injectable()
export class AppService {
  @UseInterceptors(CreateUpdateInterceptor)
  getHello(): string {
    return 'Hello World!';
  }
}
