import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return await this.charactersService.create(createCharacterDto);
  }

  @Get()
  async findAll(@Query('page') page: string) {
    return await this.charactersService.findAll(+page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.charactersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return await this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.charactersService.remove(id);
  }
}
