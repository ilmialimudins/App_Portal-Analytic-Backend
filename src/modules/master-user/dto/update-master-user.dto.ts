import { PartialType } from '@nestjs/swagger';
import { AddMasterUserDto } from './add-master-user.dto';

export class UpdateMasterUserDto extends PartialType(AddMasterUserDto) {}
