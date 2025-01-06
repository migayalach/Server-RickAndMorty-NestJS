import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoadingCharactersModule } from './loading-characters/loading-characters.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/rickAndMorty'),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    LoginModule,
    FavoritesModule,
    CharactersModule,
    LoadingCharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
