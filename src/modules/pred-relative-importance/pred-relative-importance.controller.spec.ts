import { Test, TestingModule } from '@nestjs/testing';
import { PredRelativeImportanceController } from './pred-relative-importance.controller';
import { PredRelativeImportanceService } from './pred-relative-importance.service';

describe('PredRelativeImportanceController', () => {
  let controller: PredRelativeImportanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredRelativeImportanceController],
      providers: [PredRelativeImportanceService],
    }).compile();

    controller = module.get<PredRelativeImportanceController>(PredRelativeImportanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
