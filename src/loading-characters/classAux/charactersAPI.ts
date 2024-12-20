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

@Injectable()
export class CharactersAPI {
  private readonly API_CHARACTERS: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
}
