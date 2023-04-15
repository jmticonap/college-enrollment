import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';

async function bootstrap() {
  const { APP_PORT, APP_HOST } = env;
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT ?? 3000, APP_HOST ?? 'localhost');
}
bootstrap();
