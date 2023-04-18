import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMetadatumDto {
  @IsNotEmpty({ message: "Can't be an empty value" })
  key: string;

  @IsNotEmpty({ message: "Can't be an empty value" })
  value: string;

  @IsUUID()
  studentId?: string;
}
