import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import helmet from 'helmet';

async function bootstrap() {
  const { APP_PORT } = env;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(APP_PORT ?? 3000);
}

// AppService.clusterize(bootstrap);
bootstrap();
