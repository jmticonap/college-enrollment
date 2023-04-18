import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUpdateInterceptor } from './logging/createUpdate.interceptor';
import { ErrorInterceptor } from './logging/error.interceptor';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { dataSourceOptions } from './db/dataSource';
import { EnrollCourseModule } from './enroll-course/enroll-course.module';
import { CourseModule } from './course/course.module';
import { HealthModule } from './health/health.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProfessorModule,
    StudentModule,
    EnrollmentModule,
    EnrollCourseModule,
    CourseModule,
    HealthModule,
    MetadataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CreateUpdateInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
