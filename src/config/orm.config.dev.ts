import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions =>
    ({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, '..', 'db', 'migration', '*.{ts,js}')],
      migrationsTableName: 'mgt',
      dropSchema: false,
      synchronize: false,
      migrationsRun: true,
    } as PostgresConnectionOptions),
);
