import { Test, TestingModule } from '@nestjs/testing';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';

describe('PredPredictionEngagementService', () => {
  let service: PredPredictionEngagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredPredictionEngagementService],
    }).compile();

    service = module.get<PredPredictionEngagementService>(PredPredictionEngagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
