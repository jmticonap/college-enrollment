import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'college-enrolment-db',
  entities: ['dist/**/*.entity.js'],
  poolSize: 10,
  synchronize: process.env.NODE_ENV === 'dev',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
