import { PartialType } from '@nestjs/swagger';
import { AddBusinessLineDto } from './add-master-business-line.dto';

export class UpdateBusinessLineDto extends PartialType(AddBusinessLineDto) {}
