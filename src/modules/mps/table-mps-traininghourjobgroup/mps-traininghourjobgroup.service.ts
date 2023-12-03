import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableTrainingHourJobGroup } from './table-mps-traininghourjobgroup.entity';
import { Repository } from 'typeorm';
import { MasterJobGroup } from '../master-mps-jobgroup/master-mps-jobgroup.entity';

@Injectable()
export class MPSTraningHourJobGroupService {
  constructor(
    @InjectRepository(TableTrainingHourJobGroup)
    private readonly trainingHourJobGroupRepository: Repository<TableTrainingHourJobGroup>,

    @InjectRepository(MasterJobGroup)
    private readonly jobGroupRepository: Repository<MasterJobGroup>,
  ) {}

  public async findJobGroup() {
    return this.jobGroupRepository.find();
  }

  public async getTrainingHourJobGroup(propertyid: number) {
    try {
      const result = await this.trainingHourJobGroupRepository
        .createQueryBuilder('traininghourjobgroup')
        .leftJoin('traininghourjobgroup.property', 'property')
        .leftJoin('traininghourjobgroup.jobgroup', 'jobgroup')
        .select([
          'traininghourjobgroup.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'jobgroup.jobgroupid as jobgroupid',
          'jobgroup.jobgroup as jobgroup',
          'traininghourjobgroup.totalemployee as totalemployee',
          'traininghourjobgroup.totaltraininghour as totaltraininghour',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const trainingHourJobGroupData = await this.getTrainingHourJobGroup(
      propertyid,
    );

    const jobGroupData = await this.findJobGroup();

    const rows = jobGroupData.map((jobgroup) => {
      let totalemployee: number | null = null;
      let totaltraininghour: number | null = null;

      const index = trainingHourJobGroupData.findIndex(
        (item) => item.jobgroupid === jobgroup.jobgroupid,
      );

      if (index > -1) {
        totalemployee = trainingHourJobGroupData[index].totalemployee;
        totaltraininghour = trainingHourJobGroupData[index].totaltraininghour;
      }

      return { label: jobgroup.jobgroup, totalemployee, totaltraininghour };
    });

    return rows;
  }
}
