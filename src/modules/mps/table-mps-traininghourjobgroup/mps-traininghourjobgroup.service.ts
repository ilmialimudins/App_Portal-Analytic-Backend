import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { TableTrainingHourJobGroup } from './table-mps-traininghourjobgroup.entity';
import { MasterJobGroup } from '../master-mps-jobgroup/master-mps-jobgroup.entity';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

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

  async getTrainingHourJobGroupData(propertyid: number) {
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

    const columns = [
      { title: 'Kelompok Karyawan', dataIndex: 'jobgroup', editable: false },
      { title: 'Total Karyawan', dataIndex: 'totalemployee', editable: true },
      {
        title: 'Total Jam Pelatihan',
        dataIndex: 'totaltraininghour',
        editable: true,
      },
    ];

    const dataSource = rows;

    return {
      dataSource: dataSource,
      columns: columns,
    };
  }

  public async uploadDataTrainingJobGroup(
    trainingHourJobGroupRepo: Repository<TableTrainingHourJobGroup>,
    propertyid: number,
    data: { jobgroup: string; totalemployee: number; totaltraining: number }[],
    transactionMetadata: ITransactionMetadata,
  ) {
    const now = moment(Date.now()).utcOffset('+0700');
    const masterJobgroup = await this.findJobGroup();

    const dataToInsert = data.map((item) => {
      let jobgroupid;
      const indexJobgroup = masterJobgroup.findIndex(
        (x) => x.jobgroup === item.jobgroup,
      );

      if (indexJobgroup >= 0)
        jobgroupid = masterJobgroup[indexJobgroup].jobgroupid;

      return {
        propertyid: propertyid,
        totalemployee: item.totalemployee,
        totaltraininghour: item.totaltraining,
        jobgroupid,
        createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createddate: parseInt(now.format('YYYYMMDD')),
        sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createdby: transactionMetadata.userinfo?.username || 'System Inject',
      };
    });

    const created = await this.deleteRepoByProperty(
      trainingHourJobGroupRepo,
      propertyid,
    ).then(async () => {
      return await trainingHourJobGroupRepo
        .createQueryBuilder()
        .insert()
        .values(dataToInsert)
        .execute();
    });

    return created.raw.affectedRows;
  }

  private async deleteRepoByProperty(
    repo: Repository<TableTrainingHourJobGroup>,
    propertyid: number,
  ) {
    try {
      await repo
        .createQueryBuilder()
        .delete()
        .where('propertyid = :propertyid', { propertyid })
        .execute();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
