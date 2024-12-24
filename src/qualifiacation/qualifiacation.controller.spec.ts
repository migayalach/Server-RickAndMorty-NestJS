import { Test, TestingModule } from '@nestjs/testing';
import { QualifiacationController } from './qualifiacation.controller';
import { QualifiacationService } from './qualifiacation.service';

describe('QualifiacationController', () => {
  let controller: QualifiacationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualifiacationController],
      providers: [QualifiacationService],
    }).compile();

    controller = module.get<QualifiacationController>(QualifiacationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
