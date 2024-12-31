import { Controller, Get, Query } from '@nestjs/common';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  async findAll(@Query('page') page: string) {
    return await this.levelService.findAll(+page);
  }
}
