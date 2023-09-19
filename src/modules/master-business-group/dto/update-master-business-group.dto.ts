import { PartialType } from '@nestjs/swagger';
import { AddBusinessGroupDto } from './add-master-business-group.dto';

export class UpdateBusinessGroupDto extends PartialType(AddBusinessGroupDto) {}
