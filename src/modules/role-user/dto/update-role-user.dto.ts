import { PartialType } from '@nestjs/swagger';
import { AddRoleUserDto } from './add-role-user.dto';

export class UpdateRoleUserDto extends PartialType(AddRoleUserDto) {}
