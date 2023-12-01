import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AddMasterMenuDto } from './add-master-menu.dto';

export class UpdateMasterMenuDto extends PartialType(AddMasterMenuDto) {
  @ApiProperty()
  @IsString()
  readonly menucode: string;
}
