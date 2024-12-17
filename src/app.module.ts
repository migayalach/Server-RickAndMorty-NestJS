import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuditFavoritesModule } from './audit-favorites/audit-favorites.module';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    AuditFavoritesModule,
    FavoritesModule,
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
