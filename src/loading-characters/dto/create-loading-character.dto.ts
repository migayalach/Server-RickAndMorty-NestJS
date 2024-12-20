import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Status } from '@enum/character.enum';

export class CreateLoadingCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  species: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class CreateStatusDto {
  @IsEnum(Status, { each: true })
  listStatus: Status[];
}
