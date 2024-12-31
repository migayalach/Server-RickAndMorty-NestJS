import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characters } from '@schemas/characters.schema';
import { Status as SchemaStatus } from '@schemas/status.schema';
import { Species as SchemaSpecies } from '@schemas/species.schema';
import { Gender as SchemaGender } from '@schemas/gender.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Create } from '@enum/character.enum';

export class AuxResponse {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
    @InjectModel(SchemaStatus.name) private statusModel: Model<SchemaStatus>,
    @InjectModel(SchemaSpecies.name) private speciesModel: Model<SchemaSpecies>,
    @InjectModel(SchemaGender.name) private genderModel: Model<SchemaGender>,
  ) {}

  public async duplicateName(name: string, flag: string) {
    if (!flag.length) {
      if (await this.charactersModel.findOne({ name })) {
        throw new HttpException(
          `This name currently exists, please can't duplicate! please intro other.`,
          HttpStatus.CONFLICT,
        );
      }
    } else if (flag.length) {
      const dataName = await this.charactersModel.findOne({
        name,
        _id: { $ne: flag },
      });
      if (dataName) {
        throw new HttpException(
          `This name currently exists, please can't duplicate! please intro other name.`,
          HttpStatus.CONFLICT,
        );
      }
    }
    return;
  }

  public async existStatus(idStatus: string) {
    const data = await this.statusModel.findById(idStatus);
    if (!data) {
      throw new HttpException(
        `Sorry this status don't exist!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }

  public async existSpecies(idSpecies: string) {
    const data = await this.speciesModel.findById(idSpecies);
    if (!data) {
      throw new HttpException(
        `Sorry this species don't exist!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }

  public async existGender(idGender: string) {
    const data = await this.genderModel.findById(idGender);
    if (!data) {
      throw new HttpException(
        `Sorry this gender don't exist!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }

  public async characterExist(idCharacter: string): Promise<Create> {
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
    return existCharacter.create;
  }

  public characterStatusCreate(create: Create) {
    if (create === 'Api') {
      throw new HttpException(
        `Sorry, the only characters that are removed are those created by users.`,
        HttpStatus.FORBIDDEN,
      );
    }
    return;
  }

  public async existCharacter(idCharacter: string) {
    const data = await this.charactersModel.findById(idCharacter);
    if (!data) {
      throw new HttpException(
        `This character currently don't exists.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
