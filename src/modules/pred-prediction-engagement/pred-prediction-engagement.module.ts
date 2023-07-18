import { Module } from '@nestjs/common';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { PredPredictionEngagementController } from './pred-prediction-engagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredPredictionEngagement } from './pred-prediction-engagement.entity';
import { PredEngagamentValueModule } from '../pred-engagement-value/pred-engagement-value.module';
import { SavePredictionEngagementTransaction } from './save-prediction-engagement.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([PredPredictionEngagement]),
    PredEngagamentValueModule,
  ],
  controllers: [PredPredictionEngagementController],
  providers: [
    PredPredictionEngagementService,
    SavePredictionEngagementTransaction,
  ],
})
export class PredPredictionEngagementModule {}
