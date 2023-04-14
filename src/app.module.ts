import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { dataSourceOptions } from './db/data-source';
import { EnrollCourseModule } from './enroll-course/enroll-course.module';
import { CourseModule } from './course/course.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
