import { Test, TestingModule } from '@nestjs/testing';
import { MasterQcodeController } from './master-qcode.controller';
import { MasterQcodeService } from './master-qcode.service';

describe('MasterQcodeController', () => {
  let controller: MasterQcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterQcodeController],
      providers: [MasterQcodeService],
    }).compile();

    controller = module.get<MasterQcodeController>(MasterQcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
