import { Test, TestingModule } from '@nestjs/testing';
import { PredRelativeImportanceService } from './pred-relative-importance.service';

describe('PredRelativeImportanceService', () => {
  let service: PredRelativeImportanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredRelativeImportanceService],
    }).compile();

    service = module.get<PredRelativeImportanceService>(
      PredRelativeImportanceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
