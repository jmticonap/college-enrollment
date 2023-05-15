import { env } from 'node:process';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const { PORT } = env;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(PORT ?? 3000, () => {
    Logger.log(`Server is running`);
  });
}

// AppService.clusterize(bootstrap);
bootstrap();
