import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CharactersAPI } from './classAux/charactersAPI';

@Injectable()
export class LoadingCharactersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly charactersAPI: CharactersAPI,
  ) {}

  findAll() {
    return this.charactersAPI.loadingCharacters();
  }
}
