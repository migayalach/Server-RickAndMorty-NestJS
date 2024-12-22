import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Status, Species, Gender } from '@enum/character.enum';

export class CreateLoadingCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsEnum(Species)
  @IsOptional()
  species: Species;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class CreateStatusDto {
  @IsEnum(Status, { each: true })
  listStatus: Status[];
}

export class CreateSpeciesDto {
  @IsEnum(Species, { each: true })
  listSpecies: Species[];
}

export class CreateGenderDto {
  @IsEnum(Gender, { each: true })
  listGender: Gender[];
}
