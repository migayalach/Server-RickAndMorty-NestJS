import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  async create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  async findAll() {
    return `This action returns all favorites`;
  }

  async remove(idFavorite: string) {
    return `This action removes a #${idFavorite} favorite`;
  }
}
