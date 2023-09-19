import { PartialType } from '@nestjs/swagger';
import { AddMasterMenuDto } from './add-master-menu.dto';

export class UpdateMasterMenuDto extends PartialType(AddMasterMenuDto) {}
