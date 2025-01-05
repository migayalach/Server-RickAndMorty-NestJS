import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateFavoriteDto {
  @IsMongoId()
  @IsNotEmpty()
  idUser: string;

  @IsMongoId()
  @IsNotEmpty()
  idCharacter: string;
}
