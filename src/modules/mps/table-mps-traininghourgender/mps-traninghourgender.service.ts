import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { TableTrainingHourGender } from './table-mps-traininghourgender.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

@Injectable()
export class MPSTraningHourGenderService {
  constructor(
    @InjectRepository(TableTrainingHourGender)
    private readonly trainingHourGenderRepository: Repository<TableTrainingHourGender>,

    @Inject(MasterMPSGenderService)
    private readonly masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getTrainingHourGender(propertyid: number) {
    try {
      const result = await this.trainingHourGenderRepository
        .createQueryBuilder('traininghourgender')
        .leftJoin('traininghourgender.property', 'property')
        .leftJoin('traininghourgender.gender', 'gender')
        .select([
          'traininghourgender.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'traininghourgender.totalemployee as totalemployee',
          'traininghourgender.totaltraininghour as totaltraininghour',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const trainingHourGenderData = await this.getTrainingHourGender(propertyid);
    const genderData = await this.masterMPSGenderService.getAllMPSGender();

    const rows = genderData.map((gender) => {
      let totalemployee: number | null = null;
      let totaltraininghour: number | null = null;

      const index = trainingHourGenderData.findIndex(
        (item) => item.genderid === gender.genderid,
      );

      if (index > -1) {
        totalemployee = trainingHourGenderData[index].totalemployee;
        totaltraininghour = trainingHourGenderData[index].totaltraininghour;
      }

      return { label: gender.gender, totalemployee, totaltraininghour };
    });

    return rows;
  }

  async getTrainingHourGenderData(propertyid: number) {
    const trainingHourGenderData = await this.getTrainingHourGender(propertyid);
    const genderData = await this.masterMPSGenderService.getAllMPSGender();

    const rows = genderData.map((gender) => {
      let totalemployee: number | null = null;
      let totaltraininghour: number | null = null;

      const index = trainingHourGenderData.findIndex(
        (item) => item.genderid === gender.genderid,
      );

      if (index > -1) {
        totalemployee = trainingHourGenderData[index].totalemployee;
        totaltraininghour = trainingHourGenderData[index].totaltraininghour;
      }

      return { label: gender.gender, totalemployee, totaltraininghour };
    });

    const columns = [
      { title: 'Gender', dataIndex: 'gender', editable: false },
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

  public async uploadDataTrainingHourGender(
    trainingHourGenderRepo: Repository<TableTrainingHourGender>,
    propertyid: number,

    data: { gender: string; totalemployee: number; totaltraining: number }[],
    transactionMetadata: ITransactionMetadata,
  ) {
    const now = moment(Date.now()).utcOffset('+0700');
    const masterGender = await this.masterMPSGenderService.getAllMPSGender();

    const dataToInsert = data.map((item) => {
      let genderid;
      const indexGender = masterGender.findIndex(
        (x) => x.gender === item.gender,
      );

      if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

      return {
        propertyid: propertyid,
        totalemployee: item.totalemployee,
        totaltraininghour: item.totaltraining,
        genderid,
        createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createddate: parseInt(now.format('YYYYMMDD')),
        sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createdby: transactionMetadata.userinfo?.username || 'System Inject',
      };
    });

    const created = await this.deleteRepoByProperty(
      trainingHourGenderRepo,
      propertyid,
    ).then(async () => {
      return await trainingHourGenderRepo
        .createQueryBuilder()
        .insert()
        .values(dataToInsert)
        .execute();
    });

    return created.raw.affectedRows;
  }
  private async deleteRepoByProperty(
    repo: Repository<TableTrainingHourGender>,
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
