import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Characters } from '@schemas/characters.schema';
import { Gender } from '@schemas/gender.schema';
import { Species } from '@schemas/species.schema';
import { Status } from '@schemas/status.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { response } from 'helpers/pagination';
import { clearOneCharacter } from 'utils/auxUtil';
import { Create } from '@enum/character.enum';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name) private characterModel: Model<Characters>,
    @InjectModel(Gender.name) private genderModel: Model<Gender>,
    @InjectModel(Species.name) private speciesModel: Model<Species>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const clearData = {
      name: createCharacterDto.name,
      status: new Types.ObjectId(createCharacterDto.status),
      species: new Types.ObjectId(createCharacterDto.species),
      gender: new Types.ObjectId(createCharacterDto.gender),
      image: createCharacterDto.image,
      create: Create.User,
    };
    const newCharacter = new this.characterModel(clearData);
    return await newCharacter.save();
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

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    const clearData = {
      name: updateCharacterDto.name,
      status: new Types.ObjectId(updateCharacterDto.status),
      species: new Types.ObjectId(updateCharacterDto.species),
      gender: new Types.ObjectId(updateCharacterDto.gender),
      image: updateCharacterDto.image,
      state: updateCharacterDto.state,
    };
    await this.characterModel.findByIdAndUpdate(id, clearData);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return this.characterModel.findByIdAndDelete(id);
  }
}
