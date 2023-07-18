import { Module } from '@nestjs/common';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';
import { PredEngagementFavorableController } from './pred-engagement-favorable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredEngagementFavorable } from './pred-engagement-favorable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredEngagementFavorable])],
  controllers: [PredEngagementFavorableController],
  providers: [PredEngagementFavorableService],
})
export class PredEngagementFavorableModule {}
