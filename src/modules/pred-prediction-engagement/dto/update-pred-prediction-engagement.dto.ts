import { PartialType } from '@nestjs/swagger';
import { CreatePredPredictionEngagementDto } from './create-pred-prediction-engagement.dto';

export class UpdatePredPredictionEngagementDto extends PartialType(CreatePredPredictionEngagementDto) {}
