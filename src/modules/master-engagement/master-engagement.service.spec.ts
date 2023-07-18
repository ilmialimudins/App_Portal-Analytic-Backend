import { Test, TestingModule } from '@nestjs/testing';
import { MasterEngagementService } from './master-engagement.service';

describe('MasterEngagementService', () => {
  let service: MasterEngagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterEngagementService],
    }).compile();

    service = module.get<MasterEngagementService>(MasterEngagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
