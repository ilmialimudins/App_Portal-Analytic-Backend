import { Module } from '@nestjs/common';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { PredPredictionEngagementController } from './pred-prediction-engagement.controller';

@Module({
  controllers: [PredPredictionEngagementController],
  providers: [PredPredictionEngagementService],
})
export class PredPredictionEngagementModule {}
