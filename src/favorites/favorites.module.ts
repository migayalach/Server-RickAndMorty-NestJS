import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorites, Favorites_Schema } from '@schemas/favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorites.name, schema: Favorites_Schema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
