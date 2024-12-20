import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DataBaseActions {
  constructor(
    @InjectModel('Characters')
    private readonly charactersModel,
  ) {}

  public async countElementsDB() {
    const countCharacters = await this.charactersModel.countDocuments();
    return countCharacters;
  }

  // public postCharacters() {}
  // public postSpecies() {}
  // public postGender() {}
  // public postStatus() {}
}
