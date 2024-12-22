import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CharactersAPI } from './classAux/charactersAPI';
import {
  CreateSpeciesDto,
  CreateStatusDto,
  CreateGenderDto,
  CreateLoadingCharacterDto,
} from './dto/create-loading-character.dto';
import { Status } from '@schemas/status.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LoadingCharactersService {
  constructor(
    private httpService: HttpService,
    private charactersAPI: CharactersAPI,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  async create(
    statusList: CreateStatusDto,
    speciesList: CreateSpeciesDto,
    genderList: CreateGenderDto,
    charactersList: CreateLoadingCharacterDto,
  ) {
    await this.charactersAPI.existingStatus(statusList);
    await this.charactersAPI.existingGender(genderList);
    await this.charactersAPI.existingSpecies(speciesList);
    await this.charactersAPI.existingCharacters(charactersList);
    return 'Data added successfully.';
  }

  findAll() {
    return this.charactersAPI.loadingCharacters();
  }
}
