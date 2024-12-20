import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoadingCharactersService } from './loading-characters.service';
import { CreateStatusDto } from './dto/create-loading-character.dto';

@Controller('loading-characters')
export class LoadingCharactersController {
  constructor(private loadingCharactersService: LoadingCharactersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createDtoStatus: CreateStatusDto) {
    return this.loadingCharactersService.create(createDtoStatus);
  }

  @Get()
  findAll() {
    return this.loadingCharactersService.findAll();
  }
}
