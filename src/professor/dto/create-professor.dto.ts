import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty({ message: "Firstname can't be empty" })
  firstname: string;

  @IsNotEmpty({ message: "Lastname can't be empty" })
  lastname: string;

  @Length(8, 10)
  @IsNumberString()
  @IsNotEmpty({ message: "Dni can't be empty" })
  dni: string;

  @IsNotEmpty()
  @IsOptional()
  phone!: string;

  @IsNotEmpty()
  @IsOptional()
  address!: string;
}
