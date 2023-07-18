import { Test, TestingModule } from '@nestjs/testing';
import { MasterEngagementController } from './master-engagement.controller';
import { MasterEngagementService } from './master-engagement.service';

describe('MasterEngagementController', () => {
  let controller: MasterEngagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterEngagementController],
      providers: [MasterEngagementService],
    }).compile();

    controller = module.get<MasterEngagementController>(MasterEngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
