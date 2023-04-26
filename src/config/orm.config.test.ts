import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions =>
    ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'college-enrollment-test-db',
      entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, '..', 'migration', '*.{ts,js}')],
      migrationsTableName: 'mgt',
      dropSchema: true,
      synchronize: false,
      migrationsRun: true,
    } as PostgresConnectionOptions),
);
