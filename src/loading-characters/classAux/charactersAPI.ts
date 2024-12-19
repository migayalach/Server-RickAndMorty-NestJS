import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CharactersAPI {
  private readonly API_CHARACTERS: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_CHARACTERS = this.configService.get<string>('URL_API');
  }

  private extractUniqueAttributes(characters, attribute) {
    return characters
      .map((data) => data[attribute])
      .filter((item, index, resultMap) => resultMap.indexOf(item) === index);
  }

  public async loadingCharacters() {
    const characters = [];
    const pages = await lastValueFrom(
      this.httpService
        .get(`${this.API_CHARACTERS}`)
        .pipe(map((response) => response.data.info.pages)),
    );

    let page = 1;
    while (page <= pages) {
      const result = await lastValueFrom(
        this.httpService
          .get(`${this.API_CHARACTERS}?page=${page}`)
          .pipe(map((response) => response.data.results)),
      );
      characters.push(...result);
      page++;
    }

    const clearCharacters = characters.map(
      ({ name, status, species, gender, image }) => ({
        name,
        status,
        species,
        gender,
        image,
      }),
    );

    const listStatus = this.extractUniqueAttributes(clearCharacters, 'status');
    const listSpecies = this.extractUniqueAttributes(
      clearCharacters,
      'species',
    );
    const listGender = this.extractUniqueAttributes(clearCharacters, 'gender');
    return clearCharacters;
  }
}
