import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCharacterDto {
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
