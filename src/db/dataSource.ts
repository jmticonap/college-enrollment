import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from 'process';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/db/migrations/*.js'],
  migrationsTableName: 'mgt',
  poolSize: 10,
  synchronize: false, // ['dev', 'test'].includes(env.NODE_ENV),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
