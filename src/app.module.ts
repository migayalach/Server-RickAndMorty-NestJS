import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuditFavoritesModule } from './audit-favorites/audit-favorites.module';
import { LoadingCharactersModule } from './loading-characters/loading-characters.module';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    AuditFavoritesModule,
    FavoritesModule,
    CharactersModule,
    MongooseModule.forRoot('mongodb://localhost/rickAndMorty'),
    LoadingCharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
