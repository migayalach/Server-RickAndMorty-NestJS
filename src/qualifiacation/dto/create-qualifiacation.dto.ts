import { IsNumber, IsMongoId, IsNotEmpty, Min, Max } from 'class-validator';
export class CreateQualifiacationDto {
  @IsMongoId()
  @IsNotEmpty()
  idUser: string;

  @IsMongoId()
  @IsNotEmpty()
  idCharacter: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;
}
