import { Module } from '@nestjs/common';
import { PredRelativeImportanceService } from './pred-relative-importance.service';
import { PredRelativeImportanceController } from './pred-relative-importance.controller';

@Module({
  controllers: [PredRelativeImportanceController],
  providers: [PredRelativeImportanceService]
})
export class PredRelativeImportanceModule {}
