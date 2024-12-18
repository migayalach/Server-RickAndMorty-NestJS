import { Test, TestingModule } from '@nestjs/testing';
import { LoadingCharactersController } from './loading-characters.controller';
import { LoadingCharactersService } from './loading-characters.service';

describe('LoadingCharactersController', () => {
  let controller: LoadingCharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadingCharactersController],
      providers: [LoadingCharactersService],
    }).compile();

    controller = module.get<LoadingCharactersController>(LoadingCharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
