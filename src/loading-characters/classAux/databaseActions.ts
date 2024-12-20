import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharactersSchema } from '@schemas/characters.schema';
import { GenderSchema } from '@schemas/gender.schema';
import { Schema_Specie } from '@schemas/species.schema';
import { Schema_Status } from '@schemas/status.schema';

@Injectable()
export class DataBaseActions {
  constructor() {} // @InjectModel(YourDocument.name) private readonly yourModel: Model<YourDocument>,

  public async countElementsDB() {
    // const countCharacters = await Characters.countDocuments();
  }

  public postCharacters() {}
  public postSpecies() {}
  public postGender() {}
  public postStatus() {}
}
