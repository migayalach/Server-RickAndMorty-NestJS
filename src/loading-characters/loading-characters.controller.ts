import { Controller, Get } from '@nestjs/common';
import { LoadingCharactersService } from './loading-characters.service';

@Controller('loading-characters')
export class LoadingCharactersController {
  constructor(private loadingCharactersService: LoadingCharactersService) {}

  @Get()
  findAll() {
    return this.loadingCharactersService.findAll();
  }
}
