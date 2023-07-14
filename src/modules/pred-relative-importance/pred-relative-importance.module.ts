import { Module } from '@nestjs/common';
import { PredRelativeImportanceService } from './pred-relative-importance.service';
import { PredRelativeImportanceController } from './pred-relative-importance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredRelativeImportance } from './pred-relative-importance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredRelativeImportance])],
  controllers: [PredRelativeImportanceController],
  providers: [PredRelativeImportanceService],
})
export class PredRelativeImportanceModule {}
