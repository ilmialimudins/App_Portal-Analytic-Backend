import { PartialType } from '@nestjs/swagger';
import { AddAccessUserDto } from './add-access-user.dto';

export class UpdateAccessUserDto extends PartialType(AddAccessUserDto) {}
