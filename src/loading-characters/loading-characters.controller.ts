import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoadingCharactersService } from './loading-characters.service';
import {
  CreateStatusDto,
  CreateSpeciesDto,
  CreateGenderDto,
  CreateLoadingCharacterDto,
} from './dto/create-loading-character.dto';

@Controller('loading-characters')
export class LoadingCharactersController {
  constructor(private loadingCharactersService: LoadingCharactersService) {}

  @Post()
  async create(
    @Body(new ValidationPipe())
    body: {
      listStatus: CreateStatusDto;
      listSpecies: CreateSpeciesDto;
      listGender: CreateGenderDto;
      listCharacters: CreateLoadingCharacterDto;
    },
  ) {
    return this.loadingCharactersService.create(
      body.listStatus,
      body.listSpecies,
      body.listGender,
      body.listCharacters,
    );
  }

  @Get()
  findAll() {
    return this.loadingCharactersService.findAll();
  }
}
