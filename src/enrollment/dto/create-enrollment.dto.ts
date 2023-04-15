import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUUID()
  studentId!: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  courses!: Array<string>;
}
