import { Test, TestingModule } from '@nestjs/testing';
import { QualifiacationService } from './qualifiacation.service';

describe('QualifiacationService', () => {
  let service: QualifiacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualifiacationService],
    }).compile();

    service = module.get<QualifiacationService>(QualifiacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
