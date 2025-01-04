import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return await this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Delete(':idFavorite')
  async remove(@Param('idFavorite') idFavorite: string) {
    return await this.favoritesService.remove(idFavorite);
  }
}
