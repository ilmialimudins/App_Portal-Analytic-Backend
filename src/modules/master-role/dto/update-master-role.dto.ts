import { PartialType } from '@nestjs/swagger';
import { AddMasterRoleDto } from './add-master-role.dto';

export class UpdateMasterRoleDto extends PartialType(AddMasterRoleDto) {}
