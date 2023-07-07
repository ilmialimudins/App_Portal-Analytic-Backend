import { Test, TestingModule } from '@nestjs/testing';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';

describe('PredEngagementFavorableService', () => {
  let service: PredEngagementFavorableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredEngagementFavorableService],
    }).compile();

    service = module.get<PredEngagementFavorableService>(PredEngagementFavorableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
