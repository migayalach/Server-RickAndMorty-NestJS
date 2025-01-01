import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  // IsMongoId,
  IsEnum,
} from 'class-validator';
import { RecordSingUp } from '@enum/user.enum';

export class CreateUserDto {
  // @IsMongoId()
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  levelUser?: string;

  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @IsEmail()
  @IsNotEmpty()
  emailUser: string;

  @IsString()
  @IsNotEmpty()
  passwordUser: string;

  @IsString()
  @IsOptional()
  photoUser?: string;

  @IsNotEmpty()
  @IsEnum(RecordSingUp)
  recordType: RecordSingUp;
}
