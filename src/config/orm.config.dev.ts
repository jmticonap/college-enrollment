import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ProfessorEntity } from './../entities/professor.entity';
import { StudentEntity } from './../entities/student.entity';
import { MetadataEntity } from './../entities/metadata.entity';
import { EnrollmentEntity } from './../entities/enrollment.entity';
import { CourseEntity } from './../entities/course.entity';
import { EnrollCourseEntity } from './../entities/enrollcourse.entity';

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
      entities: [
        ProfessorEntity,
        StudentEntity,
        MetadataEntity,
        EnrollmentEntity,
        CourseEntity,
        EnrollCourseEntity,
      ],
      migrations: ['dist/migration/*.js'],
      migrationsTableName: 'mgt',
      dropSchema: !['prod', 'dev'].includes(process.env.NODE_ENV ?? 'dev'),
      synchronize: !['prod', 'dev'].includes(process.env.NODE_ENV ?? 'dev'),
      migrationsRun: ['prod', 'dev'].includes(process.env.NODE_ENV ?? 'dev'),
    } as PostgresConnectionOptions),
);
