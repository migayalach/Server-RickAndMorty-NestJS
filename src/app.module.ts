import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuditFavoritesModule } from './audit-favorites/audit-favorites.module';
import { LoadingCharactersModule } from './loading-characters/loading-characters.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    AuditFavoritesModule,
    FavoritesModule,
    CharactersModule,
    MongooseModule.forRoot('mongodb://localhost/rickAndMorty'),
    LoadingCharactersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
