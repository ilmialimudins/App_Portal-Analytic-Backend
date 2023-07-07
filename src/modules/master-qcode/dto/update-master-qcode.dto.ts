import { PartialType } from '@nestjs/swagger';
import { CreateMasterQcodeDto } from './create-master-qcode.dto';

export class UpdateMasterQcodeDto extends PartialType(CreateMasterQcodeDto) {}
