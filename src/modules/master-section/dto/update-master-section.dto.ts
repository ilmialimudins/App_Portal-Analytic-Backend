import { PartialType } from '@nestjs/swagger';
import { AddMasterSectionDto } from './add-master-section.dto';

export class UpdateMasterSectionDto extends PartialType(AddMasterSectionDto) {}
