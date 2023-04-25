import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import helmet from 'helmet';
import { AppService } from './app.service';

async function bootstrap() {
  const { APP_PORT, APP_HOST } = env;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(APP_PORT ?? 3000, APP_HOST ?? 'localhost');
}

// AppService.clusterize(bootstrap);
bootstrap();
