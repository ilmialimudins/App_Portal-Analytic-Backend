import { Injectable } from '@nestjs/common';
import { CreateMasterSurveygizmoDto } from './dto/create-master-surveygizmo.dto';
import { UpdateMasterSurveygizmoDto } from './dto/update-master-surveygizmo.dto';

@Injectable()
export class MasterSurveygizmoService {
  create(createMasterSurveygizmoDto: CreateMasterSurveygizmoDto) {
    return 'This action adds a new masterSurveygizmo';
  }

  findAll() {
    return `This action returns all masterSurveygizmo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterSurveygizmo`;
  }

  update(id: number, updateMasterSurveygizmoDto: UpdateMasterSurveygizmoDto) {
    return `This action updates a #${id} masterSurveygizmo`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterSurveygizmo`;
  }
}
