import 'reflect-metadata';
import * as path from 'node:path';
import { env } from 'node:process';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: Number(env.DB_PORT) || 5432,
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_NAME, // This variable must provide in command execution e.g. [DB_NAME=my-db npm run migration:run]
  entities: [path.join(__dirname, 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migration', '*.{ts,js}')],
  migrationsTableName: 'mgt',
  poolSize: 10,
  synchronize: false,
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
