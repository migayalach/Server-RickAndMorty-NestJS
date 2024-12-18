import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateLoadingCharacterDto } from './dto/create-loading-character.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoadingCharactersService {
  constructor(private readonly httpService: HttpService) {}

  create(createLoadingCharacterDto: CreateLoadingCharacterDto) {
    return 'This action adds a new loadingCharacter';
  }

  findAll(): Observable<any> {
    return this.httpService
      .get('https://rickandmortyapi.com/api/character')
      .pipe(map((response) => response.data.results));
  }
}
