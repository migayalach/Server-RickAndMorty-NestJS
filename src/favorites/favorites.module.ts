import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorites, Favorites_Schema } from '@schemas/favorites.schema';
import { UsersModule } from 'src/users/users.module';
import { CharactersModule } from 'src/characters/characters.module';
import { Status, Status_Schema } from '@schemas/status.schema';
import { Species } from '@schemas/species.schema';
import { Gender, Gender_Schema } from '@schemas/gender.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorites.name, schema: Favorites_Schema },
      { name: Status.name, schema: Status_Schema },
      { name: Species.name, schema: Status_Schema },
      { name: Gender.name, schema: Gender_Schema },
    ]),
    UsersModule,
    CharactersModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
