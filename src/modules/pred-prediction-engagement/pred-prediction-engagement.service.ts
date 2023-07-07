import { Injectable } from '@nestjs/common';
import { CreatePredPredictionEngagementDto } from './dto/create-pred-prediction-engagement.dto';
import { UpdatePredPredictionEngagementDto } from './dto/update-pred-prediction-engagement.dto';

@Injectable()
export class PredPredictionEngagementService {
  create(createPredPredictionEngagementDto: CreatePredPredictionEngagementDto) {
    return 'This action adds a new predPredictionEngagement';
  }

  findAll() {
    return `This action returns all predPredictionEngagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predPredictionEngagement`;
  }

  update(id: number, updatePredPredictionEngagementDto: UpdatePredPredictionEngagementDto) {
    return `This action updates a #${id} predPredictionEngagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} predPredictionEngagement`;
  }
}
