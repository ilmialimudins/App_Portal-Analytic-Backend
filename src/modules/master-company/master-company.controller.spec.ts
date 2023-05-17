import { Test, TestingModule } from '@nestjs/testing';
import { MasterCompanyController } from './master-company.controller';

describe('MasterCompanyController', () => {
  let controller: MasterCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterCompanyController],
    }).compile();

    controller = module.get<MasterCompanyController>(MasterCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
