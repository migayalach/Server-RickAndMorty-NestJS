import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  CharactersInterface,
  CharacterLists,
} from '@interfaces/character.interface';
import { Gender, Status, Species } from '@enum/character.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characters } from '@schemas/characters.schema';
import { Gender as GenderSchema } from '@schemas/gender.schema';
import { Species as SpeciesSchema } from '@schemas/species.schema';
import { Status as StatusSchema } from '@schemas/status.schema';

@Injectable()
export class CharactersAPI {
  private API_CHARACTERS: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(StatusSchema.name) private statusModel: Model<StatusSchema>,
    @InjectModel(SpeciesSchema.name) private speciesModel: Model<SpeciesSchema>,
    @InjectModel(GenderSchema.name) private genderModel: Model<GenderSchema>,
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {
    this.API_CHARACTERS = this.configService.get<string>('URL_API');
  }

  private extractUniqueAttributes(
    characters: CharactersInterface[],
    attribute: string,
  ) {
    return characters
      .map((data) => data[attribute])
      .filter((item, index, resultMap) => resultMap.indexOf(item) === index);
  }

  public async loadingCharacters(): Promise<CharacterLists> {
    const characters: CharactersInterface[] = [];
    const pages: number = await lastValueFrom(
      this.httpService
        .get(`${this.API_CHARACTERS}`)
        .pipe(map((response) => response.data.info.pages)),
    );

    let page = 1;
    while (page <= pages) {
      const result: CharactersInterface[] = await lastValueFrom(
        this.httpService
          .get(`${this.API_CHARACTERS}?page=${page}`)
          .pipe(map((response) => response.data.results)),
      );
      characters.push(...result);
      page++;
    }

    const listCharacters = characters.map(
      ({ name, status, species, gender, image }) => ({
        name,
        status,
        species,
        gender,
        image,
      }),
    );

    const listStatus: Status[] = this.extractUniqueAttributes(
      listCharacters,
      'status',
    );
    const listSpecies: Species[] = this.extractUniqueAttributes(
      listCharacters,
      'species',
    );
    const listGender: Gender[] = this.extractUniqueAttributes(
      listCharacters,
      'gender',
    );

    return {
      listStatus,
      listSpecies,
      listGender,
      listCharacters,
    };
  }

  public async addStatus(statusList: string[]) {
    const listPromises = statusList.map(async (status: string) => {
      const createdStatus = new this.statusModel({
        nameStatus: status,
      });
      return createdStatus.save();
    });
    return Promise.all(listPromises);
  }

  public async addSpecies(speciesList: string[]) {
    const listPromises = speciesList.map(async (status: string) => {
      const createdSpecies = new this.speciesModel({
        nameSpecie: status,
      });
      return createdSpecies.save();
    });
    return Promise.all(listPromises);
  }

  public async addGender(genderList: string[]) {
    const listPromises = genderList.map(async (status: string) => {
      const createdGender = new this.genderModel({
        nameGender: status,
      });
      return createdGender.save();
    });
    return Promise.all(listPromises);
  }

  public async addCharacters(charactersList: any) {
    const listPromises = await Promise.all(
      charactersList.map(async ({ name, status, species, gender, image }) => {
        const newCharacter = new this.charactersModel({
          name,
          status: await this.searchStatus(status),
          species: await this.searchSpecies(species),
          gender: await this.searchGender(gender),
          image,
        });
        return newCharacter.save();
      }),
    );
    return Promise.all(listPromises);
  }

  public async searchStatus(value: string) {
    const existValue = await this.statusModel.findOne({ nameStatus: value });
    if (!existValue) {
      throw Error(`The currently status: ${value} don't exist!`);
    }
    return existValue._id;
  }

  public async searchSpecies(value: string) {
    const existValue = await this.speciesModel.findOne({ nameSpecie: value });
    if (!existValue) {
      throw Error(`The currently species: ${value} don't exist!`);
    }
    return existValue._id;
  }

  public async searchGender(value: string) {
    const existValue = await this.genderModel.findOne({ nameGender: value });
    if (!existValue) {
      throw Error(`The currently gender: ${value} don't exist!`);
    }
    return existValue._id;
  }

  public async callaAPI() {
    const { listStatus, listSpecies, listGender, listCharacters } =
      await this.loadingCharacters();
    if (!(await this.statusModel.countDocuments())) {
      await this.addStatus(listStatus);
    }
    if (!(await this.speciesModel.countDocuments())) {
      await this.addSpecies(listSpecies);
    }
    if (!(await this.genderModel.countDocuments())) {
      await this.addGender(listGender);
    }
    if (!(await this.charactersModel.countDocuments())) {
      await this.addCharacters(listCharacters);
    }
    return 'Data update successful!';
  }
}
