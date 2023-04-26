import { IsOptional, IsUUID } from 'class-validator';

export class CreateEnrollCourseDto {
  @IsOptional()
  id?: string;

  @IsUUID()
  courseId?: string;

  @IsUUID()
  enrollmentId?: string;

  @IsOptional()
  state?: number;
}
