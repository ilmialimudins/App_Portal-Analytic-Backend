import { PartialType } from '@nestjs/swagger';
import { AddDemographyDto } from './add-master-demography.dto';

export class UpdateDemographyDto extends PartialType(AddDemographyDto) {}
