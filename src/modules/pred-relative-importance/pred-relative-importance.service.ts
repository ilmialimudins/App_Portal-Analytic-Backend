import { Injectable } from '@nestjs/common';
import { CreatePredRelativeImportanceDto } from './dto/create-pred-relative-importance.dto';
import { UpdatePredRelativeImportanceDto } from './dto/update-pred-relative-importance.dto';

@Injectable()
export class PredRelativeImportanceService {
  create(createPredRelativeImportanceDto: CreatePredRelativeImportanceDto) {
    return 'This action adds a new predRelativeImportance';
  }

  findAll() {
    return `This action returns all predRelativeImportance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predRelativeImportance`;
  }

  update(
    id: number,
    updatePredRelativeImportanceDto: UpdatePredRelativeImportanceDto,
  ) {
    return `This action updates a #${id} predRelativeImportance`;
  }

  remove(id: number) {
    return `This action removes a #${id} predRelativeImportance`;
  }
}
