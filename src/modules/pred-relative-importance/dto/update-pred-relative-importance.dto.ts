import { PartialType } from '@nestjs/swagger';
import { CreatePredRelativeImportanceDto } from './create-pred-relative-importance.dto';

export class UpdatePredRelativeImportanceDto extends PartialType(
  CreatePredRelativeImportanceDto,
) {}
