import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { MetadataEntity } from '../../entities/metadata.entity';

export class CreateStudentDto {
  @IsNotEmpty({ message: "Firstname can't be empty" })
  firstname: string;

  @IsNotEmpty({ message: "Lastname can't be empty" })
  lastname: string;

  @IsNotEmpty({ message: "DNI can't be empty" })
  @Length(8, 10, { message: 'DNI is out of range' })
  @IsNumberString()
  dni: string;

  @Length(9, 16, { message: 'Phone is out of range' })
  phone?: string;

  @IsNotEmpty({ message: "Address it can't be empty" })
  address?: string;

  @IsOptional()
  metadata?: MetadataEntity[];
}
