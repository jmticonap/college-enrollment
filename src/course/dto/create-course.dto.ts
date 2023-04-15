import { IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateCourseDto {
  @IsUUID()
  professorId: string;

  @IsNotEmpty({ message: "Fullname can't be empty" })
  fullname: string;

  @IsNotEmpty({ message: "Abbreviation can't be empty" })
  abbreviation: string;

  description: string;

  @Min(1, { message: "Credits can't less than 1" })
  credits: number;
}
