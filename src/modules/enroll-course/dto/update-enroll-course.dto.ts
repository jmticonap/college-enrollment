import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollCourseDto } from './create-enroll-course.dto';

export class UpdateEnrollCourseDto extends PartialType(CreateEnrollCourseDto) {}
