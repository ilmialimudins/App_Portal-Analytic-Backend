import { Test, TestingModule } from '@nestjs/testing';
import { MasterSurveygizmoController } from './master-surveygizmo.controller';
import { MasterSurveygizmoService } from './master-surveygizmo.service';

describe('MasterSurveygizmoController', () => {
  let controller: MasterSurveygizmoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterSurveygizmoController],
      providers: [MasterSurveygizmoService],
    }).compile();

    controller = module.get<MasterSurveygizmoController>(MasterSurveygizmoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
