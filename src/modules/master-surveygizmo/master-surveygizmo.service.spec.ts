import { Test, TestingModule } from '@nestjs/testing';
import { MasterSurveygizmoService } from './master-surveygizmo.service';

describe('MasterSurveygizmoService', () => {
  let service: MasterSurveygizmoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterSurveygizmoService],
    }).compile();

    service = module.get<MasterSurveygizmoService>(MasterSurveygizmoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
