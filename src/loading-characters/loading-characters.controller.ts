import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoadingCharactersService } from './loading-characters.service';
import { CreateLoadingCharacterDto } from './dto/create-loading-character.dto';

@Controller('loading-characters')
export class LoadingCharactersController {
  constructor(
    private readonly loadingCharactersService: LoadingCharactersService,
  ) {}

  @Post()
  create(@Body() createLoadingCharacterDto: CreateLoadingCharacterDto) {
    return this.loadingCharactersService.create(createLoadingCharacterDto);
  }

  @Get()
  findAll() {
    return this.loadingCharactersService.findAll();
  }
}
