import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { State } from '@enum/character.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  @IsNotEmpty()
  idLevel: string;

  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @IsEmail()
  @IsNotEmpty()
  emailUser: string;

  @IsString()
  @IsOptional()
  photoUser?: string;

  @IsNotEmpty()
  @IsEnum(State)
  statusUser: State;
}
