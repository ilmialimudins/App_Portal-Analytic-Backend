import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddRoleUserDto } from './add-role-user.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleUserDto extends PartialType(AddRoleUserDto) {}

export class SyncRoleUserDTO {
  @ApiProperty({ type: [AddRoleUserDto] })
  @IsArray({ message: 'Input must be an array' })
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'User must have at least 1 role' })
  @Type(() => AddRoleUserDto)
  userroles: AddRoleUserDto[];
}
