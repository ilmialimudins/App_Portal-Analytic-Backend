import { Test, TestingModule } from '@nestjs/testing';
import { MasterQcodeService } from './master-qcode.service';

describe('MasterQcodeService', () => {
  let service: MasterQcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterQcodeService],
    }).compile();

    service = module.get<MasterQcodeService>(MasterQcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
