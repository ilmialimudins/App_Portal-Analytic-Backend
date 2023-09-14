import { PartialType } from '@nestjs/swagger';
import { AddLocationDto } from './add-location.dto';

export class UpdateLocationDto extends PartialType(AddLocationDto) {}
