import { IsOptional, IsUUID } from 'class-validator';

export class CreateEnrollCourseDto {
  @IsUUID()
  courseId?: string;

  @IsUUID()
  enrollmentId?: string;

  @IsOptional()
  state?: number;
}
