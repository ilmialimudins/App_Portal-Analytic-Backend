import { Injectable } from '@nestjs/common';
import { CreateMasterEngagementDto } from './dto/create-master-engagement.dto';
import { UpdateMasterEngagementDto } from './dto/update-master-engagement.dto';

@Injectable()
export class MasterEngagementService {
  create(createMasterEngagementDto: CreateMasterEngagementDto) {
    return 'This action adds a new masterEngagement';
  }

  findAll() {
    return `This action returns all masterEngagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterEngagement`;
  }

  update(id: number, updateMasterEngagementDto: UpdateMasterEngagementDto) {
    return `This action updates a #${id} masterEngagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterEngagement`;
  }
}
