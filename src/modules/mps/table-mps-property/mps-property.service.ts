import { Injectable } from '@nestjs/common';
import { TableProperty } from './table-mps-property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOneProperty } from './dto/table-mps-property.dto';

@Injectable()
export class MPSPropertyService {
  constructor(
    @InjectRepository(TableProperty)
    private mpsPropertyRepo: Repository<TableProperty>,
  ) {}

  public async getOneMPSProperty(data: GetOneProperty) {
    try {
      return this.mpsPropertyRepo.findOne({
        where: {
          companyid: data.companyid,
          year: data.year.toString(),
          month: data.month.toString(),
        },
        relations: {
          company: true,
          location: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
