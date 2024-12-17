import { Module } from '@nestjs/common';
import { AuditFavoritesService } from './audit-favorites.service';
import { AuditFavoritesController } from './audit-favorites.controller';

@Module({
  controllers: [AuditFavoritesController],
  providers: [AuditFavoritesService],
})
export class AuditFavoritesModule {}
