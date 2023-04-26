import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), ProfessorModule],
  exports: [TypeOrmModule, CourseService],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
