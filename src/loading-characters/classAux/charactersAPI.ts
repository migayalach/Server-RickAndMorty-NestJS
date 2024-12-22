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
  private readonly API_CHARACTERS: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(StatusSchema.name) private statusModel: Model<StatusSchema>,
    @InjectModel(SpeciesSchema.name) private speciesModel: Model<SpeciesSchema>,
    @InjectModel(GenderSchema.name) private genderModel: Model<GenderSchema>,
    // @InjectModel(Characters.name) private charactersModel: Model<Characters>,
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

  public async existingStatus(statusList: any) {
    const countElements = await this.statusModel.countDocuments();
    if (!countElements) {
      const listPromises = statusList.map(async (status: string) => {
        const createdStatus = new this.statusModel({
          nameStatus: status,
        });
        return createdStatus.save();
      });
      return Promise.all(listPromises);
    } else {
      for (let i = 0; i < statusList.length; i++) {
        const existItem = await this.statusModel.findOne({
          nameStatus: statusList[i],
        });
        if (!existItem) {
          const createdStatus = new this.statusModel({
            nameStatus: statusList[i],
          });
          return createdStatus.save();
        }
      }
    }
    return await this.statusModel.find();
  }

  public async existingSpecies(speciesList: any) {
    const countElements = await this.speciesModel.countDocuments();
    if (!countElements) {
      const listPromises = speciesList.map(async (status: string) => {
        const createdSpecies = new this.speciesModel({
          nameSpecie: status,
        });
        return createdSpecies.save();
      });
      return Promise.all(listPromises);
    } else {
      for (let i = 0; i < speciesList.length; i++) {
        const existItem = await this.speciesModel.findOne({
          nameSpecie: speciesList[i],
        });
        if (!existItem) {
          const createdStatus = new this.speciesModel({
            nameSpecie: speciesList[i],
          });
          return createdStatus.save();
        }
      }
    }
    return await this.speciesModel.find();
  }

  public async existingGender(genderList: any) {
    const countElements = await this.genderModel.countDocuments();
    if (!countElements) {
      const listPromises = genderList.map(async (status: string) => {
        const createdGender = new this.genderModel({
          nameGender: status,
        });
        return createdGender.save();
      });
      return Promise.all(listPromises);
    } else {
      for (let i = 0; i < genderList.length; i++) {
        const existItem = await this.genderModel.findOne({
          nameGender: genderList[i],
        });
        if (!existItem) {
          const createdStatus = new this.genderModel({
            nameGender: genderList[i],
          });
          return createdStatus.save();
        }
      }
    }
    return await this.genderModel.find();
  }

  public async existingCharacters(charactersList: any) {
    console.log(':D');
    return 'characters';
  }
}
