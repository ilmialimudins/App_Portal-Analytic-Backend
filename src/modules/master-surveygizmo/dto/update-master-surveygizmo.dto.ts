import { PartialType } from '@nestjs/swagger';
import { CreateMasterSurveygizmoDto } from './create-master-surveygizmo.dto';

export class UpdateMasterSurveygizmoDto extends PartialType(CreateMasterSurveygizmoDto) {}
