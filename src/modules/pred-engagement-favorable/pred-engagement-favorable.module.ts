import { Module } from '@nestjs/common';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';
import { PredEngagementFavorableController } from './pred-engagement-favorable.controller';

@Module({
  controllers: [PredEngagementFavorableController],
  providers: [PredEngagementFavorableService]
})
export class PredEngagementFavorableModule {}
