import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUpdateInterceptor } from './logging/createUpdate.interceptor';
import { ErrorInterceptor } from './logging/error.interceptor';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { EnrollCourseModule } from './enroll-course/enroll-course.module';
import { CourseModule } from './course/course.module';
import { HealthModule } from './health/health.module';
import { MetadataModule } from './metadata/metadata.module';
import ormConfigDev from './config/orm.config.dev';
import ormConfigProd from './config/orm.config.prod';
import CacheConfigService from './cache/cacheConfig.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [ormConfigDev],
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'prod' ? ormConfigProd : ormConfigDev,
    }),
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
      useClass: CacheInterceptor,
    },
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
