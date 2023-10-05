import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectReview } from './master-direct-review.entity';
import { DirectReviewService } from './master-direct-review.service';
import { DirectReviewController } from './master-direct-review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DirectReview])],
  providers: [DirectReviewService],
  controllers: [DirectReviewController],
})
export class DirectReviewModule {}
