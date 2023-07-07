import { Test, TestingModule } from '@nestjs/testing';
import { PredEngagementFavorableController } from './pred-engagement-favorable.controller';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';

describe('PredEngagementFavorableController', () => {
  let controller: PredEngagementFavorableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredEngagementFavorableController],
      providers: [PredEngagementFavorableService],
    }).compile();

    controller = module.get<PredEngagementFavorableController>(PredEngagementFavorableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
