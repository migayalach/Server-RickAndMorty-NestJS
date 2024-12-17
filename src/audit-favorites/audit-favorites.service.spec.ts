import { Test, TestingModule } from '@nestjs/testing';
import { AuditFavoritesService } from './audit-favorites.service';

describe('AuditFavoritesService', () => {
  let service: AuditFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditFavoritesService],
    }).compile();

    service = module.get<AuditFavoritesService>(AuditFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
