import { PartialType } from '@nestjs/swagger';
import { AddRoleMenuDto } from './add-role-menu.dto';

export class UpdateRoleMenuDto extends PartialType(AddRoleMenuDto) {}
