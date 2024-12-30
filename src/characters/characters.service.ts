import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { response } from 'helpers/pagination';
import { clearOneCharacter } from 'utils/auxUtil';
import { Create } from '@enum/character.enum';
import { PaginatedResponse } from '@interfaces/response.interface';
import { Characters } from '@schemas/characters.schema';
import { AuxResponse } from 'src/aux-response/aux-response';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name) private characterModel: Model<Characters>,
    private readonly auxRequest: AuxResponse,
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
    await newCharacter.save();
    return `Character added successfully!`;
  }

  async findAll(page?: number): Promise<PaginatedResponse> {
    try {
      if (!page) {
        page = 1;
      }
      const results = await this.characterModel
        .find()
        .populate('status', 'nameStatus -_id')
        .populate('species', 'nameSpecie -_id')
        .populate('gender', 'nameGender -_id');

      return response(results, page, 'characters?');
    } catch (error) {
      throw Error(`Error: ${error}`);
    }
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
    try {
      await this.auxRequest.characterExist(id);
      await this.characterModel.findByIdAndDelete(id);
      return `Character successfully deleted.`;
    } catch (error) {
      if (error.status === 404 || error.status === 403) {
        return {
          response: error.response,
          status: error.status,
        };
      }
      console.error('Unexpected error:', error);
      return `So sorry something went wrong!`;
    }
  }
}
