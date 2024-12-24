import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { State } from '@enum/character.enum';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsEnum(State)
  state: State;
}
