import { Test, TestingModule } from '@nestjs/testing';
import { LoadingCharactersService } from './loading-characters.service';

describe('LoadingCharactersService', () => {
  let service: LoadingCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadingCharactersService],
    }).compile();

    service = module.get<LoadingCharactersService>(LoadingCharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
