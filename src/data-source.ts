import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from 'process';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: Number(env.DB_PORT) || 5432,
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_NAME, // This variable must provide in command execution e.g. [DB_NAME=my-db npm run migration:run]
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  migrationsTableName: 'mgt',
  poolSize: 10,
  synchronize: false, // ['dev', 'test'].includes(env.NODE_ENV),
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
