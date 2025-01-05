import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return await this.favoritesService.create(createFavoriteDto);
  }

  @Get(':idUser')
  async findAll(@Param('idUser') idUser: string, @Query('page') page: string) {
    return await this.favoritesService.findAll(idUser, +page);
  }

  @Delete(':idUser/:idFavorite')
  async remove(
    @Param('idUser') idUser: string,
    @Param('idFavorite') idFavorite: string,
  ) {
    return await this.favoritesService.remove(idUser, idFavorite);
  }
}
