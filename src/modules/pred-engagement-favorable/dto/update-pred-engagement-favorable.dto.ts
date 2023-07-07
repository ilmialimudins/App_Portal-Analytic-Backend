import { PartialType } from '@nestjs/swagger';
import { CreatePredEngagementFavorableDto } from './create-pred-engagement-favorable.dto';

export class UpdatePredEngagementFavorableDto extends PartialType(CreatePredEngagementFavorableDto) {}
