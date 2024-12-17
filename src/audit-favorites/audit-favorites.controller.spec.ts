import { Test, TestingModule } from '@nestjs/testing';
import { AuditFavoritesController } from './audit-favorites.controller';
import { AuditFavoritesService } from './audit-favorites.service';

describe('AuditFavoritesController', () => {
  let controller: AuditFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditFavoritesController],
      providers: [AuditFavoritesService],
    }).compile();

    controller = module.get<AuditFavoritesController>(AuditFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
