import { Injectable } from '@nestjs/common';
import { CreateMasterQcodeDto } from './dto/create-master-qcode.dto';
import { UpdateMasterQcodeDto } from './dto/update-master-qcode.dto';

@Injectable()
export class MasterQcodeService {
  create(createMasterQcodeDto: CreateMasterQcodeDto) {
    return 'This action adds a new masterQcode';
  }

  findAll() {
    return `This action returns all masterQcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterQcode`;
  }

  update(id: number, updateMasterQcodeDto: UpdateMasterQcodeDto) {
    return `This action updates a #${id} masterQcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterQcode`;
  }
}
