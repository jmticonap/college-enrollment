import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
    migrations: [path.join(__dirname, '..', 'migration', '*.{ts,js}')],
    migrationsTableName: 'mgt',
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
  }),
);
