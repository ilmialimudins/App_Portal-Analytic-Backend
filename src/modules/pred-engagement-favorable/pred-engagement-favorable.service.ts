import { Injectable } from '@nestjs/common';
import { CreatePredEngagementFavorableDto } from './dto/create-pred-engagement-favorable.dto';
import { UpdatePredEngagementFavorableDto } from './dto/update-pred-engagement-favorable.dto';

@Injectable()
export class PredEngagementFavorableService {
  create(createPredEngagementFavorableDto: CreatePredEngagementFavorableDto) {
    return 'This action adds a new predEngagementFavorable';
  }

  findAll() {
    return `This action returns all predEngagementFavorable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predEngagementFavorable`;
  }

  update(id: number, updatePredEngagementFavorableDto: UpdatePredEngagementFavorableDto) {
    return `This action updates a #${id} predEngagementFavorable`;
  }

  remove(id: number) {
    return `This action removes a #${id} predEngagementFavorable`;
  }
}
