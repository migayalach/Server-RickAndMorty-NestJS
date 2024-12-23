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

    const results = await this.characterModel.find();
    const genderClear = await Promise.all(
      results.map(
        async ({
          _id,
          name,
          status,
          species,
          gender,
          image,
          state,
          create,
          stars,
        }) => ({
          _id,
          name,
          status: (await this.statusModel.findOne({ _id: status })).nameStatus,
          species: (await this.speciesModel.findOne({ _id: species }))
            .nameSpecie,
          gender: (await this.genderModel.findOne({ _id: gender })).nameGender,
          image,
          state,
          create,
          stars,
        }),
      ),
    );
    return response(genderClear, page, 'characters?');
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
