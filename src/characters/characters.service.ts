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
    try {
      await this.auxRequest.duplicateName(createCharacterDto.name, '');
      await this.auxRequest.existStatus(createCharacterDto.status);
      await this.auxRequest.existSpecies(createCharacterDto.species);
      await this.auxRequest.existGender(createCharacterDto.gender);
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
    } catch (error) {
      if (error?.status === 409 || error?.status === 404) {
        return {
          response: error.response,
          status: error.status,
        };
      }
      console.error('Unexpected error:', error);
      return `So sorry something went wrong!`;
    }
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
    try {
      await this.auxRequest.existCharacter(id);
      const character = await this.characterModel
        .findOne({ _id: id })
        .populate('status', 'nameStatus -_id')
        .populate('species', 'nameSpecie -_id')
        .populate('gender', 'nameGender -_id');
      return clearOneCharacter(character);
    } catch (error) {
      if (error?.status === 404) {
        return {
          response: error.response,
          status: error.status,
        };
      }
      console.error('Unexpected error:', error);
      return `So sorry something went wrong!`;
    }
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    try {
      await this.auxRequest.existCharacter(id);
      await this.auxRequest.duplicateName(updateCharacterDto.name, id);
      await this.auxRequest.existStatus(updateCharacterDto.status);
      await this.auxRequest.existSpecies(updateCharacterDto.species);
      await this.auxRequest.existGender(updateCharacterDto.gender);
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
    } catch (error) {
      if (error?.status === 409 || error?.status === 404) {
        return {
          response: error.response,
          status: error.status,
        };
      }
      console.error('Unexpected error:', error);
      return `So sorry something went wrong!`;
    }
  }

  async remove(id: string) {
    try {
      const dataInfo: Create = await this.auxRequest.characterExist(id);
      this.auxRequest.characterStatusCreate(dataInfo);
      await this.characterModel.findByIdAndDelete(id);
      return `Character successfully deleted.`;
    } catch (error) {
      if (error?.status === 404 || error?.status === 403) {
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
