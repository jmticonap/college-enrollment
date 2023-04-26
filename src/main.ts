import { env } from 'node:process';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = env;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(PORT ?? 3000);
}

// AppService.clusterize(bootstrap);
bootstrap();
