import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateLoadingCharacterDto } from './dto/create-loading-character.dto';
import { CharactersAPI } from './classAux/charactersAPI';

@Injectable()
export class LoadingCharactersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly charactersAPI: CharactersAPI,
  ) {}

  create(createLoadingCharacterDto: CreateLoadingCharacterDto) {
    return 'This action adds a new loadingCharacter';
  }

  findAll() {
    return this.charactersAPI.loadingCharacters();
  }
}
