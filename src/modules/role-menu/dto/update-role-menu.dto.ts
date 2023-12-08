import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddRoleMenuDto } from './add-role-menu.dto';
import {
  DataRoleMenuActiveDTO,
  GetRoleMenuDTO,
} from './get-rolemenu-active.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleMenuDto extends PartialType(AddRoleMenuDto) {}

export class TransactionMaintainRoleMenuDTO extends GetRoleMenuDTO {
  @ApiProperty({ type: () => [DataRoleMenuActiveDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DataRoleMenuActiveDTO)
  activeMenuData: DataRoleMenuActiveDTO[];
}
