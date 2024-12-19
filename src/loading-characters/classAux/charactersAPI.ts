import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CharactersAPI {
  private readonly API_CHARACTERS: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_CHARACTERS = this.configService.get<string>('URL_API');
  }

  public async loadingCharacters() {
    let characters = [];
    const pages = await this.httpService
      .get(`${this.API_CHARACTERS}`)
      .pipe(map((response) => response.data.info.pages))
      .toPromise();
    let page = 1;
    while (page <= pages) {
      const [result] = await this.httpService
        .get(`${this.API_CHARACTERS}?page=${page}`)
        .pipe(map((response) => response.data.results))
        .toPromise();
      characters = [...characters, result];
      page++;
    }

    return characters;
  }
}
