import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Characters } from '@schemas/characters.schema';
import { Gender } from '@schemas/gender.schema';
import { Species } from '@schemas/species.schema';
import { Status } from '@schemas/status.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { response } from 'helpers/pagination';
import { clearOneCharacter } from 'utils/auxUtil';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name) private characterModel: Model<Characters>,
    @InjectModel(Gender.name) private genderModel: Model<Gender>,
    @InjectModel(Species.name) private speciesModel: Model<Species>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async findAll(page) {
    if (!page) {
      page = 1;
    }

    const results = await this.characterModel
      .find()
      .populate('status', 'nameStatus -_id')
      .populate('species', 'nameSpecie -_id')
      .populate('gender', 'nameGender -_id');

    return response(results, page, 'characters?');
  }

  async findOne(id: string) {
    const character = await this.characterModel
      .findOne({ _id: id })
      .populate('status', 'nameStatus -_id')
      .populate('species', 'nameSpecie -_id')
      .populate('gender', 'nameGender -_id');
    return clearOneCharacter(character);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
