import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characters } from '@schemas/characters.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AuxResponse {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {}

  public async characterExist(idCharacter: string): Promise<any> {
    const existCharacter = await this.charactersModel.findById(idCharacter);
    if (!existCharacter) {
      throw new HttpException(
        `Sorry, this character doesn't exist!`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (existCharacter.create === 'Api') {
      throw new HttpException(
        `Sorry, the only characters that are removed are those created by users.`,
        HttpStatus.FORBIDDEN,
      );
    }
    return;
  }
}
