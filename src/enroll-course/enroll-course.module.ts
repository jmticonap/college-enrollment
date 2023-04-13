import { Module } from '@nestjs/common';
import { EnrollCourseService } from './enroll-course.service';
import { EnrollCourseController } from './enroll-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollCourseEntity } from '../entities/enrollcourse.entity';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollCourseEntity]),
    EnrollmentModule,
    CourseModule,
  ],
  controllers: [EnrollCourseController],
  providers: [EnrollCourseService],
})
export class EnrollCourseModule {}
