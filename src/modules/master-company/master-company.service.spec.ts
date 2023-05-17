import { Test, TestingModule } from '@nestjs/testing';
import { MasterCompanyService } from './master-company.service';

describe('MasterCompanyService', () => {
  let service: MasterCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterCompanyService],
    }).compile();

    service = module.get<MasterCompanyService>(MasterCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
