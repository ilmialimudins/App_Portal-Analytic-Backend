import { Module } from '@nestjs/common';
import { MasterSurveygizmoService } from './master-surveygizmo.service';
import { MasterSurveygizmoController } from './master-surveygizmo.controller';

@Module({
  controllers: [MasterSurveygizmoController],
  providers: [MasterSurveygizmoService]
})
export class MasterSurveygizmoModule {}
