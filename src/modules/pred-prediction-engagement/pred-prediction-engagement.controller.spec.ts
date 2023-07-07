import { Test, TestingModule } from '@nestjs/testing';
import { PredPredictionEngagementController } from './pred-prediction-engagement.controller';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';

describe('PredPredictionEngagementController', () => {
  let controller: PredPredictionEngagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredPredictionEngagementController],
      providers: [PredPredictionEngagementService],
    }).compile();

    controller = module.get<PredPredictionEngagementController>(PredPredictionEngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
