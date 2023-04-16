import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from 'process';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST ?? 'localhost',
  port: parseInt(env.DB_PORT, 10) ?? 5432,
  username: env.DB_USERNAME ?? 'postgres',
  password: env.DB_PASSWORD ?? 'password',
  database: env.DB_NAME ?? 'college-enrolment-db',
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/db/migrations/*.js'],
  migrationsTableName: 'mgt',
  poolSize: parseInt(env.DB_POOL_SIZE, 10) ?? 10,
  synchronize: false, // ['dev', 'test'].includes(env.NODE_ENV),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
